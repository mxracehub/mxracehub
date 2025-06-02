#!/usr/bin/env python3
"""
Create a professional race schedule matching the Pro Motocross layout
with proper ticket button integration and authentic race information
"""

from datetime import datetime

def create_professional_schedule():
    """Generate a professional race schedule layout"""
    
    # 2025 Race Schedule with authentic information
    supercross_races = [
        {"round": 1, "date": "2025-01-04", "venue": "Angel Stadium", "location": "Anaheim, CA", "classes": "450SX, 250SX West"},
        {"round": 2, "date": "2025-01-11", "venue": "Snapdragon Stadium", "location": "San Diego, CA", "classes": "450SX, 250SX West"},
        {"round": 3, "date": "2025-01-18", "venue": "Angel Stadium", "location": "Anaheim, CA", "classes": "450SX, 250SX West"},
        {"round": 4, "date": "2025-01-25", "venue": "State Farm Stadium", "location": "Glendale, AZ", "classes": "450SX, 250SX West"},
        {"round": 5, "date": "2025-02-01", "venue": "Ford Field", "location": "Detroit, MI", "classes": "450SX, 250SX East"},
        {"round": 6, "date": "2025-02-08", "venue": "Raymond James Stadium", "location": "Tampa, FL", "classes": "450SX, 250SX East"},
        {"round": 7, "date": "2025-02-15", "venue": "AT&T Stadium", "location": "Arlington, TX", "classes": "450SX, 250SX East"},
        {"round": 8, "date": "2025-02-22", "venue": "Daytona International Speedway", "location": "Daytona Beach, FL", "classes": "450SX, 250SX East"},
        {"round": 9, "date": "2025-03-01", "venue": "Lucas Oil Stadium", "location": "Indianapolis, IN", "classes": "450SX, 250SX East"},
        {"round": 10, "date": "2025-03-08", "venue": "Lumen Field", "location": "Seattle, WA", "classes": "450SX, 250SX West"},
        {"round": 11, "date": "2025-03-15", "venue": "Empower Field", "location": "Denver, CO", "classes": "450SX, 250SX West"},
        {"round": 12, "date": "2025-03-29", "venue": "NRG Stadium", "location": "Houston, TX", "classes": "450SX, 250SX East"},
        {"round": 13, "date": "2025-04-05", "venue": "Mercedes-Benz Stadium", "location": "Atlanta, GA", "classes": "450SX, 250SX East"},
        {"round": 14, "date": "2025-04-12", "venue": "Nissan Stadium", "location": "Nashville, TN", "classes": "450SX, 250SX East"},
        {"round": 15, "date": "2025-04-19", "venue": "Gillette Stadium", "location": "Foxborough, MA", "classes": "450SX, 250SX East"},
        {"round": 16, "date": "2025-04-26", "venue": "MetLife Stadium", "location": "East Rutherford, NJ", "classes": "450SX, 250SX East"},
        {"round": 17, "date": "2025-05-03", "venue": "Rice-Eccles Stadium", "location": "Salt Lake City, UT", "classes": "450SX, 250SX West"}
    ]
    
    motocross_races = [
        {"round": 1, "date": "2025-05-24", "venue": "Fox Raceway", "location": "Pala, CA", "classes": "450MX, 250MX"},
        {"round": 2, "date": "2025-05-31", "venue": "Thunder Valley Motocross Park", "location": "Lakewood, CO", "classes": "450MX, 250MX"},
        {"round": 3, "date": "2025-06-07", "venue": "Southwick Motocross Park", "location": "Southwick, MA", "classes": "450MX, 250MX"},
        {"round": 4, "date": "2025-06-14", "venue": "High Point Raceway", "location": "Mt. Morris, PA", "classes": "450MX, 250MX"},
        {"round": 5, "date": "2025-06-21", "venue": "Muddy Creek Raceway", "location": "Blountville, TN", "classes": "450MX, 250MX"},
        {"round": 6, "date": "2025-06-28", "venue": "RedBud MX", "location": "Buchanan, MI", "classes": "450MX, 250MX"},
        {"round": 7, "date": "2025-07-05", "venue": "Spring Creek Motocross", "location": "Millville, MN", "classes": "450MX, 250MX"},
        {"round": 8, "date": "2025-07-19", "venue": "Washougal Motocross Park", "location": "Washougal, WA", "classes": "450MX, 250MX"},
        {"round": 9, "date": "2025-08-02", "venue": "Unadilla MX", "location": "New Berlin, NY", "classes": "450MX, 250MX"},
        {"round": 10, "date": "2025-08-09", "venue": "WW Ranch Motocross Park", "location": "Jacksonville, FL", "classes": "450MX, 250MX"},
        {"round": 11, "date": "2025-08-16", "venue": "Budds Creek Motocross", "location": "Mechanicsville, MD", "classes": "450MX, 250MX"},
        {"round": 12, "date": "2025-08-30", "venue": "Fox Raceway", "location": "Pala, CA", "classes": "450MX, 250MX"}
    ]
    
    today = datetime.now().date()
    
    def get_race_status(race_date):
        if race_date < today:
            return {"status": "completed", "class": "completed", "text": "✅ Completed"}
        elif race_date == today:
            return {"status": "today", "class": "next-race", "text": "🔴 Race Day"}
        elif (race_date - today).days <= 7:
            return {"status": "next", "class": "next-race", "text": "🔴 Next Race"}
        else:
            return {"status": "upcoming", "class": "upcoming", "text": "🟡 Upcoming"}
    
    def format_date(date_str):
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        return {
            "formatted": date_obj.strftime("%B %d, %Y"),
            "day": date_obj.strftime("%A"),
            "obj": date_obj.date()
        }
    
    # Generate Supercross race cards
    supercross_cards = ""
    for race in supercross_races:
        date_info = format_date(race["date"])
        status_info = get_race_status(date_info["obj"])
        
        if status_info["status"] == "completed":
            ticket_buttons = '''
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>'''
        else:
            ticket_buttons = f'''
              <div class="ticket-actions">
                <a href="https://www.supercrosslive.com/tickets/" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>'''
        
        supercross_cards += f'''
      <div class="race-card {status_info['class']}">
        <div class="round-number">R{race['round']}</div>
        <div class="race-info">
          <h3>{race['venue']}</h3>
          <p class="race-date">{date_info['formatted']}</p>
          <p class="race-location">{race['location']}</p>
        </div>
        <div class="race-classes">{race['classes']}</div>
        <div class="race-status status-{status_info['status']}">{status_info['text']}</div>
        {ticket_buttons}
      </div>'''
    
    # Generate Motocross race cards
    motocross_cards = ""
    for race in motocross_races:
        date_info = format_date(race["date"])
        status_info = get_race_status(date_info["obj"])
        
        if status_info["status"] == "completed":
            ticket_buttons = '''
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>'''
        else:
            ticket_buttons = f'''
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>'''
        
        motocross_cards += f'''
      <div class="race-card {status_info['class']}">
        <div class="round-number">R{race['round']}</div>
        <div class="race-info">
          <h3>{race['venue']}</h3>
          <p class="race-date">{date_info['formatted']}</p>
          <p class="race-location">{race['location']}</p>
        </div>
        <div class="race-classes">{race['classes']}</div>
        <div class="race-status status-{status_info['status']}">{status_info['text']}</div>
        {ticket_buttons}
      </div>'''
    
    # Create the complete schedule content
    content = f'''---
title: "2025 Race Schedule"
description: "Complete 2025 schedule for AMA Supercross and Pro Motocross with official ticket links"
---

<style>
.schedule-container {{
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}}

.schedule-header {{
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #e20613, #ff4757);
  color: white;
  padding: 2rem;
  border-radius: 8px;
}}

.schedule-nav {{
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}}

.nav-button {{
  background: #003366;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s;
}}

.nav-button:hover {{
  background: #e20613;
  color: white;
}}

.series-section {{
  margin-bottom: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}}

.series-header {{
  background: #003366;
  color: white;
  padding: 1.5rem;
  text-align: center;
}}

.series-title {{
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
}}

.series-subtitle {{
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
}}

.race-grid {{
  display: grid;
  gap: 1px;
  background: #e0e0e0;
}}

.race-card {{
  background: white;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 80px 1fr 120px 150px 180px;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.2s;
}}

.race-card:hover {{
  background: #f8f9fa;
}}

.race-card.next-race {{
  background: #fff3cd;
  border-left: 4px solid #e20613;
}}

.race-card.completed {{
  opacity: 0.7;
}}

.round-number {{
  font-weight: bold;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}}

.race-info h3 {{
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #333;
}}

.race-date {{
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}}

.race-location {{
  color: #666;
  font-size: 0.85rem;
  margin: 0;
}}

.race-classes {{
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}}

.race-status {{
  text-align: center;
  font-weight: 600;
}}

.status-completed {{
  color: #28a745;
}}

.status-next {{
  color: #e20613;
  animation: pulse 2s infinite;
}}

.status-upcoming {{
  color: #ffc107;
}}

@keyframes pulse {{
  0% {{ opacity: 1; }}
  50% {{ opacity: 0.7; }}
  100% {{ opacity: 1; }}
}}

.ticket-actions {{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
}}

.ticket-btn {{
  background: #e20613;
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.3s;
}}

.ticket-btn:hover {{
  background: #c5050f;
  color: white;
}}

.ticket-btn.secondary {{
  background: #6c757d;
}}

.ticket-btn.secondary:hover {{
  background: #545b62;
}}

.ticket-btn.disabled {{
  background: #dee2e6;
  color: #6c757d;
  cursor: not-allowed;
}}

@media (max-width: 768px) {{
  .race-card {{
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.75rem;
  }}
  
  .race-info h3 {{
    font-size: 1rem;
  }}
  
  .ticket-actions {{
    flex-direction: row;
    justify-content: center;
  }}
}}
</style>

<div class="schedule-container">
  <div class="schedule-header">
    <h1>2025 Race Schedule</h1>
    <p>Complete schedule for AMA Supercross and Pro Motocross Championships</p>
  </div>

  <div class="schedule-nav">
    <a href="#supercross" class="nav-button">Supercross</a>
    <a href="#motocross" class="nav-button">Pro Motocross</a>
    <a href="/tickets/" class="nav-button">Get Tickets</a>
    <a href="/betting/" class="nav-button">Betting</a>
  </div>

  <div id="supercross" class="series-section">
    <div class="series-header">
      <h2 class="series-title">AMA Supercross Championship</h2>
      <p class="series-subtitle">17 Rounds • January - May 2025 • 450SX & 250SX</p>
    </div>
    <div class="race-grid">{supercross_cards}
    </div>
  </div>

  <div id="motocross" class="series-section">
    <div class="series-header">
      <h2 class="series-title">Pro Motocross Championship</h2>
      <p class="series-subtitle">12 Rounds • May - August 2025 • 450MX & 250MX</p>
    </div>
    <div class="race-grid">{motocross_cards}
    </div>
  </div>

  <div class="series-section">
    <div class="series-header">
      <h2 class="series-title">Official Ticket Information</h2>
    </div>
    <div style="padding: 2rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        <div>
          <h3 style="color: #e20613; margin-bottom: 1rem;">🏟️ Supercross Tickets</h3>
          <p><strong>Official Source:</strong> <a href="https://www.supercrosslive.com/tickets/" style="color: #e20613;">SupercrossLive.com</a></p>
          <p>Get authentic tickets directly from AMA Supercross for all stadium events.</p>
        </div>
        <div>
          <h3 style="color: #e20613; margin-bottom: 1rem;">🏁 Pro Motocross Tickets</h3>
          <p><strong>Official Source:</strong> <a href="https://www.promotocross.com/schedule" style="color: #e20613;">ProMotocross.com</a></p>
          <p>Purchase tickets for outdoor nationals directly from official sources.</p>
        </div>
      </div>
    </div>
  </div>
</div>'''
    
    # Write the updated schedule
    with open("content/races/schedule/_index.md", 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Created professional race schedule layout")
    print("   Matches Pro Motocross design with authentic ticket links")
    print(f"   {len(supercross_races)} Supercross rounds + {len(motocross_races)} Pro Motocross rounds")

if __name__ == "__main__":
    create_professional_schedule()