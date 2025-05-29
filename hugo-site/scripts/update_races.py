#!/usr/bin/env python3
"""
Script to update race information from SupercrossLive and Pro Motocross websites.
Automatically creates or updates race content files.
"""

import os
import re
import sys
import json
import time
import datetime
import requests
from bs4 import BeautifulSoup
from pathlib import Path
import yaml
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger('update_races')

# Constants
RACES_DIR = Path('content/races')
TRACKS_DIR = Path('content/tracks')
SUPERCROSS_SCHEDULE_URL = 'https://www.supercrosslive.com/events'
MOTOCROSS_SCHEDULE_URL = 'https://promotocross.com/schedule'

def setup_directories():
    """Create necessary directories if they don't exist"""
    RACES_DIR.mkdir(exist_ok=True, parents=True)
    TRACKS_DIR.mkdir(exist_ok=True, parents=True)

def fetch_page(url):
    """Fetch a webpage and return the soup"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        return BeautifulSoup(response.text, 'html.parser')
    except Exception as e:
        logger.error(f"Error fetching {url}: {e}")
        return None

def safe_filename(name):
    """Convert a string to a safe filename"""
    return re.sub(r'[^\w\-]', '-', name.lower().strip()).strip('-')

def get_supercross_races():
    """Scrape upcoming Supercross races"""
    logger.info("Fetching Supercross races")
    races = []
    soup = fetch_page(SUPERCROSS_SCHEDULE_URL)
    
    if not soup:
        return races
    
    try:
        event_items = soup.select('.schedule-event-item')
        
        for event in event_items:
            try:
                # Get date
                date_elem = event.select_one('.schedule-event-date')
                if not date_elem:
                    continue
                    
                date_text = date_elem.text.strip()
                try:
                    # Parse the date
                    date_obj = datetime.datetime.strptime(date_text, '%b %d, %Y')
                    date_formatted = date_obj.strftime('%Y-%m-%d')
                except:
                    logger.warning(f"Could not parse date: {date_text}")
                    continue
                
                # Get location
                location_elem = event.select_one('.schedule-event-location')
                location = location_elem.text.strip() if location_elem else "TBA"
                
                # Get title
                title_elem = event.select_one('.schedule-event-title')
                title = title_elem.text.strip() if title_elem else f"Supercross at {location}"
                
                # Get venue
                venue_elem = event.select_one('.schedule-event-venue')
                venue = venue_elem.text.strip() if venue_elem else ""
                
                # Get event URL
                url_elem = event.select_one('a')
                event_url = url_elem['href'] if url_elem and 'href' in url_elem.attrs else ""
                if event_url and not event_url.startswith('http'):
                    event_url = f"https://www.supercrosslive.com{event_url}"
                
                # Create race object
                race = {
                    'title': title,
                    'date': date_formatted,
                    'location': location,
                    'venue': venue,
                    'series': 'Supercross',
                    'event_url': event_url,
                    'image': '/img/races/supercross-default.jpg',
                }
                
                races.append(race)
                logger.info(f"Found Supercross race: {title} on {date_formatted}")
            except Exception as e:
                logger.error(f"Error processing Supercross event: {e}")
    
    except Exception as e:
        logger.error(f"Error parsing Supercross schedule: {e}")
    
    return races

def get_motocross_races():
    """Scrape upcoming Pro Motocross races"""
    logger.info("Fetching Pro Motocross races")
    races = []
    soup = fetch_page(MOTOCROSS_SCHEDULE_URL)
    
    if not soup:
        return races
    
    try:
        event_items = soup.select('.schedule-item')
        
        for event in event_items:
            try:
                # Get date
                date_elem = event.select_one('.date')
                if not date_elem:
                    continue
                    
                date_text = date_elem.text.strip()
                try:
                    # Parse the date
                    date_obj = datetime.datetime.strptime(date_text, '%B %d, %Y')
                    date_formatted = date_obj.strftime('%Y-%m-%d')
                except:
                    logger.warning(f"Could not parse date: {date_text}")
                    continue
                
                # Get title and location
                title_elem = event.select_one('h2')
                title = title_elem.text.strip() if title_elem else "Pro Motocross Event"
                
                location_elem = event.select_one('.location')
                location = location_elem.text.strip() if location_elem else "TBA"
                
                # Get event URL
                url_elem = event.select_one('a')
                event_url = url_elem['href'] if url_elem and 'href' in url_elem.attrs else ""
                if event_url and not event_url.startswith('http'):
                    event_url = f"https://promotocross.com{event_url}"
                
                # Create race object
                race = {
                    'title': title,
                    'date': date_formatted,
                    'location': location,
                    'venue': location,
                    'series': 'Pro Motocross',
                    'event_url': event_url,
                    'image': '/img/races/motocross-default.jpg',
                }
                
                races.append(race)
                logger.info(f"Found Pro Motocross race: {title} on {date_formatted}")
            except Exception as e:
                logger.error(f"Error processing Pro Motocross event: {e}")
    
    except Exception as e:
        logger.error(f"Error parsing Pro Motocross schedule: {e}")
    
    return races

def save_race_file(race):
    """Save race data to a markdown file"""
    race_date = race['date']
    race_title = race['title']
    race_series = race['series'].lower().replace(' ', '-')
    
    # Create a safe filename
    filename = f"{race_date}-{safe_filename(race_title)}.md"
    filepath = RACES_DIR / filename
    
    # Prepare front matter
    front_matter = {
        'title': race['title'],
        'date': race['date'],
        'description': f"{race['title']} at {race['location']} on {race['date']}",
        'location': race['location'],
        'venue': race.get('venue', race['location']),
        'series': race['series'],
        'featuredImage': race.get('image', ''),
        'weight': 100,  # Higher weight races show up first
        'eventUrl': race.get('event_url', ''),
    }
    
    # Prepare content
    content = f"""---
{yaml.dump(front_matter, sort_keys=False)}---

## {race['title']}

Join us for the exciting {race['series']} event at {race['location']} on {race['date']}!

### Event Details

- **Date:** {race['date']}
- **Location:** {race['location']}
- **Series:** {race['series']}

### Watch Live

This race will be broadcast live on Peacock. Check the [watch page](/watch/) for more details.

### Place Bets

Want to make this race even more exciting? Place bets with your friends or join a group bet!

- [Friend Bets](/betting/friend-bets?race={race_title.replace(' ', '%20')})
- [Group Bets](/betting/groups)

"""
    
    # Write to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    logger.info(f"Saved race file: {filepath}")

def update_races():
    """Main function to update races"""
    logger.info("Starting race update process")
    
    setup_directories()
    
    # Get races from both sources
    supercross_races = get_supercross_races()
    motocross_races = get_motocross_races()
    
    all_races = supercross_races + motocross_races
    
    # Create or update race files
    for race in all_races:
        save_race_file(race)
    
    logger.info(f"Updated {len(all_races)} races")

if __name__ == "__main__":
    try:
        update_races()
    except Exception as e:
        logger.error(f"Error updating races: {e}")
        sys.exit(1)