#!/usr/bin/env python3
"""
MXRaceHub Rider Update Script
----------------------------
This script fetches rider data from supercrosslive.com and updates the Hugo rider pages
with the latest information, including standings, recent results, and profile data.

It should be scheduled to run every Sunday at midnight to ensure the most up-to-date
information is available on the website.
"""

import os
import re
import json
import time
import yaml
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import logging
from pathlib import Path
from typing import Dict, List, Any, Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("rider_update.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("rider_updater")

# Hugo site path
HUGO_SITE_PATH = Path(__file__).parent.parent
RIDER_CONTENT_PATH = HUGO_SITE_PATH / "content" / "riders"
RIDER_DATA_PATH = HUGO_SITE_PATH / "data" / "riders"

# URLs for supercrosslive.com
BASE_URL = "https://www.supercrosslive.com"
SX_RIDERS_450_URL = f"{BASE_URL}/riders/season/sx/450sx"
SX_RIDERS_250_EAST_URL = f"{BASE_URL}/riders/season/sx/250sx-east"
SX_RIDERS_250_WEST_URL = f"{BASE_URL}/riders/season/sx/250sx-west"
SX_RESULTS_URL = f"{BASE_URL}/results/standings/season/sx"

# User agent to mimic a browser request
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Team name mapping to standardize team names
TEAM_MAPPING = {
    "honda": "Team Honda HRC",
    "hrc": "Team Honda HRC",
    "team honda hrc": "Team Honda HRC",
    "honda hrc": "Team Honda HRC",
    "kawasaki": "Monster Energy Kawasaki",
    "monster energy kawasaki": "Monster Energy Kawasaki",
    "yamaha": "Monster Energy Yamaha Star Racing",
    "star racing yamaha": "Monster Energy Yamaha Star Racing",
    "monster energy yamaha": "Monster Energy Yamaha Star Racing",
    "star yamaha": "Monster Energy Yamaha Star Racing",
    "ktm": "Red Bull KTM Factory Racing",
    "red bull ktm": "Red Bull KTM Factory Racing",
    "gasgas": "Red Bull GASGAS Factory Racing",
    "husqvarna": "Rockstar Energy Husqvarna Factory Racing",
    "rockstar husqvarna": "Rockstar Energy Husqvarna Factory Racing",
    "husqvarna factory racing": "Rockstar Energy Husqvarna Factory Racing",
    "suzuki": "H.E.P. Motorsports Suzuki",
    "h.e.p. suzuki": "H.E.P. Motorsports Suzuki",
    "hep suzuki": "H.E.P. Motorsports Suzuki",
    "progressive insurance suzuki": "Progressive Insurance Suzuki",
    "firepower honda": "Fire Power Honda",
    "muc-off": "Muc-Off FXR ClubMX Yamaha",
    "clubmx": "Muc-Off FXR ClubMX Yamaha",
    "muc-off clubmx": "Muc-Off FXR ClubMX Yamaha",
    "pro circuit": "Monster Energy Pro Circuit Kawasaki",
    "pro circuit kawasaki": "Monster Energy Pro Circuit Kawasaki",
    "monster energy pro circuit": "Monster Energy Pro Circuit Kawasaki",
    "triumph": "Triumph Racing",
    "beta": "Beta Factory Racing",
}

def clean_text(text: str) -> str:
    """Clean and normalize text strings."""
    if not text:
        return ""
    return text.strip().replace('\n', ' ').replace('\t', ' ').replace('\r', '').replace('  ', ' ')

def get_soup(url: str) -> BeautifulSoup:
    """Fetch URL and return a BeautifulSoup object."""
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        response.raise_for_status()
        return BeautifulSoup(response.text, 'html.parser')
    except requests.RequestException as e:
        logger.error(f"Error fetching {url}: {e}")
        raise

def get_rider_profile_url(rider_name: str, rider_class: str) -> Optional[str]:
    """Find a rider's profile URL based on their name and class."""
    base_url = SX_RIDERS_450_URL
    if rider_class == "250-east":
        base_url = SX_RIDERS_250_EAST_URL
    elif rider_class == "250-west":
        base_url = SX_RIDERS_250_WEST_URL
    
    try:
        soup = get_soup(base_url)
        riders_list = soup.select(".riders-list .rider-item")
        
        # Normalize the rider name for comparison
        normalized_name = rider_name.lower()
        
        for rider in riders_list:
            name_tag = rider.select_one(".rider-name")
            if name_tag and normalized_name in name_tag.text.lower():
                link = rider.find("a")
                if link and "href" in link.attrs:
                    return f"{BASE_URL}{link['href']}"
        
        logger.warning(f"Could not find profile URL for {rider_name} in class {rider_class}")
        return None
    except Exception as e:
        logger.error(f"Error finding profile URL for {rider_name}: {e}")
        return None

def get_recent_results(rider_name: str, rider_class: str) -> List[Dict[str, str]]:
    """Get the most recent race results for a rider."""
    results = []
    
    try:
        # Get results page
        soup = get_soup(SX_RESULTS_URL)
        results_tables = soup.select(".results-table")
        
        if not results_tables:
            logger.warning("No results tables found")
            return results
        
        # Parse the latest race results (first table is usually the most recent)
        for table in results_tables[:3]:  # Check the three most recent races
            try:
                race_info = table.select_one("caption")
                if not race_info:
                    continue
                
                race_title = clean_text(race_info.text)
                if not race_title:
                    continue
                
                # Extract event details
                event_match = re.search(r'Round \d+\s*[:|\-]?\s*(.*)', race_title)
                event_name = event_match.group(1).strip() if event_match else race_title
                
                # Extract date
                date_match = re.search(r'(\w+ \d+,? \d{4})', race_title)
                event_date = date_match.group(1) if date_match else datetime.now().strftime("%B %d, %Y")
                
                # Extract location
                location_match = re.search(r'\((.*?)\)', race_title)
                event_location = location_match.group(1) if location_match else ""
                
                # Find this rider's result
                riders_rows = table.select("tbody tr")
                rider_found = False
                
                for row in riders_rows:
                    cells = row.select("td")
                    if len(cells) < 3:
                        continue
                    
                    rider_cell = cells[1] if len(cells) > 1 else None
                    if not rider_cell:
                        continue
                    
                    if rider_name.lower() in rider_cell.text.lower():
                        position = cells[0].text.strip() if cells[0] else "N/A"
                        results.append({
                            "date": event_date,
                            "event": f"{event_name} Supercross",
                            "location": event_location,
                            "position": position
                        })
                        rider_found = True
                        break
                
                if not rider_found:
                    # Check if there's a DNF, DNS or DQ
                    status_rows = table.select(".rider-status-row")
                    for status_row in status_rows:
                        if rider_name.lower() in status_row.text.lower():
                            status_text = "DNS"
                            if "DNF" in status_row.text:
                                status_text = "DNF"
                            elif "DQ" in status_row.text:
                                status_text = "DQ"
                            
                            results.append({
                                "date": event_date,
                                "event": f"{event_name} Supercross",
                                "location": event_location,
                                "position": status_text
                            })
                            break
                
            except Exception as e:
                logger.error(f"Error parsing race results table: {e}")
                continue
        
        return results[:5]  # Return the 5 most recent results
    except Exception as e:
        logger.error(f"Error getting recent results for {rider_name}: {e}")
        return []

def get_championship_standings(rider_name: str, rider_class: str) -> Dict[str, Dict[str, Any]]:
    """Get championship standings data for a rider."""
    standings = {}
    class_code = "450sx"
    
    if rider_class == "250-east":
        class_code = "250sx-east"
    elif rider_class == "250-west":
        class_code = "250sx-west"
    
    try:
        # Get standings page
        standings_url = f"{BASE_URL}/results/standings/season/sx/{class_code}"
        soup = get_soup(standings_url)
        
        # Get the latest standings table
        standings_table = soup.select_one(".standings-table")
        if not standings_table:
            logger.warning(f"No standings table found for {rider_class}")
            return standings
        
        # Get the title of the standings
        table_caption = standings_table.select_one("caption")
        standings_title = "2024 AMA Supercross"
        if table_caption:
            title_text = clean_text(table_caption.text)
            standings_title = title_text
        
        standings_key = f"{standings_title} {rider_class.split('-')[0].upper()}"
        
        # Find the rider in the standings
        rows = standings_table.select("tbody tr")
        for row in rows:
            cells = row.select("td")
            if len(cells) < 3:
                continue
            
            name_cell = cells[1] if len(cells) > 1 else None
            if not name_cell:
                continue
            
            if rider_name.lower() in name_cell.text.lower():
                position = cells[0].text.strip() if cells[0] else "N/A"
                points = cells[-1].text.strip() if cells[-1] else "0"
                
                # Fix for cases when points cell contains "Points"
                if not points.isdigit() and "points" in points.lower():
                    points_match = re.search(r'(\d+)', points)
                    points = points_match.group(1) if points_match else "0"
                
                standings[standings_key] = {
                    "position": int(position) if position.isdigit() else position,
                    "points": int(points) if points.isdigit() else 0
                }
                break
        
        return standings
    except Exception as e:
        logger.error(f"Error getting championship standings for {rider_name}: {e}")
        return {}

def get_rider_details(profile_url: str) -> Dict[str, Any]:
    """Scrape detailed rider information from their profile page."""
    details = {}
    
    try:
        if not profile_url:
            return details
        
        soup = get_soup(profile_url)
        
        # Extract basic info
        rider_info_div = soup.select_one(".rider-info")
        if rider_info_div:
            # Get rider number
            number_div = rider_info_div.select_one(".rider-number")
            if number_div:
                number_text = number_div.text.strip()
                if number_text.startswith('#'):
                    number_text = number_text[1:]
                details["number"] = number_text
            
            # Get team info
            team_div = rider_info_div.select_one(".rider-team")
            if team_div:
                team_text = clean_text(team_div.text)
                
                # Try to standardize team name
                team_lower = team_text.lower()
                for key, value in TEAM_MAPPING.items():
                    if key in team_lower:
                        team_text = value
                        break
                
                details["team"] = team_text
            
            # Get manufacturer
            manufacturer = ""
            team_name = details.get("team", "").lower()
            
            if "honda" in team_name:
                manufacturer = "Honda"
            elif "kawasaki" in team_name:
                manufacturer = "Kawasaki"
            elif "yamaha" in team_name:
                manufacturer = "Yamaha"
            elif "ktm" in team_name:
                manufacturer = "KTM"
            elif "gasgas" in team_name:
                manufacturer = "GASGAS"
            elif "husqvarna" in team_name or "husky" in team_name:
                manufacturer = "Husqvarna"
            elif "suzuki" in team_name:
                manufacturer = "Suzuki"
            elif "triumph" in team_name:
                manufacturer = "Triumph"
            elif "beta" in team_name:
                manufacturer = "Beta"
            
            if manufacturer:
                details["manufacturer"] = manufacturer
        
        # Extract additional info from rider details
        details_div = soup.select_one(".rider-details")
        if details_div:
            detail_items = details_div.select(".detail-item")
            
            for item in detail_items:
                label = item.select_one(".detail-label")
                value = item.select_one(".detail-value")
                
                if not label or not value:
                    continue
                
                label_text = clean_text(label.text).lower()
                value_text = clean_text(value.text)
                
                if "home" in label_text or "from" in label_text:
                    # Extract nationality from hometown
                    if "australia" in value_text.lower():
                        details["nationality"] = "Australia"
                    elif "france" in value_text.lower():
                        details["nationality"] = "France"
                    elif "germany" in value_text.lower():
                        details["nationality"] = "Germany"
                    elif "japan" in value_text.lower():
                        details["nationality"] = "Japan"
                    elif "spain" in value_text.lower():
                        details["nationality"] = "Spain"
                    elif "south africa" in value_text.lower():
                        details["nationality"] = "South Africa"
                    elif "uk" in value_text.lower() or "united kingdom" in value_text.lower() or "great britain" in value_text.lower():
                        details["nationality"] = "United Kingdom"
                    else:
                        details["nationality"] = "USA"  # Default assumption for most riders
                
                if "height" in label_text:
                    details["height"] = value_text
                
                if "weight" in label_text:
                    details["weight"] = value_text
                
                if "age" in label_text or "born" in label_text or "birthday" in label_text:
                    # Try to extract age or calculate from birth date
                    if "age" in label_text and value_text.isdigit():
                        details["age"] = int(value_text)
                    else:
                        # Try to extract birth year
                        year_match = re.search(r'(\d{4})', value_text)
                        if year_match:
                            birth_year = int(year_match.group(1))
                            current_year = datetime.now().year
                            details["age"] = current_year - birth_year
        
        # Extract career highlights
        career_highlights = []
        highlights_section = soup.select_one(".rider-career, .rider-achievements, .career-highlights")
        if highlights_section:
            highlight_items = highlights_section.select("li, .highlight-item")
            
            if highlight_items:
                for item in highlight_items:
                    highlight_text = clean_text(item.text)
                    if highlight_text:
                        career_highlights.append(highlight_text)
            else:
                # If no list items, try paragraphs
                paragraphs = highlights_section.select("p")
                for p in paragraphs:
                    highlight_text = clean_text(p.text)
                    if highlight_text and len(highlight_text) < 100:  # Avoid full bio paragraphs
                        career_highlights.append(highlight_text)
        
        if career_highlights:
            details["career_highlights"] = career_highlights[:5]  # Limit to 5 highlights
        
        # Extract social media links
        social_links = {}
        social_section = soup.select_one(".rider-social, .social-links")
        if social_section:
            links = social_section.select("a")
            
            for link in links:
                href = link.get("href", "")
                if "instagram.com" in href:
                    social_links["instagram"] = href
                elif "twitter.com" in href or "x.com" in href:
                    social_links["twitter"] = href
                elif "facebook.com" in href:
                    social_links["facebook"] = href
                elif "youtube.com" in href:
                    social_links["youtube"] = href
                elif "tiktok.com" in href:
                    social_links["tiktok"] = href
        
        if social_links:
            details["social_media"] = social_links
        
        # Always set active status
        details["status"] = "Active"
        
        return details
    except Exception as e:
        logger.error(f"Error getting rider details from {profile_url}: {e}")
        return details

def update_rider_page(rider_file: Path, rider_data: Dict[str, Any]) -> bool:
    """Update a rider's markdown file with the latest data while keeping existing content."""
    try:
        if not rider_file.exists():
            logger.warning(f"Rider file {rider_file} does not exist")
            return False
        
        # Read existing file content
        content = rider_file.read_text(encoding='utf-8')
        
        # Split into frontmatter and markdown content
        parts = re.split(r'^---\s*$', content, 2, re.MULTILINE)
        if len(parts) < 3:
            logger.error(f"Invalid frontmatter format in {rider_file}")
            return False
        
        # Parse existing frontmatter
        existing_data = yaml.safe_load(parts[1])
        
        # Merge with new data, prioritizing new data for specific fields
        # but keeping existing data for fields not in the new data
        for key, value in rider_data.items():
            if key in ["recent_results", "championship_standings"]:
                # Always use new data for these fields
                existing_data[key] = value
            elif key not in existing_data or (value and existing_data.get(key) != value):
                # Update only if field doesn't exist or if value is different
                existing_data[key] = value
        
        # Convert back to YAML
        new_frontmatter = yaml.dump(existing_data, default_flow_style=False, sort_keys=False)
        
        # Reassemble the file
        new_content = f"---\n{new_frontmatter}---\n{parts[2]}"
        
        # Write back to file
        rider_file.write_text(new_content, encoding='utf-8')
        logger.info(f"Updated rider page: {rider_file}")
        return True
    except Exception as e:
        logger.error(f"Error updating rider page {rider_file}: {e}")
        return False

def process_rider(rider_file: Path) -> bool:
    """Process a single rider file and update it with the latest information."""
    try:
        # Extract class and rider name from file path
        rider_path_parts = rider_file.parts
        rider_class = rider_path_parts[-2]  # The directory name (450, 250-east, etc.)
        rider_name = rider_file.stem.replace('-', ' ').title()  # Convert filename to name
        
        logger.info(f"Processing rider: {rider_name} ({rider_class})")
        
        # Get the rider's profile URL
        profile_url = get_rider_profile_url(rider_name, rider_class)
        
        # Get rider details
        rider_data = {}
        if profile_url:
            rider_data = get_rider_details(profile_url)
        
        # Get championship standings
        standings = get_championship_standings(rider_name, rider_class)
        if standings:
            rider_data["championship_standings"] = standings
        
        # Get recent results
        results = get_recent_results(rider_name, rider_class)
        if results:
            rider_data["recent_results"] = results
        
        # Update the rider's page
        if rider_data:
            return update_rider_page(rider_file, rider_data)
        else:
            logger.warning(f"No data found for {rider_name}")
            return False
    except Exception as e:
        logger.error(f"Error processing rider {rider_file}: {e}")
        return False

def process_all_riders() -> Dict[str, int]:
    """Process all rider files in the content directory."""
    stats = {"success": 0, "failed": 0, "total": 0}
    
    # Create data directory if it doesn't exist
    os.makedirs(RIDER_DATA_PATH, exist_ok=True)
    
    # Process each rider class directory
    for class_dir in ["450", "250-east", "250-west"]:
        class_path = RIDER_CONTENT_PATH / class_dir
        if not class_path.exists():
            logger.warning(f"Class directory {class_path} does not exist")
            continue
        
        # Process each rider file in the directory
        for rider_file in class_path.glob("*.md"):
            stats["total"] += 1
            success = process_rider(rider_file)
            
            if success:
                stats["success"] += 1
            else:
                stats["failed"] += 1
    
    # Save a timestamp of the last update
    timestamp_file = RIDER_DATA_PATH / "last_update.json"
    timestamp_data = {
        "last_update": datetime.now().isoformat(),
        "stats": stats
    }
    
    with open(timestamp_file, "w") as f:
        json.dump(timestamp_data, f, indent=2)
    
    return stats

def main():
    """Main function to run the rider update process."""
    logger.info("Starting rider update process")
    start_time = time.time()
    
    try:
        stats = process_all_riders()
        
        end_time = time.time()
        duration = end_time - start_time
        
        logger.info(f"Rider update complete in {duration:.2f} seconds")
        logger.info(f"Results: {stats['success']} successful, {stats['failed']} failed, {stats['total']} total")
    except Exception as e:
        logger.error(f"Error in main rider update process: {e}")

if __name__ == "__main__":
    main()