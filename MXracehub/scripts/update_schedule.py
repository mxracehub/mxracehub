#!/usr/bin/env python3
"""
Race Schedule Updater for MXRaceHub
Automatically updates the schedule page to highlight the next upcoming race
Updates weekly to keep the "Next Race" section current
"""

import os
import re
from datetime import datetime, timedelta
from typing import Dict, List, Optional

class RaceScheduleUpdater:
    def __init__(self):
        self.schedule_file = 'hugo-site/content/races/schedule/_index.md'
        
        # Complete 2025 race schedule with actual dates
        self.races = [
            # Supercross Championship
            {'date': '2025-01-04', 'round': 1, 'name': 'Anaheim Supercross', 'venue': 'Angel Stadium', 'location': 'Anaheim, CA', 'classes': '450SX, 250SX West', 'type': 'supercross', 'status': 'completed'},
            {'date': '2025-01-11', 'round': 2, 'name': 'San Diego Supercross', 'venue': 'Snapdragon Stadium', 'location': 'San Diego, CA', 'classes': '450SX, 250SX West', 'type': 'supercross', 'status': 'completed'},
            {'date': '2025-01-18', 'round': 3, 'name': 'Anaheim Supercross', 'venue': 'Angel Stadium', 'location': 'Anaheim, CA', 'classes': '450SX, 250SX West', 'type': 'supercross', 'status': 'completed'},
            {'date': '2025-01-25', 'round': 4, 'name': 'Glendale Supercross', 'venue': 'State Farm Stadium', 'location': 'Glendale, AZ', 'classes': '450SX, 250SX West', 'type': 'supercross', 'status': 'completed'},
            {'date': '2025-02-01', 'round': 5, 'name': 'Detroit Supercross', 'venue': 'Ford Field', 'location': 'Detroit, MI', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'completed'},
            {'date': '2025-02-08', 'round': 6, 'name': 'Tampa Supercross', 'venue': 'Raymond James Stadium', 'location': 'Tampa, FL', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'completed'},
            {'date': '2025-02-15', 'round': 7, 'name': 'Arlington Supercross', 'venue': 'AT&T Stadium', 'location': 'Arlington, TX', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'completed'},
            {'date': '2025-02-22', 'round': 8, 'name': 'Daytona Supercross', 'venue': 'Daytona International Speedway', 'location': 'Daytona Beach, FL', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'completed'},
            {'date': '2025-03-01', 'round': 9, 'name': 'Indianapolis Supercross', 'venue': 'Lucas Oil Stadium', 'location': 'Indianapolis, IN', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'completed'},
            {'date': '2025-03-08', 'round': 10, 'name': 'Seattle Supercross', 'venue': 'Lumen Field', 'location': 'Seattle, WA', 'classes': '450SX, 250SX West', 'type': 'supercross', 'status': 'next'},
            {'date': '2025-03-15', 'round': 11, 'name': 'Denver Supercross', 'venue': 'Empower Field at Mile High', 'location': 'Denver, CO', 'classes': '450SX, 250SX West', 'type': 'supercross', 'status': 'upcoming'},
            {'date': '2025-03-22', 'round': 12, 'name': 'Birmingham Supercross', 'venue': 'Protective Stadium', 'location': 'Birmingham, AL', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'upcoming'},
            {'date': '2025-03-29', 'round': 13, 'name': 'Philadelphia Supercross', 'venue': 'Lincoln Financial Field', 'location': 'Philadelphia, PA', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'upcoming'},
            {'date': '2025-04-05', 'round': 14, 'name': 'Boston Supercross', 'venue': 'Gillette Stadium', 'location': 'Foxborough, MA', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'upcoming'},
            {'date': '2025-04-12', 'round': 15, 'name': 'Pittsburgh Supercross', 'venue': 'Acrisure Stadium', 'location': 'Pittsburgh, PA', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'upcoming'},
            {'date': '2025-04-26', 'round': 16, 'name': 'Nashville Supercross', 'venue': 'Nissan Stadium', 'location': 'Nashville, TN', 'classes': '450SX, 250SX East', 'type': 'supercross', 'status': 'upcoming'},
            {'date': '2025-05-03', 'round': 17, 'name': 'Salt Lake City Supercross', 'venue': 'Rice-Eccles Stadium', 'location': 'Salt Lake City, UT', 'classes': '450SX, 250SX West', 'type': 'supercross', 'status': 'upcoming'},
            
            # Pro Motocross Championship
            {'date': '2025-05-24', 'round': 1, 'name': 'Fox Raceway National', 'location': 'Pala, CA', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-05-31', 'round': 2, 'name': 'Hangtown Classic', 'location': 'Rancho Cordova, CA', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-06-07', 'round': 3, 'name': 'Thunder Valley National', 'location': 'Lakewood, CO', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-06-14', 'round': 4, 'name': 'High Point National', 'location': 'Mt. Morris, PA', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-06-28', 'round': 5, 'name': 'Southwick National', 'location': 'Southwick, MA', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-07-05', 'round': 6, 'name': 'RedBud National', 'location': 'Buchanan, MI', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-07-19', 'round': 7, 'name': 'Spring Creek National', 'location': 'Millville, MN', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-07-26', 'round': 8, 'name': 'Washougal National', 'location': 'Washougal, WA', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-08-09', 'round': 9, 'name': 'Unadilla National', 'location': 'New Berlin, NY', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-08-16', 'round': 10, 'name': 'Budds Creek National', 'location': 'Mechanicsville, MD', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'},
            {'date': '2025-08-30', 'round': 11, 'name': 'Ironman National', 'location': 'Crawfordsville, IN', 'classes': '450, 250', 'type': 'motocross', 'status': 'upcoming'}
        ]
    
    def get_next_race(self) -> Optional[Dict]:
        """Find the next upcoming race based on current date"""
        today = datetime.now().date()
        
        for race in self.races:
            race_date = datetime.strptime(race['date'], '%Y-%m-%d').date()
            if race_date >= today:
                return race
        
        return None
    
    def format_date(self, date_str: str) -> str:
        """Format date string for display"""
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        return date_obj.strftime('%B %d, %Y')
    
    def generate_slug(self, race: Dict) -> str:
        """Generate URL slug for race"""
        name = race['name'].lower()
        name = re.sub(r'[^\w\s-]', '', name)
        name = re.sub(r'[-\s]+', '-', name)
        return f"{name}-2025"
    
    def update_next_race_section(self) -> bool:
        """Update the Next Race section in the schedule"""
        try:
            next_race = self.get_next_race()
            if not next_race:
                print("No upcoming races found")
                return False
            
            # Read current schedule file
            with open(self.schedule_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Format the race information
            race_type = "Supercross" if next_race['type'] == 'supercross' else "National"
            venue_line = f"**Venue:** {next_race['venue']}  " if 'venue' in next_race else ""
            location_key = 'location' if 'location' in next_race else 'location'
            
            # Create new Next Race section
            next_race_section = f"""## 🔴 Next Race
### Round {next_race['round']}: {next_race['name']}
**Date:** {self.format_date(next_race['date'])}  
{venue_line}**Location:** {next_race[location_key]}  
**Classes:** {next_race['classes']}  

[Get Tickets](/tickets/{self.generate_slug(next_race)}/) | [View Betting Odds](/betting/odds/{self.generate_slug(next_race)}/)"""
            
            # Replace the Next Race section using regex
            pattern = r'## 🔴 Next Race.*?(?=---|\n## [A-Z])'
            replacement = next_race_section + '\n\n---\n\n'
            
            updated_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
            
            # Write updated content back to file
            with open(self.schedule_file, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            print(f"Successfully updated next race to: {next_race['name']} on {self.format_date(next_race['date'])}")
            return True
            
        except Exception as e:
            print(f"Error updating next race section: {str(e)}")
            return False
    
    def update_race_statuses(self) -> bool:
        """Update all race statuses based on current date"""
        try:
            today = datetime.now().date()
            
            # Read current schedule file
            with open(self.schedule_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Update each race status
            for race in self.races:
                race_date = datetime.strptime(race['date'], '%Y-%m-%d').date()
                
                # Determine status
                if race_date < today:
                    status = "✅ Completed"
                elif race_date == today or (race_date - today).days <= 7:
                    status = "🔴 Next Race"
                else:
                    if race['round'] == max(r['round'] for r in self.races if r['type'] == race['type']):
                        status = "🟡 Season Finale"
                    elif race['round'] == 1:
                        status = "🏁 Season Opener"
                    else:
                        status = "🟡 Upcoming"
                
                # Update status in content
                race_pattern = f"(### Round {race['round']}: {re.escape(race['name'])}.*?)\*\*Status:\*\* [^\\n]*"
                replacement = f"\\1**Status:** {status}"
                content = re.sub(race_pattern, replacement, content, flags=re.DOTALL)
            
            # Write updated content
            with open(self.schedule_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print("Successfully updated race statuses")
            return True
            
        except Exception as e:
            print(f"Error updating race statuses: {str(e)}")
            return False

def main():
    """Run the schedule updater"""
    import sys
    
    updater = RaceScheduleUpdater()
    
    # Check if it's Monday or force update
    today = datetime.now().weekday()  # 0 = Monday
    force_update = '--force' in sys.argv
    
    if today == 0 or force_update:
        print("Running weekly schedule update...")
        
        # Update next race section
        next_race_success = updater.update_next_race_section()
        
        # Update race statuses
        status_success = updater.update_race_statuses()
        
        if next_race_success and status_success:
            print("Schedule update completed successfully!")
        else:
            print("Schedule update encountered errors")
    else:
        print("Not Monday - skipping update (use --force to override)")

if __name__ == "__main__":
    main()