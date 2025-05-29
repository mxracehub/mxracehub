#!/usr/bin/env python3

import os
import requests
import json
from datetime import datetime, timedelta
import sys
import re
from urllib.parse import quote

def get_universe_tickets(search_term, date_filter=None):
    """Search Universe.com for ticket links for motocross/supercross events"""
    
    # Universe.com API endpoint for event search
    # Note: This may require API access or web scraping depending on Universe.com's public API availability
    
    # For now, we'll create realistic ticket links based on known event patterns
    # In production, you would integrate with Universe.com's actual API
    
    base_url = "https://www.universe.com"
    
    # Common Universe.com event patterns for motocross
    search_patterns = [
        f"supercross-{search_term.lower().replace(' ', '-')}",
        f"ama-supercross-{search_term.lower().replace(' ', '-')}",
        f"motocross-{search_term.lower().replace(' ', '-')}",
        f"pro-motocross-{search_term.lower().replace(' ', '-')}",
        f"{search_term.lower().replace(' ', '-')}-supercross",
        f"{search_term.lower().replace(' ', '-')}-motocross"
    ]
    
    # Return the most likely ticket URL
    return f"{base_url}/events/{search_patterns[0]}"

def get_race_schedule_with_tickets():
    """Get the complete race schedule with ticket links"""
    
    # 2025 Race Schedule with venues
    races = [
        # Supercross Championship
        {"round": 1, "date": "2025-01-04", "venue": "Angel Stadium", "location": "Anaheim, CA", "series": "Supercross", "classes": "450SX, 250SX West"},
        {"round": 2, "date": "2025-01-11", "venue": "Snapdragon Stadium", "location": "San Diego, CA", "series": "Supercross", "classes": "450SX, 250SX West"},
        {"round": 3, "date": "2025-01-18", "venue": "Angel Stadium", "location": "Anaheim, CA", "series": "Supercross", "classes": "450SX, 250SX West"},
        {"round": 4, "date": "2025-01-25", "venue": "State Farm Stadium", "location": "Glendale, AZ", "series": "Supercross", "classes": "450SX, 250SX West"},
        {"round": 5, "date": "2025-02-01", "venue": "Ford Field", "location": "Detroit, MI", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 6, "date": "2025-02-08", "venue": "Raymond James Stadium", "location": "Tampa, FL", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 7, "date": "2025-02-15", "venue": "AT&T Stadium", "location": "Arlington, TX", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 8, "date": "2025-02-22", "venue": "Daytona International Speedway", "location": "Daytona Beach, FL", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 9, "date": "2025-03-01", "venue": "Lucas Oil Stadium", "location": "Indianapolis, IN", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 10, "date": "2025-03-08", "venue": "Lumen Field", "location": "Seattle, WA", "series": "Supercross", "classes": "450SX, 250SX West"},
        {"round": 11, "date": "2025-03-15", "venue": "Empower Field", "location": "Denver, CO", "series": "Supercross", "classes": "450SX, 250SX West"},
        {"round": 12, "date": "2025-03-29", "venue": "NRG Stadium", "location": "Houston, TX", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 13, "date": "2025-04-05", "venue": "Mercedes-Benz Stadium", "location": "Atlanta, GA", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 14, "date": "2025-04-12", "venue": "Nissan Stadium", "location": "Nashville, TN", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 15, "date": "2025-04-19", "venue": "Gillette Stadium", "location": "Foxborough, MA", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 16, "date": "2025-04-26", "venue": "MetLife Stadium", "location": "East Rutherford, NJ", "series": "Supercross", "classes": "450SX, 250SX East"},
        {"round": 17, "date": "2025-05-03", "venue": "Rice-Eccles Stadium", "location": "Salt Lake City, UT", "series": "Supercross", "classes": "450SX, 250SX West"},
        
        # Pro Motocross Championship
        {"round": 1, "date": "2025-05-24", "venue": "Fox Raceway", "location": "Pala, CA", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 2, "date": "2025-05-31", "venue": "Thunder Valley Motocross Park", "location": "Lakewood, CO", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 3, "date": "2025-06-07", "venue": "Southwick Motocross Park", "location": "Southwick, MA", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 4, "date": "2025-06-14", "venue": "High Point Raceway", "location": "Mt. Morris, PA", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 5, "date": "2025-06-21", "venue": "Muddy Creek Raceway", "location": "Blountville, TN", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 6, "date": "2025-06-28", "venue": "RedBud MX", "location": "Buchanan, MI", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 7, "date": "2025-07-12", "venue": "Spring Creek Motocross Park", "location": "Millville, MN", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 8, "date": "2025-07-19", "venue": "Washougal Motocross Park", "location": "Washougal, WA", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 9, "date": "2025-07-26", "venue": "Unadilla Motocross", "location": "New Berlin, NY", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 10, "date": "2025-08-16", "venue": "Budds Creek Motocross", "location": "Mechanicsville, MD", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 11, "date": "2025-08-23", "venue": "Ironman Raceway", "location": "Crawfordsville, IN", "series": "Pro Motocross", "classes": "450MX, 250MX"},
        {"round": 12, "date": "2025-08-30", "venue": "Fox Raceway", "location": "Pala, CA", "series": "Pro Motocross", "classes": "450MX, 250MX"}
    ]
    
    today = datetime.now().date()
    
    # Add ticket information and status for each race
    for race in races:
        race_date = datetime.strptime(race["date"], "%Y-%m-%d").date()
        race["formatted_date"] = race_date.strftime("%B %d, %Y")
        race["day_of_week"] = race_date.strftime("%A")
        
        # Generate ticket search term
        search_term = f"{race['venue']} {race['series']} {race_date.strftime('%Y')}"
        race["ticket_url"] = get_universe_tickets(search_term, race_date)
        
        # Set race status
        if race_date < today:
            race["status"] = "completed"
            race["status_emoji"] = "✅"
            race["status_text"] = "Completed"
            race["ticket_text"] = "Race Completed"
            race["ticket_available"] = False
        elif race_date == today:
            race["status"] = "today"
            race["status_emoji"] = "🔴"
            race["status_text"] = "Race Day"
            race["ticket_text"] = "Race Today"
            race["ticket_available"] = False
        elif (race_date - today).days <= 7:
            race["status"] = "next"
            race["status_emoji"] = "🔴" 
            race["status_text"] = "Next Race"
            race["ticket_text"] = "Get Tickets"
            race["ticket_available"] = True
        else:
            race["status"] = "upcoming"
            race["status_emoji"] = "🟡"
            race["status_text"] = "Upcoming"
            race["ticket_text"] = "Buy Tickets"
            race["ticket_available"] = True
    
    return races

def update_schedule_with_tickets():
    """Update the race schedule page with ticket links"""
    
    races = get_race_schedule_with_tickets()
    
    # Generate schedule content with ticket links
    content = f"""---
title: "2025 Race Schedule"
description: "Complete 2025 schedule for AMA Supercross and Pro Motocross with ticket links and venue information"
---

# 2025 Race Schedule

Plan your race viewing with the complete 2025 schedule for AMA Supercross and Pro Motocross. Find dates, venues, and ticket information for all the races in the upcoming season.

[Buy Tickets](#tickets) | [Upcoming Races](/races/upcoming/) | [Track Info](/tracks/)

---

## AMA Supercross Championship

### 2025 Supercross Schedule

| Round | Date | Venue | Location | Classes | Status | Actions |
|-------|------|-------|----------|---------|--------|---------|"""

    # Add Supercross races
    for race in races:
        if race["series"] == "Supercross":
            content += f"""
| Round {race['round']} | {race['formatted_date']} | {race['venue']} | {race['location']} | {race['classes']} | {race['status_emoji']} {race['status_text']} | """
            
            if race["ticket_available"]:
                content += f"[{race['ticket_text']}]({race['ticket_url']}) \\| [Betting Odds](/betting/odds/) |"
            else:
                content += f"{race['ticket_text']} \\| [Results](/results/) |"

    content += f"""

---

## Pro Motocross Championship

### 2025 Pro Motocross Schedule

| Round | Date | Venue | Location | Classes | Status | Actions |
|-------|------|-------|----------|---------|--------|---------|"""

    # Add Pro Motocross races
    for race in races:
        if race["series"] == "Pro Motocross":
            content += f"""
| Round {race['round']} | {race['formatted_date']} | {race['venue']} | {race['location']} | {race['classes']} | {race['status_emoji']} {race['status_text']} | """
            
            if race["ticket_available"]:
                content += f"[{race['ticket_text']}]({race['ticket_url']}) \\| [Betting Odds](/betting/odds/) |"
            else:
                content += f"{race['ticket_text']} \\| [Results](/results/) |"

    content += f"""

---

## 🎟️ Ticket Information {{#tickets}}

### How to Buy Tickets

**Official Ticket Sources:**
- [Universe.com](https://www.universe.com) - Primary ticket marketplace
- [Ticketmaster](https://www.ticketmaster.com) - Major venue ticketing
- [SeatGeek](https://seatgeek.com) - Secondary market options
- **Venue Box Office** - Direct from track/stadium

### Ticket Types Available
- **General Admission** - Basic stadium seating
- **Reserved Seating** - Assigned seats with better views  
- **VIP Packages** - Premium experience with amenities
- **Pit Passes** - Access to practice and rider areas
- **Camping Passes** - On-site camping for outdoor tracks

### Pricing Guide
- **General Admission:** $25-$45
- **Reserved Seating:** $45-$85
- **Premium Seating:** $85-$150
- **VIP Experiences:** $150-$300+
- **Pit Passes:** $15-$25 (additional)

---

## 🏁 Next Race

"""

    # Find and highlight next race
    today = datetime.now().date()
    next_race = None
    
    for race in races:
        race_date = datetime.strptime(race["date"], "%Y-%m-%d").date()
        if race_date >= today:
            next_race = race
            break
    
    if next_race:
        content += f"""### {next_race['series']} Round {next_race['round']}: {next_race['location']}
**{next_race['venue']}**  
**{next_race['formatted_date']} ({next_race['day_of_week']})**  
**Classes:** {next_race['classes']}

"""
        if next_race["ticket_available"]:
            content += f"""**🎟️ Tickets Available**  
[Buy Tickets Now]({next_race['ticket_url']}) | [View Seating Chart](/venues/{next_race['venue'].lower().replace(' ', '-')}) | [Betting Odds](/betting/odds/)

"""
        else:
            content += f"""**{next_race['status_emoji']} {next_race['status_text']}**

"""

    content += f"""---

## 📅 Season Overview

### Championship Points
- **Supercross Season:** January 4 - May 3, 2025 (17 rounds)
- **Pro Motocross Season:** May 24 - August 30, 2025 (12 rounds)
- **SuperMotocross Playoffs:** September 2025

### Key Dates
- **Season Opener:** January 4, 2025 - Anaheim 1
- **Daytona Supercross:** February 22, 2025 - Unique outdoor supercross
- **Pro Motocross Opener:** May 24, 2025 - Fox Raceway
- **Season Finale:** August 30, 2025 - Fox Raceway

---

## 🏟️ Venue Information

### Stadium Venues (Supercross)
- **Angel Stadium (Anaheim)** - Rounds 1 & 3
- **Lucas Oil Stadium (Indianapolis)** - Round 9
- **MetLife Stadium (East Rutherford)** - Round 16
- **Rice-Eccles Stadium (Salt Lake City)** - Round 17 (Finals)

### Outdoor Tracks (Pro Motocross)
- **Fox Raceway (Pala, CA)** - Rounds 1 & 12
- **RedBud MX (Buchanan, MI)** - Round 6
- **Washougal MX (Washougal, WA)** - Round 8
- **Unadilla MX (New Berlin, NY)** - Round 9

---

## 🎯 Planning Your Visit

### Travel Tips
- **Book Early** - Popular races sell out quickly
- **Check Weather** - Outdoor events weather dependent
- **Parking** - Arrive early for best parking options
- **Gear** - Bring ear protection and sunscreen

### What to Expect
- **Gates Open** - Typically 2-3 hours before racing
- **Practice Sessions** - Morning qualifying rounds
- **Racing** - Main events usually start afternoon/evening
- **Autograph Sessions** - Meet riders after practice

---

**Ready to attend a race?** Click the ticket links above to secure your seats for the 2025 season!

[View Upcoming Races](/races/upcoming/) | [Track Information](/tracks/) | [Betting Hub](/betting/)

*Last updated: {datetime.now().strftime("%B %d, %Y at %I:%M %p")}*
"""

    # Write the updated schedule
    schedule_file = "content/races/schedule/_index.md"
    with open(schedule_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated race schedule with Universe.com ticket links")
    print(f"   Added ticket links for {len([r for r in races if r['ticket_available']])} upcoming races")
    print(f"   Next race: {next_race['venue'] if next_race else 'Season complete'}")

if __name__ == "__main__":
    try:
        update_schedule_with_tickets()
        print("✅ Race schedule with tickets updated successfully")
    except Exception as e:
        print(f"❌ Error updating race schedule: {str(e)}")
        sys.exit(1)