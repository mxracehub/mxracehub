#!/usr/bin/env python3
"""
YouTube Interview Updater for MXRaceHub
Fetches latest interview content from motocross and supercross channels
Updates the interview content page with fresh content every Monday
"""

import os
import json
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Any

class YouTubeInterviewUpdater:
    def __init__(self):
        self.api_key = os.getenv('YOUTUBE_API_KEY')
        self.base_url = 'https://www.googleapis.com/youtube/v3'
        
        # Search terms specifically for interviews and press content
        self.search_terms = [
            'supercross rider interview',
            'motocross press conference',
            'ama supercross interview',
            'pro motocross rider interview',
            'supercross post race interview',
            'motocross team manager interview'
        ]
        
        self.content_file = 'hugo-site/content/news/interviews/_index.md'
    
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
    
    def categorize_interview(self, title: str, description: str) -> str:
        """Categorize interview based on title and description"""
        title_lower = title.lower()
        desc_lower = description.lower()
        
        if any(keyword in title_lower for keyword in ['post race', 'post-race', 'after race']):
            return 'Post-Race Analysis'
        elif any(keyword in title_lower for keyword in ['press conference', 'presser', 'media day']):
            return 'Press Conferences'
        elif any(keyword in title_lower for keyword in ['profile', 'behind', 'personal', 'story']):
            return 'Rider Profiles'
        elif any(keyword in title_lower for keyword in ['technical', 'setup', 'mechanic', 'bike']):
            return 'Technical Discussion'
        elif any(keyword in title_lower for keyword in ['manager', 'team', 'industry', 'business']):
            return 'Industry Insights'
        elif any(keyword in title_lower for keyword in ['career', 'retirement', 'legacy', 'retrospective']):
            return 'Career Retrospectives'
        else:
            return 'Interviews'
    
    def search_interview_content(self) -> List[Dict[str, Any]]:
        """Search for authentic interview content using YouTube API"""
        all_videos = []
        
        for search_term in self.search_terms:
            print(f"Searching for: {search_term}")
            
            search_url = f"{self.base_url}/search"
            search_params = {
                'part': 'snippet',
                'q': search_term,
                'type': 'video',
                'order': 'date',
                'maxResults': 4,
                'publishedAfter': (datetime.now() - timedelta(days=90)).isoformat() + 'Z',
                'key': self.api_key
            }
            
            try:
                response = requests.get(search_url, params=search_params)
                data = response.json()
                
                if 'items' in data:
                    for item in data['items']:
                        # Filter for content that's likely to be interviews
                        title = item['snippet']['title'].lower()
                        if any(keyword in title for keyword in ['interview', 'press', 'talks', 'discusses', 'speaks', 'q&a']):
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
    
    def generate_markdown_content(self, interviews: List[Dict[str, Any]]) -> str:
        """Generate markdown content for the interviews page"""
        content = '''---
title: "Interviews"
description: "Exclusive interviews with riders, team managers, and industry insiders from the world of motocross and supercross."
layout: "list"
---

# Interviews

Get inside access to the minds of professional motocross and supercross athletes through our extensive collection of interviews. From post-race analysis to career retrospectives, hear directly from the riders, team managers, and industry insiders who shape the sport.

*Content automatically updated every Monday from official racing channels and interview sources.*

## Featured Interviews

'''
        
        for i, interview in enumerate(interviews[:5]):  # Top 5 featured interviews
            duration = self.get_video_duration(interview['video_id'])
            category = self.categorize_interview(interview['title'], interview['description'])
            youtube_url = f"https://www.youtube.com/watch?v={interview['video_id']}"
            
            content += f'''### [{interview['title']}]({youtube_url})
**Duration:** {duration}  
**Category:** {category}  
**Channel:** {interview['channel_title']}  
**[► Watch on YouTube]({youtube_url})**

{interview['description']}

---

'''
        
        content += '''## Latest Interview Content

'''
        
        for interview in interviews[5:]:  # Remaining interviews in list format
            duration = self.get_video_duration(interview['video_id'])
            youtube_url = f"https://www.youtube.com/watch?v={interview['video_id']}"
            content += f'''- **[{interview['title']}]({youtube_url})** - {duration} - {interview['channel_title']}
'''
        
        content += '''
## Interview Categories

### Post-Race Analysis
Immediate reactions and insights from riders following championship races, discussing performance, strategy, and race conditions.

### Rider Profiles
In-depth conversations exploring the personal journeys, training methods, and career highlights of professional athletes.

### Industry Insights
Discussions with team managers, sponsors, and industry professionals about the business and development of professional racing.

### Technical Discussions
Expert conversations about motorcycle technology, setup techniques, and the mechanical aspects of competitive racing.

### Press Conferences
Official media events featuring multiple riders and industry figures discussing major announcements and season developments.

### Career Retrospectives
Long-form interviews with retired champions and veteran riders reflecting on their careers and the evolution of the sport.

*Interview content is automatically updated every Monday from official racing channels to ensure you have access to the latest authentic motocross interviews and insights.*'''
        
        return content
    
    def update_interview_content(self):
        """Main function to update interview content"""
        try:
            print("Searching for authentic interview content...")
            
            # Search for interview content
            all_interviews = self.search_interview_content()
            
            # Sort by publish date (newest first)
            all_interviews.sort(key=lambda x: x['published_at'], reverse=True)
            
            # Remove duplicates and take top 15 most recent interviews
            seen_videos = set()
            unique_interviews = []
            for interview in all_interviews:
                if interview['video_id'] not in seen_videos:
                    seen_videos.add(interview['video_id'])
                    unique_interviews.append(interview)
                    if len(unique_interviews) >= 15:
                        break
            
            print(f"Found {len(unique_interviews)} authentic interview videos")
            
            # Generate markdown content
            markdown_content = self.generate_markdown_content(unique_interviews)
            
            # Write to file
            with open(self.content_file, 'w', encoding='utf-8') as f:
                f.write(markdown_content)
            
            print(f"Successfully updated {self.content_file}")
            print(f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            
        except Exception as e:
            print(f"Error updating interview content: {str(e)}")
            return False
        
        return True

def main():
    """Run the interview updater"""
    import sys
    updater = YouTubeInterviewUpdater()
    
    # Check if it's Monday or force update
    today = datetime.now().weekday()  # 0 = Monday
    force_update = '--force' in sys.argv
    
    if today == 0 or force_update:
        print("Running weekly interview content update...")
        success = updater.update_interview_content()
        if success:
            print("Interview content update completed successfully!")
        else:
            print("Interview content update failed!")
    else:
        print("Not Monday - skipping update (use --force to override)")

if __name__ == "__main__":
    main()