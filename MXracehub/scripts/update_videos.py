#!/usr/bin/env python3
"""
YouTube Video Updater for MXRaceHub
Fetches latest videos from @AmericanMotocross and @SupercrossLive channels
Updates the video content page with fresh content every Monday
"""

import os
import json
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Any

class YouTubeVideoUpdater:
    def __init__(self):
        self.api_key = os.getenv('YOUTUBE_API_KEY')
        self.base_url = 'https://www.googleapis.com/youtube/v3'
        
        # We'll search for channels by name to find authentic motocross content
        self.search_terms = [
            'supercross live official',
            'american motocross official',
            'ama supercross',
            'pro motocross'
        ]
        
        self.content_file = 'hugo-site/content/news/video/_index.md'
    
    def fetch_channel_videos(self, channel_id: str, max_results: int = 10) -> List[Dict[str, Any]]:
        """Fetch latest videos from a YouTube channel"""
        if not self.api_key:
            raise ValueError("YouTube API key not found. Please set YOUTUBE_API_KEY environment variable.")
        
        # Get channel uploads playlist
        channel_url = f"{self.base_url}/channels"
        channel_params = {
            'part': 'contentDetails',
            'id': channel_id,
            'key': self.api_key
        }
        
        channel_response = requests.get(channel_url, params=channel_params)
        channel_data = channel_response.json()
        
        if 'items' not in channel_data or not channel_data['items']:
            return []
        
        uploads_playlist_id = channel_data['items'][0]['contentDetails']['relatedPlaylists']['uploads']
        
        # Get videos from uploads playlist
        playlist_url = f"{self.base_url}/playlistItems"
        playlist_params = {
            'part': 'snippet',
            'playlistId': uploads_playlist_id,
            'maxResults': max_results,
            'order': 'date',
            'key': self.api_key
        }
        
        playlist_response = requests.get(playlist_url, params=playlist_params)
        playlist_data = playlist_response.json()
        
        videos = []
        if 'items' in playlist_data:
            for item in playlist_data['items']:
                video_info = {
                    'title': item['snippet']['title'],
                    'video_id': item['snippet']['resourceId']['videoId'],
                    'description': item['snippet']['description'][:200] + '...' if len(item['snippet']['description']) > 200 else item['snippet']['description'],
                    'published_at': item['snippet']['publishedAt'],
                    'channel_title': item['snippet']['channelTitle']
                }
                videos.append(video_info)
        
        return videos
    
    def get_video_duration(self, video_id: str) -> str:
        """Get video duration from YouTube API"""
        video_url = f"{self.base_url}/videos"
        video_params = {
            'part': 'contentDetails',
            'id': video_id,
            'key': self.api_key
        }
        
        response = requests.get(video_url, params=video_params)
        data = response.json()
        
        if 'items' in data and data['items']:
            duration = data['items'][0]['contentDetails']['duration']
            # Convert ISO 8601 duration to readable format
            return self.parse_duration(duration)
        
        return "Unknown"
    
    def parse_duration(self, duration: str) -> str:
        """Convert ISO 8601 duration to MM:SS format"""
        import re
        match = re.match(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', duration)
        if match:
            hours, minutes, seconds = match.groups()
            hours = int(hours) if hours else 0
            minutes = int(minutes) if minutes else 0
            seconds = int(seconds) if seconds else 0
            
            if hours > 0:
                return f"{hours}:{minutes:02d}:{seconds:02d}"
            else:
                return f"{minutes}:{seconds:02d}"
        return "Unknown"
    
    def categorize_video(self, title: str, description: str) -> str:
        """Categorize video based on title and description"""
        title_lower = title.lower()
        desc_lower = description.lower()
        
        if any(keyword in title_lower for keyword in ['highlights', 'recap', 'main event', 'race']):
            return 'Race Highlights'
        elif any(keyword in title_lower for keyword in ['interview', 'press conference', 'rider']):
            return 'Interviews'
        elif any(keyword in title_lower for keyword in ['practice', 'qualifying', 'heat']):
            return 'Practice & Qualifying'
        elif any(keyword in title_lower for keyword in ['track walk', 'preview', 'breakdown']):
            return 'Track Analysis'
        elif any(keyword in title_lower for keyword in ['behind', 'scenes', 'exclusive']):
            return 'Behind the Scenes'
        else:
            return 'General Content'
    
    def generate_markdown_content(self, videos: List[Dict[str, Any]]) -> str:
        """Generate markdown content for the video page"""
        content = '''---
title: "Video Content"
description: "Watch the latest motocross and supercross videos, highlights, interviews, and exclusive behind-the-scenes footage."
layout: "list"
---

# Video Content

Immerse yourself in the visual excitement of motocross and supercross with our extensive collection of video content. From race highlights and post-race interviews to technical breakdowns and behind-the-scenes exclusives, our video library brings the sport to life.

*Content automatically updated every Monday from official @AmericanMotocross and @SupercrossLive YouTube channels.*

## Featured Videos

'''
        
        for i, video in enumerate(videos[:5]):  # Top 5 featured videos
            duration = self.get_video_duration(video['video_id'])
            category = self.categorize_video(video['title'], video['description'])
            youtube_url = f"https://www.youtube.com/watch?v={video['video_id']}"
            
            content += f'''### [{video['title']}]({youtube_url})
**Duration:** {duration}  
**Category:** {category}  
**Channel:** {video['channel_title']}  
**[► Watch on YouTube]({youtube_url})**

{video['description']}

---

'''
        
        content += '''## Latest Uploads

'''
        
        for video in videos[5:]:  # Remaining videos in list format
            duration = self.get_video_duration(video['video_id'])
            youtube_url = f"https://www.youtube.com/watch?v={video['video_id']}"
            content += f'''- **[{video['title']}]({youtube_url})** - {duration} - {video['channel_title']}
'''
        
        content += '''
## Video Categories

### Race Highlights
Complete coverage of the most exciting moments from AMA Supercross and Pro Motocross events, featuring multiple camera angles and expert commentary.

### Interviews
Exclusive interviews with riders, team managers, and industry insiders providing insights into the sport and championship battles.

### Practice & Qualifying
Coverage of practice sessions, qualifying rounds, and heat races that set the stage for main event competition.

### Track Analysis
Expert breakdowns of tracks, riding techniques, and race strategies that provide deeper insight into the sport.

### Behind the Scenes
Exclusive access to teams, riders, and facilities showing the dedication required to compete at the professional level.

*Video content is automatically updated every Monday from official AMA racing channels to ensure you have access to the latest and most authentic motocross content.*'''
        
        return content
    
    def search_motocross_videos(self) -> List[Dict[str, Any]]:
        """Search for authentic motocross videos using YouTube API"""
        all_videos = []
        
        for search_term in self.search_terms:
            print(f"Searching for: {search_term}")
            
            search_url = f"{self.base_url}/search"
            search_params = {
                'part': 'snippet',
                'q': search_term,
                'type': 'video',
                'order': 'date',
                'maxResults': 5,
                'publishedAfter': (datetime.now() - timedelta(days=90)).isoformat() + 'Z',
                'key': self.api_key
            }
            
            try:
                response = requests.get(search_url, params=search_params)
                data = response.json()
                
                if 'items' in data:
                    for item in data['items']:
                        video_info = {
                            'title': item['snippet']['title'],
                            'video_id': item['id']['videoId'],
                            'description': item['snippet']['description'][:200] + '...' if len(item['snippet']['description']) > 200 else item['snippet']['description'],
                            'published_at': item['snippet']['publishedAt'],
                            'channel_title': item['snippet']['channelTitle']
                        }
                        all_videos.append(video_info)
            except Exception as e:
                print(f"Error searching for {search_term}: {e}")
                continue
        
        return all_videos

    def update_video_content(self):
        """Main function to update video content"""
        try:
            print("Searching for authentic motocross videos...")
            
            # Search for motocross videos
            all_videos = self.search_motocross_videos()
            
            # Sort by publish date (newest first)
            all_videos.sort(key=lambda x: x['published_at'], reverse=True)
            
            # Remove duplicates and take top 15 most recent videos
            seen_videos = set()
            unique_videos = []
            for video in all_videos:
                if video['video_id'] not in seen_videos:
                    seen_videos.add(video['video_id'])
                    unique_videos.append(video)
                    if len(unique_videos) >= 15:
                        break
            
            print(f"Found {len(unique_videos)} authentic motocross videos")
            
            # Generate markdown content
            markdown_content = self.generate_markdown_content(unique_videos)
            
            # Write to file
            with open(self.content_file, 'w', encoding='utf-8') as f:
                f.write(markdown_content)
            
            print(f"Successfully updated {self.content_file}")
            print(f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            
        except Exception as e:
            print(f"Error updating video content: {str(e)}")
            return False
        
        return True

def main():
    """Run the video updater"""
    import sys
    updater = YouTubeVideoUpdater()
    
    # Check if it's Monday or force update
    today = datetime.now().weekday()  # 0 = Monday
    force_update = '--force' in sys.argv
    
    if today == 0 or force_update:
        print("Running weekly video content update...")
        success = updater.update_video_content()
        if success:
            print("Video content update completed successfully!")
        else:
            print("Video content update failed!")
    else:
        print("Not Monday - skipping update (use --force to override)")

if __name__ == "__main__":
    main()