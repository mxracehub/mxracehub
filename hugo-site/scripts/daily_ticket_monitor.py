#!/usr/bin/env python3
"""
Daily ticket monitoring for immediate season updates
Checks for new ticket releases and updates schedule automatically
"""

import requests
import json
from datetime import datetime, timedelta
import subprocess
import os

def check_ticket_availability():
    """Check official sources for ticket availability"""
    
    # Track new releases
    new_releases = {
        "supercross": False,
        "motocross": False,
        "updated_at": datetime.now().isoformat()
    }
    
    # Check SupercrossLive.com for Supercross tickets
    try:
        sx_response = requests.get("https://www.supercrosslive.com/tickets/", timeout=10)
        if sx_response.status_code == 200 and "buy tickets" in sx_response.text.lower():
            new_releases["supercross"] = True
            print("🎟️ Supercross tickets detected on SupercrossLive.com")
    except:
        pass
    
    # Check ProMotocross.com for outdoor tickets  
    try:
        mx_response = requests.get("https://www.promotocross.com/schedule", timeout=10)
        if mx_response.status_code == 200 and ("tickets" in mx_response.text.lower() or "buy" in mx_response.text.lower()):
            new_releases["motocross"] = True
            print("🏁 Pro Motocross tickets detected on ProMotocross.com")
    except:
        pass
    
    return new_releases

def update_schedule_with_tickets():
    """Update the race schedule with latest ticket information"""
    
    print("🔄 Updating race schedule with current ticket status...")
    
    try:
        # Run the professional schedule generator
        result = subprocess.run(['python3', 'scripts/create_promotocross_schedule.py'], 
                              capture_output=True, text=True, cwd='.')
        
        if result.returncode == 0:
            print("✅ Professional race schedule updated successfully")
            
            # Also update the ticket-specific content
            ticket_result = subprocess.run(['python3', 'scripts/update_supercross_tickets.py'], 
                                         capture_output=True, text=True, cwd='.')
            
            if ticket_result.returncode == 0:
                print("✅ Official ticket links refreshed successfully")
                return True
            else:
                print(f"⚠️ Ticket link update had issues: {ticket_result.stderr}")
                return False
        else:
            print(f"❌ Schedule update failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Error updating schedule: {e}")
        return False

def save_monitoring_status(status):
    """Save the current monitoring status"""
    
    # Ensure data directory exists
    os.makedirs("data", exist_ok=True)
    
    status_file = "data/daily_ticket_status.json"
    
    with open(status_file, 'w') as f:
        json.dump(status, f, indent=2)

def main():
    """Main daily monitoring function"""
    
    print(f"🔍 Daily ticket monitoring - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Check for ticket availability
    ticket_status = check_ticket_availability()
    
    # Always refresh the schedule to keep it current
    schedule_updated = update_schedule_with_tickets()
    
    # Create monitoring report
    monitoring_report = {
        "date": datetime.now().isoformat(),
        "supercross_tickets_found": ticket_status["supercross"],
        "motocross_tickets_found": ticket_status["motocross"],
        "schedule_updated": schedule_updated,
        "status": "success" if schedule_updated else "partial"
    }
    
    # Save status for tracking
    save_monitoring_status(monitoring_report)
    
    # Summary
    print("\n📊 Daily Monitoring Summary:")
    print(f"   Supercross tickets available: {'✅ Yes' if ticket_status['supercross'] else '⏳ Checking'}")
    print(f"   Pro Motocross tickets available: {'✅ Yes' if ticket_status['motocross'] else '⏳ Checking'}")
    print(f"   Schedule updated: {'✅ Success' if schedule_updated else '❌ Failed'}")
    
    if ticket_status["supercross"] or ticket_status["motocross"]:
        print("🎉 New season tickets detected! Schedule updated with official links.")
    else:
        print("ℹ️ Continuing to monitor for new season ticket releases...")

if __name__ == "__main__":
    main()