#!/usr/bin/env python3
"""
Script to automatically update team information from SupercrossLive.com
This script scrapes team data, roster updates, and championship info
"""

import os
import re
import json
import time
import logging
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pathlib import Path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('team_update.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Base URLs and paths
SUPERCROSS_URL = "https://www.supercrosslive.com"
TEAMS_URL = f"{SUPERCROSS_URL}/teams"
HUGO_TEAMS_DIR = Path("content/teams")
HUGO_IMG_DIR = Path("static/img/teams")

# Team data mapping
TEAM_COLORS = {
    "Honda": "#e2001a",
    "KTM": "#ff6600",
    "Yamaha": "#0a1e83",
    "Kawasaki": "#006600",
    "Husqvarna": "#273238",
    "GASGAS": "#d32e2e",
    "Suzuki": "#00407f",
}

# Create directories if they don't exist
def ensure_directories():
    """Ensure all required directories exist"""
    for team_dir in [HUGO_TEAMS_DIR, HUGO_IMG_DIR]:
        if not os.path.exists(team_dir):
            os.makedirs(team_dir)
            logger.info(f"Created directory: {team_dir}")

class TeamScraper:
    """Class to handle team data scraping from SupercrossLive.com"""
    
    def __init__(self):
        self.session = requests.Session()
        self.teams_data = {}
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
    
    def get_page(self, url):
        """Get page content with error handling and retries"""
        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = self.session.get(url, headers=self.headers, timeout=30)
                response.raise_for_status()
                return response.text
            except requests.RequestException as e:
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt
                    logger.warning(f"Error fetching {url}: {e}. Retrying in {wait_time} seconds...")
                    time.sleep(wait_time)
                else:
                    logger.error(f"Failed to fetch {url} after {max_retries} attempts: {e}")
                    return None
    
    def parse_teams_page(self):
        """Parse the main teams page to get all teams"""
        logger.info("Fetching teams from SupercrossLive.com")
        page_content = self.get_page(TEAMS_URL)
        
        if not page_content:
            logger.error("Failed to fetch teams page")
            return
        
        soup = BeautifulSoup(page_content, 'html.parser')
        team_cards = soup.select('.team-grid .team-card')
        
        for card in team_cards:
            try:
                # Extract team info
                team_name_elem = card.select_one('.card-title')
                if not team_name_elem:
                    continue
                
                team_name = team_name_elem.text.strip()
                team_url = card.select_one('a')['href'] if card.select_one('a') else None
                team_img = card.select_one('img')['src'] if card.select_one('img') else None
                
                # Create team slug
                team_slug = self.create_slug(team_name)
                
                # Save team info
                self.teams_data[team_slug] = {
                    'name': team_name,
                    'url': f"{SUPERCROSS_URL}{team_url}" if team_url and not team_url.startswith('http') else team_url,
                    'image_url': f"{SUPERCROSS_URL}{team_img}" if team_img and not team_img.startswith('http') else team_img,
                    'riders': [],
                    'slug': team_slug
                }
                
                logger.info(f"Found team: {team_name}")
            except Exception as e:
                logger.error(f"Error parsing team card: {e}")
        
        logger.info(f"Found {len(self.teams_data)} teams")
    
    def parse_team_detail(self, team_slug):
        """Parse team detail page to get riders and other info"""
        team_info = self.teams_data.get(team_slug)
        if not team_info or not team_info.get('url'):
            logger.warning(f"No URL found for team: {team_slug}")
            return
        
        logger.info(f"Fetching details for team: {team_info['name']}")
        page_content = self.get_page(team_info['url'])
        
        if not page_content:
            return
        
        soup = BeautifulSoup(page_content, 'html.parser')
        
        # Extract team description
        team_description = soup.select_one('.team-description')
        if team_description:
            team_info['description'] = team_description.text.strip()
        
        # Extract manufacturer
        manufacturer = None
        for key in TEAM_COLORS.keys():
            if key.lower() in team_info['name'].lower():
                manufacturer = key
                break
        
        if manufacturer:
            team_info['manufacturer'] = manufacturer
            team_info['color'] = TEAM_COLORS.get(manufacturer, "#333333")
        
        # Extract riders
        rider_cards = soup.select('.rider-card')
        for card in rider_cards:
            try:
                rider_name_elem = card.select_one('.rider-name')
                if not rider_name_elem:
                    continue
                
                rider_name = rider_name_elem.text.strip()
                rider_number = card.select_one('.rider-number')
                rider_number = rider_number.text.strip() if rider_number else "N/A"
                rider_class = card.select_one('.rider-class')
                rider_class = rider_class.text.strip() if rider_class else "N/A"
                
                rider_url = card.select_one('a')['href'] if card.select_one('a') else None
                rider_img = card.select_one('img')['src'] if card.select_one('img') else None
                
                team_info['riders'].append({
                    'name': rider_name,
                    'number': rider_number,
                    'class': rider_class,
                    'url': f"{SUPERCROSS_URL}{rider_url}" if rider_url and not rider_url.startswith('http') else rider_url,
                    'image_url': f"{SUPERCROSS_URL}{rider_img}" if rider_img and not rider_img.startswith('http') else rider_img,
                })
                
                logger.info(f"Added rider: {rider_name} (#{rider_number}) to {team_info['name']}")
            except Exception as e:
                logger.error(f"Error parsing rider card: {e}")
        
        # Save team data
        self.teams_data[team_slug] = team_info
    
    def download_team_image(self, team_slug):
        """Download team logo/image"""
        team_info = self.teams_data.get(team_slug)
        if not team_info or not team_info.get('image_url'):
            return
        
        image_url = team_info['image_url']
        file_name = f"{team_slug}.jpg"
        file_path = os.path.join(HUGO_IMG_DIR, file_name)
        
        try:
            response = self.session.get(image_url, headers=self.headers, timeout=30)
            response.raise_for_status()
            
            with open(file_path, 'wb') as f:
                f.write(response.content)
            
            logger.info(f"Downloaded team image: {file_path}")
            team_info['local_image'] = file_path
        except Exception as e:
            logger.error(f"Error downloading team image for {team_slug}: {e}")
    
    def create_hugo_content(self):
        """Create Hugo content files for teams"""
        logger.info("Creating Hugo content files for teams")
        
        # Create or update team index pages
        for team_slug, team_info in self.teams_data.items():
            try:
                # Create team directory
                team_dir = os.path.join(HUGO_TEAMS_DIR, team_slug)
                if not os.path.exists(team_dir):
                    os.makedirs(team_dir)
                
                # Create team index file
                team_index_path = os.path.join(team_dir, "_index.md")
                
                with open(team_index_path, 'w') as f:
                    # Write frontmatter
                    f.write("---\n")
                    f.write(f'title: "{team_info["name"]}"\n')
                    if 'description' in team_info:
                        f.write(f'description: "{team_info["description"][:160]}"\n')
                    else:
                        f.write(f'description: "Official team page for {team_info["name"]}"\n')
                    f.write('layout: "single"\n')
                    f.write("---\n\n")
                    
                    # Write team header
                    f.write('<div class="team-profile">\n')
                    f.write(f'  <div class="team-header" style="background-color: {team_info.get("color", "#333333")};">\n')
                    f.write(f'    <img src="/img/teams/{team_slug}-logo.svg" alt="{team_info["name"]}" class="team-logo">\n')
                    f.write('  </div>\n\n')
                    
                    # Write team overview
                    f.write('  <div class="team-overview">\n')
                    f.write('    <div class="team-intro">\n')
                    f.write(f'      <h1 class="team-name">{team_info["name"]}</h1>\n')
                    f.write('      <div class="team-meta">\n')
                    
                    # Add manufacturer
                    if 'manufacturer' in team_info:
                        f.write('        <span class="meta-item">\n')
                        f.write('          <span class="meta-icon">\n')
                        f.write('            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n')
                        f.write('              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>\n')
                        f.write('            </svg>\n')
                        f.write('          </span>\n')
                        f.write(f'          <span>Manufacturer: {team_info["manufacturer"]}</span>\n')
                        f.write('        </span>\n')
                    
                    # Close meta section
                    f.write('      </div>\n')
                    f.write('    </div>\n\n')
                    
                    # Add description
                    f.write('    <div class="team-description">\n')
                    if 'description' in team_info:
                        paragraphs = team_info['description'].split('\n\n')
                        for p in paragraphs:
                            if p.strip():
                                f.write(f'      <p>{p.strip()}</p>\n')
                    else:
                        f.write(f'      <p>Official team page for {team_info["name"]} competing in AMA Supercross and Pro Motocross championships.</p>\n')
                    f.write('    </div>\n')
                    f.write('  </div>\n\n')
                    
                    # Add riders section if available
                    if team_info.get('riders'):
                        f.write('  <div class="team-section">\n')
                        f.write('    <h2 class="section-title">Current Riders</h2>\n\n')
                        f.write('    <div class="riders-grid">\n')
                        
                        for rider in team_info['riders']:
                            rider_slug = self.create_slug(rider['name'])
                            rider_class = rider.get('class', '').strip().lower()
                            if not rider_class or rider_class == 'n/a':
                                rider_class = '450'  # Default to 450 if not specified
                            
                            f.write('      <div class="rider-card">\n')
                            f.write(f'        <div class="rider-image" style="background-image: url(\'/img/riders/{rider_slug}.jpg\')">\n')
                            f.write(f'          <div class="rider-number">{rider["number"]}</div>\n')
                            f.write(f'          <div class="rider-class">{rider_class}</div>\n')
                            f.write('        </div>\n')
                            f.write('        <div class="rider-info">\n')
                            f.write(f'          <h3><a href="/riders/{rider_class}/{rider_slug}/">{rider["name"]}</a></h3>\n')
                            f.write('          <p class="rider-description">Professional supercross and motocross racer</p>\n')
                            f.write('        </div>\n')
                            f.write('      </div>\n')
                        
                        f.write('    </div>\n')
                        f.write('  </div>\n')
                    
                    # Close team profile div
                    f.write('</div>\n\n')
                    
                    # Add CSS styles
                    f.write('<style>\n')
                    f.write('  .team-profile {\n')
                    f.write('    max-width: 1200px;\n')
                    f.write('    margin: 0 auto;\n')
                    f.write('  }\n')
                    
                    f.write('  .team-header {\n')
                    f.write('    padding: 3rem;\n')
                    f.write('    display: flex;\n')
                    f.write('    justify-content: center;\n')
                    f.write('    align-items: center;\n')
                    f.write('    margin-bottom: 2rem;\n')
                    f.write('    border-radius: 0.5rem;\n')
                    f.write('  }\n')
                    
                    f.write('  .team-logo {\n')
                    f.write('    max-width: 300px;\n')
                    f.write('    max-height: 150px;\n')
                    f.write('    filter: brightness(0) invert(1);\n')
                    f.write('  }\n')
                    
                    f.write('  .team-overview {\n')
                    f.write('    display: grid;\n')
                    f.write('    grid-template-columns: 1fr;\n')
                    f.write('    gap: 2rem;\n')
                    f.write('    margin-bottom: 3rem;\n')
                    f.write('  }\n')
                    
                    f.write('  .team-name {\n')
                    f.write('    font-size: 2.5rem;\n')
                    f.write('    margin-bottom: 1rem;\n')
                    f.write('    font-weight: 700;\n')
                    f.write('  }\n')
                    
                    f.write('  .team-meta {\n')
                    f.write('    display: flex;\n')
                    f.write('    flex-wrap: wrap;\n')
                    f.write('    gap: 1.5rem;\n')
                    f.write('    margin-bottom: 1.5rem;\n')
                    f.write('  }\n')
                    
                    f.write('  .meta-item {\n')
                    f.write('    display: flex;\n')
                    f.write('    align-items: center;\n')
                    f.write('    color: #666;\n')
                    f.write('  }\n')
                    
                    f.write('  .meta-icon {\n')
                    f.write('    margin-right: 0.5rem;\n')
                    f.write('    display: flex;\n')
                    f.write('    align-items: center;\n')
                    f.write('  }\n')
                    
                    # Add more styles as needed
                    f.write('</style>')
                
                logger.info(f"Created team page: {team_index_path}")
            except Exception as e:
                logger.error(f"Error creating Hugo content for team {team_slug}: {e}")
    
    def update_all_teams_page(self):
        """Update the all teams index page"""
        logger.info("Updating all teams index page")
        
        all_teams_dir = os.path.join(HUGO_TEAMS_DIR, "all")
        if not os.path.exists(all_teams_dir):
            os.makedirs(all_teams_dir)
        
        all_teams_path = os.path.join(all_teams_dir, "_index.md")
        
        try:
            with open(all_teams_path, 'w') as f:
                # Write frontmatter
                f.write("---\n")
                f.write('title: "All Teams"\n')
                f.write('description: "Complete list of factory and support teams in Supercross and Motocross"\n')
                f.write('layout: "list"\n')
                f.write("---\n\n")
                
                f.write("# All Supercross and Motocross Teams\n\n")
                f.write("Browse the complete list of professional teams competing in AMA Supercross and Pro Motocross championships. From top factory efforts to support teams, find detailed information about each team, their riders, and history.\n\n")
                
                # Factory teams section
                f.write("## Factory Teams\n\n")
                f.write("Factory teams are directly supported by motorcycle manufacturers and represent the highest level of the sport with the best resources, equipment, and technical support.\n\n")
                
                f.write('<div class="teams-list factory-teams">\n')
                
                # Sort and filter factory teams
                factory_teams = []
                for team_slug, team_info in self.teams_data.items():
                    if 'manufacturer' in team_info and team_info.get('riders'):
                        factory_teams.append((team_slug, team_info))
                
                # Sort by manufacturer name
                factory_teams.sort(key=lambda x: x[1].get('manufacturer', ''))
                
                for team_slug, team_info in factory_teams:
                    f.write('  <div class="team-item">\n')
                    f.write(f'    <div class="team-color" style="background-color: {team_info.get("color", "#333333")};"></div>\n')
                    f.write('    <div class="team-content">\n')
                    f.write(f'      <h3 class="team-name"><a href="/teams/{team_slug}/">{team_info["name"]}</a></h3>\n')
                    
                    # Add description
                    description = team_info.get('description', f"{team_info['name']} racing team")
                    if len(description) > 150:
                        description = description[:147] + "..."
                    f.write(f'      <p class="team-description">{description}</p>\n')
                    
                    # Add meta info
                    f.write('      <div class="team-meta">\n')
                    if 'manufacturer' in team_info:
                        f.write(f'        <span class="meta-item">Manufacturer: {team_info["manufacturer"]}</span>\n')
                    f.write('      </div>\n')
                    
                    f.write('    </div>\n')
                    f.write('  </div>\n')
                
                f.write('</div>\n\n')
                
                # Add support teams section
                f.write("## Support Teams\n\n")
                f.write("Support teams receive varying levels of factory assistance and represent an important tier in the sport's competitive structure.\n\n")
                
                f.write('<div class="teams-list support-teams">\n')
                
                # Sort and filter support teams
                support_teams = []
                for team_slug, team_info in self.teams_data.items():
                    if team_info.get('riders') and (team_slug, team_info) not in factory_teams:
                        support_teams.append((team_slug, team_info))
                
                # Sort by team name
                support_teams.sort(key=lambda x: x[1]['name'])
                
                for team_slug, team_info in support_teams:
                    f.write('  <div class="team-item">\n')
                    f.write(f'    <div class="team-color" style="background-color: {team_info.get("color", "#333333")};"></div>\n')
                    f.write('    <div class="team-content">\n')
                    f.write(f'      <h3 class="team-name"><a href="/teams/{team_slug}/">{team_info["name"]}</a></h3>\n')
                    
                    # Add description
                    description = team_info.get('description', f"{team_info['name']} racing team")
                    if len(description) > 150:
                        description = description[:147] + "..."
                    f.write(f'      <p class="team-description">{description}</p>\n')
                    
                    # Add meta info
                    f.write('      <div class="team-meta">\n')
                    if 'manufacturer' in team_info:
                        f.write(f'        <span class="meta-item">Manufacturer: {team_info["manufacturer"]}</span>\n')
                    f.write('      </div>\n')
                    
                    f.write('    </div>\n')
                    f.write('  </div>\n')
                
                f.write('</div>\n\n')
                
                # Add styles
                f.write('<style>\n')
                f.write('  .teams-list {\n')
                f.write('    display: flex;\n')
                f.write('    flex-direction: column;\n')
                f.write('    gap: 1.5rem;\n')
                f.write('    margin: 2rem 0 3rem 0;\n')
                f.write('  }\n')
                
                f.write('  .team-item {\n')
                f.write('    display: flex;\n')
                f.write('    border-radius: 0.5rem;\n')
                f.write('    overflow: hidden;\n')
                f.write('    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n')
                f.write('    transition: transform 0.3s ease, box-shadow 0.3s ease;\n')
                f.write('    background-color: white;\n')
                f.write('  }\n')
                
                f.write('  .team-item:hover {\n')
                f.write('    transform: translateY(-3px);\n')
                f.write('    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n')
                f.write('  }\n')
                
                f.write('  .team-color {\n')
                f.write('    width: 10px;\n')
                f.write('    flex-shrink: 0;\n')
                f.write('  }\n')
                
                f.write('  .team-content {\n')
                f.write('    padding: 1.5rem;\n')
                f.write('    flex-grow: 1;\n')
                f.write('  }\n')
                
                f.write('  .team-name {\n')
                f.write('    font-size: 1.25rem;\n')
                f.write('    font-weight: 600;\n')
                f.write('    margin: 0 0 0.5rem 0;\n')
                f.write('  }\n')
                
                f.write('  .team-name a {\n')
                f.write('    color: #333;\n')
                f.write('    text-decoration: none;\n')
                f.write('    transition: color 0.2s ease;\n')
                f.write('  }\n')
                
                f.write('  .team-name a:hover {\n')
                f.write('    color: var(--primary-color);\n')
                f.write('  }\n')
                
                # Add more styles
                f.write('</style>')
            
            logger.info(f"Updated all teams page: {all_teams_path}")
        except Exception as e:
            logger.error(f"Error updating all teams page: {e}")
    
    @staticmethod
    def create_slug(name):
        """Create a slug from a name"""
        slug = name.lower()
        # Replace special characters
        slug = re.sub(r'[^a-z0-9\s-]', '', slug)
        # Replace spaces with dashes
        slug = re.sub(r'\s+', '-', slug)
        # Remove duplicate dashes
        slug = re.sub(r'-+', '-', slug)
        return slug.strip('-')

    def run_update(self):
        """Run the full update process"""
        logger.info("Starting team update process")
        ensure_directories()
        
        self.parse_teams_page()
        
        for team_slug in self.teams_data.keys():
            self.parse_team_detail(team_slug)
            self.download_team_image(team_slug)
        
        self.create_hugo_content()
        self.update_all_teams_page()
        
        # Save data to JSON for reference
        with open('teams_data.json', 'w') as f:
            json.dump(self.teams_data, f, indent=2)
        
        logger.info("Team update process completed")

if __name__ == "__main__":
    try:
        scraper = TeamScraper()
        scraper.run_update()
    except Exception as e:
        logger.error(f"Unhandled exception in team update script: {e}", exc_info=True)