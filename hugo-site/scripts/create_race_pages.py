#!/usr/bin/env python3

import os
import requests
import json
from datetime import datetime, timedelta
import sys
import re
from urllib.parse import quote

def create_individual_race_pages():
    """Create individual race pages with dedicated ticket links"""
    
    # 2025 Race Schedule
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
    
    # Create content/races/events directory if it doesn't exist
    os.makedirs("content/races/events", exist_ok=True)
    
    for race in races:
        race_date = datetime.strptime(race["date"], "%Y-%m-%d").date()
        race["formatted_date"] = race_date.strftime("%B %d, %Y")
        race["day_of_week"] = race_date.strftime("%A")
        
        # Generate Universe.com ticket URL
        venue_slug = race['venue'].lower().replace(' ', '-').replace('.', '')
        series_slug = race['series'].lower().replace(' ', '-')
        date_slug = race_date.strftime('%Y-%m-%d')
        ticket_url = f"https://www.universe.com/events/{series_slug}-{venue_slug}-{date_slug}"
        
        # Set race status
        if race_date < today:
            status = "completed"
            status_emoji = "✅"
            status_text = "Race Completed"
            ticket_text = "View Results"
            ticket_button = f"[View Race Results](/results/{series_slug}-round-{race['round']}/)"
        elif race_date == today:
            status = "today"
            status_emoji = "🔴"
            status_text = "Race Day - Today!"
            ticket_text = "Watch Live"
            ticket_button = f"[Watch Live Stream](/live/) | [Last Minute Tickets]({ticket_url})"
        elif (race_date - today).days <= 7:
            status = "next"
            status_emoji = "🔴"
            status_text = "Next Race"
            ticket_text = "Get Tickets Now"
            ticket_button = f"[Buy Tickets Now]({ticket_url})"
        else:
            status = "upcoming"
            status_emoji = "🟡"
            status_text = "Upcoming"
            ticket_text = "Buy Tickets"
            ticket_button = f"[Buy Tickets]({ticket_url})"
        
        # Create filename
        filename = f"{series_slug}-round-{race['round']}-{venue_slug}.md"
        filepath = f"content/races/events/{filename}"
        
        # Generate page content
        content = f"""---
title: "{race['series']} Round {race['round']}: {race['location']}"
description: "Get tickets and information for {race['series']} Round {race['round']} at {race['venue']} in {race['location']}"
date: "{race['date']}"
venue: "{race['venue']}"
location: "{race['location']}"
series: "{race['series']}"
round: {race['round']}
classes: "{race['classes']}"
status: "{status}"
ticket_url: "{ticket_url}"
---

# {race['series']} Round {race['round']}

## {race['venue']}, {race['location']}

**{status_emoji} {status_text}**  
**{race['formatted_date']} ({race['day_of_week']})**  
**Classes:** {race['classes']}

---

## 🎟️ Tickets & Information

### {ticket_text}

{ticket_button}

### Ticket Options Available
- **General Admission** - $25-$45
- **Reserved Seating** - $45-$85  
- **Premium Seating** - $85-$150
- **VIP Packages** - $150-$300+
- **Pit Passes** - $15-$25 (additional)

### Alternative Ticket Sources
- [Ticketmaster](https://www.ticketmaster.com/search?q={quote(race['venue'] + ' supercross')})
- [SeatGeek](https://seatgeek.com/search?q={quote(race['venue'] + ' supercross')})
- [StubHub](https://www.stubhub.com/search?q={quote(race['venue'] + ' supercross')})
- **{race['venue']} Box Office** - Call venue directly

---

## 🏁 Race Information

### Event Schedule
- **Gates Open:** 3:00 PM
- **Practice Sessions:** 4:00 PM - 6:00 PM
- **Opening Ceremonies:** 6:30 PM
- **Main Events:** 7:00 PM - 10:00 PM

### Classes Racing
"""

        if race['series'] == 'Supercross':
            content += f"""- **450SX Class** - Premier class with top riders
- **{race['classes'].split(', ')[1]}** - Regional championship
"""
        else:
            content += f"""- **450MX Class** - Premier outdoor motocross
- **250MX Class** - Future stars and veterans
"""

        content += f"""
### Venue Details
**{race['venue']}**  
{race['location']}

"""

        # Add venue-specific information
        if 'Stadium' in race['venue'] or 'Field' in race['venue']:
            content += f"""**Venue Type:** Indoor Stadium  
**Capacity:** 40,000-70,000  
**Surface:** Manufactured supercross track  
**Parking:** Stadium parking available - arrive early  
**Weather:** Climate controlled indoor event

"""
        else:
            content += f"""**Venue Type:** Outdoor Motocross Track  
**Capacity:** 15,000-30,000  
**Surface:** Natural terrain motocross track  
**Parking:** On-site parking available  
**Weather:** Outdoor event - weather dependent

"""

        content += f"""---

## 📅 Schedule Context

### In This Championship
"""

        if race['series'] == 'Supercross':
            content += f"""- **Round {race['round']} of 17** in the 2025 Supercross Championship
- **Next Round:** Round {race['round'] + 1 if race['round'] < 17 else 'N/A - Season Finale'}
- **Championship Points:** Full points awarded
"""
        else:
            content += f"""- **Round {race['round']} of 12** in the 2025 Pro Motocross Championship  
- **Next Round:** Round {race['round'] + 1 if race['round'] < 12 else 'N/A - Season Finale'}
- **Championship Points:** Full points awarded
"""

        content += f"""
### Recent Results
"""

        if race['round'] > 1:
            content += f"""- **Previous Round:** [View Results](/results/{series_slug}-round-{race['round'] - 1}/)
"""
        content += f"""- **Championship Standings:** [View Current Points](/standings/)
- **Season Schedule:** [View Full Schedule](/races/schedule/)

---

## 🎯 Betting & Fantasy

### Place Your Bets
- [Bet on Race Winner](/betting/place-bet/?race={series_slug}-round-{race['round']})
- [View Current Odds](/betting/odds/)
- [Join Betting Groups](/betting/groups/)

### Fantasy Racing
- [Create Fantasy Lineup](/fantasy/)
- [Join Public Contests](/fantasy/contests/)

---

## 📱 Race Day Tips

### Getting There
- **Arrive Early** - Gates open 3 hours before racing
- **Parking** - $20-$40, cash preferred
- **Public Transit** - Check local transit options
- **Ride Share** - Expect surge pricing after event

### What to Bring
- **Ear Protection** - Racing is loud!
- **Sunscreen** - Even for indoor events
- **Layers** - Temperature can vary
- **Cash** - For parking and concessions
- **Smartphone** - For timing and live updates

### What to Expect
- **Practice & Qualifying** - See riders learn the track
- **Opening Ceremonies** - Rider introductions
- **Heat Races** - Qualifying for main events  
- **LCQ (Last Chance Qualifier)** - Final spots available
- **Main Events** - Championship races

---

## 🏆 Key Riders to Watch

### 450 Class Contenders
- **#18 Jett Lawrence** - Team Honda HRC
- **#23 Chase Sexton** - Red Bull KTM Factory Racing
- **#3 Eli Tomac** - Monster Energy Yamaha Star Racing
- **#2 Cooper Webb** - Red Bull KTM Factory Racing

### 250 Class Rising Stars
- **#51 Haiden Deegan** - Monster Energy Yamaha Star Racing
- **#36 RJ Hampshire** - Rockstar Energy Husqvarna Factory Racing
- **#55 Levi Kitchen** - Kawasaki Racing Team

---

## 📺 How to Watch

### TV Coverage
- **NBC Sports** - Live coverage of main events
- **Peacock** - Practice and qualifying sessions
- **SupercrossLIVE.com** - Premium subscription service

### International Viewers
- **MXGP-TV** - Global streaming option
- **Local Broadcasters** - Check regional listings

---

**Ready for race day?** Get your tickets now and join thousands of fans for an unforgettable night of racing!

{ticket_button} | [View Race Schedule](/races/schedule/) | [Track Information](/tracks/)

*Page last updated: {datetime.now().strftime("%B %d, %Y")}*
"""

        # Write the race page
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Created race page: {filename}")
    
    print(f"✅ Created {len(races)} individual race pages with Universe.com ticket links")

if __name__ == "__main__":
    try:
        create_individual_race_pages()
        print("✅ All race pages created successfully")
    except Exception as e:
        print(f"❌ Error creating race pages: {str(e)}")
        sys.exit(1)