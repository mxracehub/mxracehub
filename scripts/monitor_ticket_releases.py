#!/usr/bin/env python3
"""
Automated ticket monitoring system for new season releases
Checks official sources for when tickets become available and updates schedule
"""

import requests
import json
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import time
import subprocess

class TicketMonitor:
    def __init__(self):
        self.supercross_url = "https://www.supercrosslive.com/tickets/"
        self.motocross_url = "https://www.promotocross.com/schedule"
        self.ticket_status_file = "data/ticket_status.json"
        self.last_check_file = "data/last_ticket_check.json"
        
    def load_ticket_status(self):
        """Load previous ticket availability status"""
        try:
            with open(self.ticket_status_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {"supercross": {}, "motocross": {}, "season": "2025"}
    
    def save_ticket_status(self, status):
        """Save current ticket availability status"""
        with open(self.ticket_status_file, 'w') as f:
            json.dump(status, f, indent=2)
    
    def check_supercross_tickets(self):
        """Check SupercrossLive.com for new ticket releases"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(self.supercross_url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Look for ticket availability indicators
                ticket_elements = soup.find_all(['div', 'section'], class_=lambda x: x and any(
                    keyword in x.lower() for keyword in ['ticket', 'event', 'schedule', 'buy']
                ))
                
                available_events = []
                for element in ticket_elements:
                    text = element.get_text().lower()
                    if any(keyword in text for keyword in ['buy tickets', 'get tickets', 'purchase', 'available']):
                        # Extract event information
                        event_text = element.get_text()
                        if any(venue in event_text for venue in ['stadium', 'field', 'arena']):
                            available_events.append(event_text[:100])
                
                return {
                    "status": "success",
                    "available_count": len(available_events),
                    "events": available_events[:5],  # Limit to first 5
                    "checked_at": datetime.now().isoformat()
                }
                
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "checked_at": datetime.now().isoformat()
            }
    
    def check_motocross_tickets(self):
        """Check ProMotocross.com for new ticket releases"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(self.motocross_url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Look for schedule and ticket information
                schedule_elements = soup.find_all(['div', 'section'], class_=lambda x: x and any(
                    keyword in x.lower() for keyword in ['schedule', 'event', 'race', 'ticket']
                ))
                
                available_tracks = []
                for element in schedule_elements:
                    text = element.get_text().lower()
                    if any(keyword in text for keyword in ['tickets', 'buy', 'purchase', 'available']):
                        # Extract track information
                        event_text = element.get_text()
                        if any(track in event_text.lower() for track in ['raceway', 'motocross', 'mx', 'creek', 'valley']):
                            available_tracks.append(event_text[:100])
                
                return {
                    "status": "success",
                    "available_count": len(available_tracks),
                    "tracks": available_tracks[:5],  # Limit to first 5
                    "checked_at": datetime.now().isoformat()
                }
                
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "checked_at": datetime.now().isoformat()
            }
    
    def detect_new_season(self):
        """Detect if a new racing season has started"""
        current_year = datetime.now().year
        current_month = datetime.now().month
        
        # Supercross typically starts in January
        # Pro Motocross typically starts in May
        
        is_supercross_season = current_month >= 1 and current_month <= 5
        is_motocross_season = current_month >= 5 and current_month <= 9
        
        return {
            "year": current_year,
            "supercross_active": is_supercross_season,
            "motocross_active": is_motocross_season,
            "season_change": current_month == 1 or current_month == 5
        }
    
    def update_schedule_if_needed(self, supercross_data, motocross_data):
        """Update the race schedule if new tickets are detected"""
        current_status = self.load_ticket_status()
        needs_update = False
        
        # Check for new Supercross ticket availability
        if supercross_data["status"] == "success":
            prev_sx_count = current_status.get("supercross", {}).get("available_count", 0)
            if supercross_data["available_count"] > prev_sx_count:
                needs_update = True
                print(f"🎟️ New Supercross tickets detected: {supercross_data['available_count']} events")
        
        # Check for new Motocross ticket availability
        if motocross_data["status"] == "success":
            prev_mx_count = current_status.get("motocross", {}).get("available_count", 0)
            if motocross_data["available_count"] > prev_mx_count:
                needs_update = True
                print(f"🏁 New Pro Motocross tickets detected: {motocross_data['available_count']} tracks")
        
        if needs_update:
            # Update ticket status
            new_status = {
                "supercross": supercross_data,
                "motocross": motocross_data,
                "season": str(datetime.now().year),
                "last_updated": datetime.now().isoformat()
            }
            self.save_ticket_status(new_status)
            
            # Trigger schedule update
            try:
                subprocess.run(['python3', 'scripts/create_promotocross_schedule.py'], 
                             cwd='/tmp/hugo-site', check=True)
                subprocess.run(['python3', 'scripts/update_supercross_tickets.py'], 
                             cwd='/tmp/hugo-site', check=True)
                print("✅ Race schedule updated with new ticket information")
                return True
            except subprocess.CalledProcessError as e:
                print(f"❌ Error updating schedule: {e}")
                return False
        
        return False
    
    def run_monitoring_cycle(self):
        """Run a complete monitoring cycle"""
        print(f"🔍 Checking for new ticket releases at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Check season status
        season_info = self.detect_new_season()
        print(f"📅 Season Status: {season_info['year']} - SX: {season_info['supercross_active']}, MX: {season_info['motocross_active']}")
        
        # Check both series for ticket availability
        supercross_data = self.check_supercross_tickets()
        motocross_data = self.check_motocross_tickets()
        
        # Update schedule if new tickets are found
        updated = self.update_schedule_if_needed(supercross_data, motocross_data)
        
        # Save check timestamp
        with open(self.last_check_file, 'w') as f:
            json.dump({
                "last_check": datetime.now().isoformat(),
                "supercross_status": supercross_data["status"],
                "motocross_status": motocross_data["status"],
                "schedule_updated": updated
            }, f, indent=2)
        
        return {
            "supercross": supercross_data,
            "motocross": motocross_data,
            "updated": updated,
            "season": season_info
        }

def main():
    """Main monitoring function"""
    monitor = TicketMonitor()
    
    # Ensure data directory exists
    subprocess.run(['mkdir', '-p', 'data'], check=True)
    
    # Run monitoring cycle
    results = monitor.run_monitoring_cycle()
    
    print("\n📊 Monitoring Results:")
    print(f"   Supercross: {results['supercross']['status']}")
    if results['supercross']['status'] == 'success':
        print(f"   - Available events: {results['supercross']['available_count']}")
    
    print(f"   Pro Motocross: {results['motocross']['status']}")
    if results['motocross']['status'] == 'success':
        print(f"   - Available tracks: {results['motocross']['available_count']}")
    
    if results['updated']:
        print("🎉 Schedule updated with new ticket information!")
    else:
        print("ℹ️  No new tickets detected, schedule remains current")

if __name__ == "__main__":
    main()