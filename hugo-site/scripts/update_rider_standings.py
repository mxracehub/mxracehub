#!/usr/bin/env python3
"""
MXRaceHub - Rider Standings Update Script
Automatically updates 450 and 250 class rider point standings weekly
"""

import requests
import json
import re
import os
from datetime import datetime
from bs4 import BeautifulSoup

class RiderStandingsUpdater:
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.content_dir = os.path.join(self.base_dir, "content")
        
        # Official AMA Supercross standings URLs
        self.standings_urls = {
            "450": "https://www.supercrosslive.com/standings/450sx",
            "250_east": "https://www.supercrosslive.com/standings/250sx-east", 
            "250_west": "https://www.supercrosslive.com/standings/250sx-west",
            "450_mx": "https://promotocross.com/standings/450-class",
            "250_mx": "https://promotocross.com/standings/250-class"
        }
        
        # Backup API endpoints for additional data
        self.api_endpoints = {
            "supercross": "https://www.supercrosslive.com/api/standings",
            "motocross": "https://promotocross.com/api/standings"
        }

    def fetch_standings(self, division):
        """Fetch current standings for a specific division"""
        print(f"Fetching {division} standings...")
        
        try:
            # Primary source: Official websites
            if division in self.standings_urls:
                response = requests.get(self.standings_urls[division], timeout=10)
                if response.status_code == 200:
                    return self.parse_standings_html(response.text, division)
            
            # Fallback: Try API endpoints
            for api_name, api_url in self.api_endpoints.items():
                try:
                    api_response = requests.get(f"{api_url}?class={division}", timeout=10)
                    if api_response.status_code == 200:
                        return self.parse_standings_api(api_response.json(), division)
                except Exception as e:
                    print(f"API {api_name} failed: {e}")
                    continue
                    
        except Exception as e:
            print(f"Error fetching {division} standings: {e}")
            return None
            
        return None

    def parse_standings_html(self, html_content, division):
        """Parse standings from HTML content"""
        soup = BeautifulSoup(html_content, 'html.parser')
        standings = []
        
        # Look for standings table
        table = soup.find('table', class_=['standings', 'standings-table']) or soup.find('div', class_='standings')
        
        if table:
            rows = table.find_all('tr')[1:]  # Skip header row
            
            for row in rows[:20]:  # Top 20 riders
                cells = row.find_all(['td', 'th'])
                if len(cells) >= 4:
                    try:
                        position = cells[0].get_text(strip=True)
                        rider_name = cells[1].get_text(strip=True)
                        points = cells[2].get_text(strip=True)
                        
                        # Extract rider number if available
                        number_cell = row.find('span', class_='number') or row.find('div', class_='rider-number')
                        rider_number = number_cell.get_text(strip=True) if number_cell else "N/A"
                        
                        standings.append({
                            'position': int(position) if position.isdigit() else len(standings) + 1,
                            'rider_name': rider_name,
                            'rider_number': rider_number,
                            'points': int(re.sub(r'[^\d]', '', points)) if re.sub(r'[^\d]', '', points) else 0,
                            'division': division
                        })
                    except (ValueError, IndexError) as e:
                        continue
                        
        return standings

    def parse_standings_api(self, api_data, division):
        """Parse standings from API response"""
        standings = []
        
        if isinstance(api_data, dict) and 'standings' in api_data:
            standings_data = api_data['standings']
        elif isinstance(api_data, list):
            standings_data = api_data
        else:
            return standings
            
        for idx, rider in enumerate(standings_data[:20]):
            try:
                standings.append({
                    'position': rider.get('position', idx + 1),
                    'rider_name': rider.get('name', rider.get('rider_name', 'Unknown')),
                    'rider_number': rider.get('number', rider.get('rider_number', 'N/A')),
                    'points': rider.get('points', 0),
                    'division': division
                })
            except Exception as e:
                continue
                
        return standings

    def update_450_standings(self, standings_data):
        """Update 450 class standings in content files"""
        file_path = os.path.join(self.content_dir, "riders", "450", "_index.md")
        
        if not standings_data:
            print("No 450 standings data available")
            return False
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Generate standings table HTML
            standings_html = self.generate_standings_table(standings_data, "450 Class")
            
            # Find and replace standings section
            pattern = r'(## Current Championship Standings.*?)(</div>\s*</div>)'
            replacement = f'\\1{standings_html}\\2'
            
            if re.search(pattern, content, re.DOTALL):
                content = re.sub(pattern, replacement, content, flags=re.DOTALL)
            else:
                # Add standings section before Team Rosters
                team_rosters_pattern = r'(## Team Rosters)'
                standings_section = f"\n## Current Championship Standings\n\n{standings_html}\n\n\\1"
                content = re.sub(team_rosters_pattern, standings_section, content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            print("✓ Updated 450 class standings")
            return True
            
        except Exception as e:
            print(f"Error updating 450 standings: {e}")
            return False

    def update_250_standings(self, east_standings, west_standings):
        """Update 250 class standings in content files"""
        file_path = os.path.join(self.content_dir, "riders", "250", "_index.md")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Generate standings tables for both divisions
            standings_html = ""
            
            if east_standings:
                standings_html += self.generate_standings_table(east_standings, "250 East Championship")
                
            if west_standings:
                standings_html += "\n" + self.generate_standings_table(west_standings, "250 West Championship")
            
            if not standings_html:
                print("No 250 standings data available")
                return False
            
            # Find and replace standings section
            pattern = r'(## Current Championship Standings.*?)(</div>\s*</div>)'
            replacement = f'\\1{standings_html}\\2'
            
            if re.search(pattern, content, re.DOTALL):
                content = re.sub(pattern, replacement, content, flags=re.DOTALL)
            else:
                # Add standings section before Team Rosters
                team_rosters_pattern = r'(## Team Rosters)'
                standings_section = f"\n## Current Championship Standings\n\n{standings_html}\n\n\\1"
                content = re.sub(team_rosters_pattern, standings_section, content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            print("✓ Updated 250 class standings")
            return True
            
        except Exception as e:
            print(f"Error updating 250 standings: {e}")
            return False

    def generate_standings_table(self, standings, title):
        """Generate HTML table for standings"""
        html = f'''
<div class="my-8">
  <h3 class="text-xl font-bold mb-4 border-b border-primary pb-2">{title}</h3>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
      <thead class="bg-neutral-100 dark:bg-neutral-700">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Pos</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Rider</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Number</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Points</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
'''
        
        for rider in standings[:15]:  # Top 15 riders
            position_class = ""
            if rider['position'] == 1:
                position_class = "bg-yellow-100 dark:bg-yellow-900"
            elif rider['position'] <= 3:
                position_class = "bg-neutral-50 dark:bg-neutral-700"
                
            html += f'''
        <tr class="{position_class}">
          <td class="px-4 py-3 text-sm font-bold">{rider['position']}</td>
          <td class="px-4 py-3 text-sm font-medium">{rider['rider_name']}</td>
          <td class="px-4 py-3 text-sm">{rider['rider_number']}</td>
          <td class="px-4 py-3 text-sm font-bold">{rider['points']}</td>
        </tr>'''
        
        html += '''
      </tbody>
    </table>
  </div>
  <div class="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
    Last updated: ''' + datetime.now().strftime("%B %d, %Y at %I:%M %p EST") + '''
  </div>
</div>'''
        
        return html

    def update_all_standings(self):
        """Update all rider standings"""
        print("🏁 Starting rider standings update...")
        
        # Fetch 450 standings
        sx_450_standings = self.fetch_standings("450")
        mx_450_standings = self.fetch_standings("450_mx")
        
        # Use most recent or combine standings
        final_450_standings = sx_450_standings or mx_450_standings
        
        # Fetch 250 standings
        east_standings = self.fetch_standings("250_east")
        west_standings = self.fetch_standings("250_west")
        mx_250_standings = self.fetch_standings("250_mx")
        
        # Update files
        success_450 = self.update_450_standings(final_450_standings)
        success_250 = self.update_250_standings(
            east_standings or mx_250_standings, 
            west_standings
        )
        
        if success_450 or success_250:
            print("✅ Rider standings updated successfully!")
            return True
        else:
            print("❌ Failed to update rider standings")
            return False

def main():
    """Main execution function"""
    updater = RiderStandingsUpdater()
    return updater.update_all_standings()

if __name__ == "__main__":
    main()