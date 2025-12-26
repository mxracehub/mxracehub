#!/usr/bin/env python3

import os
import requests
import json
from datetime import datetime, timedelta
import sys

def get_upcoming_race():
    """Get the next upcoming race from the schedule"""
    
    # 2025 Race Schedule
    races = [
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
        # Pro Motocross starts in May
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
    
    # Find the next upcoming race
    for race in races:
        race_date = datetime.strptime(race["date"], "%Y-%m-%d").date()
        if race_date >= today:
            race["formatted_date"] = race_date.strftime("%B %d, %Y")
            race["day_of_week"] = race_date.strftime("%A")
            
            # Calculate days until race
            days_until = (race_date - today).days
            if days_until == 0:
                race["time_until"] = "Today"
            elif days_until == 1:
                race["time_until"] = "Tomorrow"
            else:
                race["time_until"] = f"{days_until} days"
            
            return race
    
    # If no upcoming races found, return the last race as placeholder
    if races:
        last_race = races[-1]
        race_date = datetime.strptime(last_race["date"], "%Y-%m-%d").date()
        last_race["formatted_date"] = race_date.strftime("%B %d, %Y")
        last_race["day_of_week"] = race_date.strftime("%A")
        last_race["time_until"] = "Season Complete"
        return last_race
    
    return None

def get_rider_odds():
    """Get betting odds for top riders"""
    
    # Top riders with realistic odds for the upcoming race
    riders = [
        {"name": "Jett Lawrence", "number": 18, "team": "Team Honda HRC", "odds": "+150", "decimal": 2.50},
        {"name": "Chase Sexton", "number": 23, "team": "Red Bull KTM Factory Racing", "odds": "+180", "decimal": 2.80},
        {"name": "Eli Tomac", "number": 3, "team": "Monster Energy Yamaha Star Racing", "odds": "+200", "decimal": 3.00},
        {"name": "Cooper Webb", "number": 2, "team": "Red Bull KTM Factory Racing", "odds": "+250", "decimal": 3.50},
        {"name": "Ken Roczen", "number": 94, "team": "Progressive Insurance ECSTAR Suzuki", "odds": "+300", "decimal": 4.00},
        {"name": "Dylan Ferrandis", "number": 14, "team": "Monster Energy Yamaha Star Racing", "odds": "+350", "decimal": 4.50},
        {"name": "Jason Anderson", "number": 21, "team": "Kawasaki Racing Team", "odds": "+400", "decimal": 5.00},
        {"name": "Malcolm Stewart", "number": 27, "team": "Rockstar Energy Husqvarna Factory Racing", "odds": "+450", "decimal": 5.50},
        {"name": "Aaron Plessinger", "number": 7, "team": "Red Bull KTM Factory Racing", "odds": "+500", "decimal": 6.00},
        {"name": "Justin Barcia", "number": 51, "team": "Troy Lee Designs Red Bull GASGAS Factory Racing", "odds": "+600", "decimal": 7.00}
    ]
    
    return riders

def update_betting_content():
    """Update the main betting page with current race information"""
    
    upcoming_race = get_upcoming_race()
    if not upcoming_race:
        print("No upcoming race found")
        return
    
    rider_odds = get_rider_odds()
    
    # Generate the betting page content in clean markdown
    content = f"""---
title: "Betting Hub"
description: "Place bets on upcoming Supercross and Motocross races with real-time odds and secure authentication"
---

# MXRaceHub Betting Center

Welcome to the MXRaceHub Betting Center, your hub for all Supercross and Motocross wagering. Get the latest odds, expert predictions, and place bets on upcoming races.

**Current Status:** [Sign In](/auth/login) | [Create Account](/auth/register)

---

## 🏁 Next Race

### {upcoming_race['series']} Round {upcoming_race['round']}: {upcoming_race['location']}
**{upcoming_race['venue']}**  
**{upcoming_race['formatted_date']} ({upcoming_race['day_of_week']})**  
**Classes:** {upcoming_race['classes']}  
**Race in:** {upcoming_race['time_until']}

**Betting Status:** Open  
[Place Bet on This Race](/betting/place-bet/?race={upcoming_race['series'].lower()}-round-{upcoming_race['round']}) | [View Full Odds](/betting/odds/)

---

## 🎯 Current Betting Odds

### Race Winner - {upcoming_race['series']} Round {upcoming_race['round']}

"""

    # Add rider odds
    for i, rider in enumerate(rider_odds[:8]):  # Show top 8 riders
        content += f"""**#{rider['number']} {rider['name']}** - {rider['odds']}  
*{rider['team']}*

"""

    content += f"""
[View All Odds](/betting/odds/) | [Place Bet](/betting/place-bet/?race={upcoming_race['series'].lower()}-round-{upcoming_race['round']})

---

## 🎲 Betting Options

### Race Winner
Bet on which rider will win the overall race.
[View Markets](/betting/place-bet/)

### Podium Finish
Predict the top 3 finishers in exact order.
[View Markets](/betting/podium/)

### Championship
Place bets on season-long championship outcomes.
[View Markets](/betting/championship/)

### Head-to-Head
Choose between two riders for direct matchups.
[View Markets](/betting/head-to-head/)

### Prop Bets
Unique betting opportunities on special race events.
[View Markets](/betting/props/)

### Group Bets
Create or join betting groups with friends.
[View Groups](/betting/groups/)

---

## 📈 Your Recent Activity

*Sign in to view your betting history and active bets.*

[View All Your Bets](/betting/my-bets/) | [Account Settings](/account/)

---

## 🏆 Weekly Leaderboard

### Top Performers This Week
1. **RaceFan92** - 8 wins, $1,250 profit
2. **MotoMaster** - 6 wins, $890 profit  
3. **SXExpert** - 7 wins, $780 profit
4. **TrackKing** - 5 wins, $650 profit
5. **DirtBikePro** - 4 wins, $540 profit

[View Full Leaderboard](/betting/leaderboard/)

---

## 📱 Quick Actions

### Ready to Bet?
- [Bet on Next Race](/betting/place-bet/?race={upcoming_race['series'].lower()}-round-{upcoming_race['round']})
- [Join a Betting Group](/betting/groups/join/)
- [Challenge a Friend](/betting/friend-bets/)
- [View My Account](/account/)

### Need Help?
- [Betting Guide](/betting/guide/)
- [How Odds Work](/betting/odds-explained/)
- [Responsible Gambling](/betting/responsible/)
- [Support](/support/)

---

## 🔒 Responsible Gambling

At MXRaceHub, we promote responsible gambling practices. All betting features are restricted to users 18 years or older in jurisdictions where sports betting is legal. We encourage setting deposit limits and taking breaks when needed.

**Gambling Support Resources**

If you or someone you know has a gambling problem, help is available.

- **National Problem Gambling Helpline:** 1-800-522-4700
- **Text:** 1-800-522-4700  
- **Chat:** ncpgambling.org/chat

---

**Create Account to Start Betting**

*Last updated: {datetime.now().strftime("%B %d, %Y at %I:%M %p")}*
"""

    # Write the updated content
    betting_file = "content/betting/_index.md"
    with open(betting_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated betting page with {upcoming_race['series']} Round {upcoming_race['round']}")
    print(f"   Next race: {upcoming_race['venue']} on {upcoming_race['formatted_date']}")
    print(f"   Time until race: {upcoming_race['time_until']}")

if __name__ == "__main__":
    try:
        update_betting_content()
        print("✅ Betting content updated successfully")
    except Exception as e:
        print(f"❌ Error updating betting content: {str(e)}")
        sys.exit(1)