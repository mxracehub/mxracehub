# Automatic Video Content Updates

This system automatically fetches the latest videos from official @AmericanMotocross and @SupercrossLive YouTube channels and updates your video content page every Monday.

## Setup Instructions

### 1. Get YouTube API Key

You'll need a YouTube Data API v3 key to fetch authentic video content:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Copy your API key

### 2. Set Environment Variable

Add your YouTube API key to your environment:

```bash
export YOUTUBE_API_KEY="your_api_key_here"
```

Or add it to your `.env` file:
```
YOUTUBE_API_KEY=your_api_key_here
```

### 3. Install Automatic Updates

To set up automatic Monday updates, install the cron job:

```bash
# Edit the cron job file to include your correct project path
nano hugo-site/scripts/crontab.txt

# Install the cron job
crontab hugo-site/scripts/crontab.txt
```

### 4. Manual Testing

Test the video update system manually:

```bash
# Run the update script
./hugo-site/scripts/update_videos.sh

# Or run the Python script directly
cd hugo-site && python3 scripts/update_videos.py --force
```

## How It Works

### Official Channel Sources
- **@AmericanMotocross**: Professional motocross race coverage
- **@SupercrossLive**: Official AMA Supercross content

### Content Categories
The system automatically categorizes videos into:
- Race Highlights
- Interviews
- Practice & Qualifying
- Track Analysis
- Behind the Scenes

### Update Schedule
- **Primary**: Every Monday at 6:00 AM
- **Backup**: Every Monday at 6:00 PM (in case morning update fails)
- **Manual**: Run anytime with `--force` flag

### Generated Content
The system creates authentic content including:
- Video titles and descriptions from official channels
- Accurate video durations
- Direct YouTube links for immediate viewing
- Automatic categorization based on content

## File Structure

```
hugo-site/scripts/
├── update_videos.py     # Main Python script for fetching videos
├── update_videos.sh     # Shell script wrapper with logging
├── crontab.txt         # Cron job configuration
└── README.md           # This documentation

hugo-site/logs/
└── video_updates.log   # Update logs and error tracking

hugo-site/content/news/video/
└── _index.md          # Video content page (auto-updated)
```

## Troubleshooting

### Common Issues

1. **No API Key**: Ensure YOUTUBE_API_KEY environment variable is set
2. **Python Dependencies**: Install requests library: `pip3 install requests`
3. **Permissions**: Make sure script is executable: `chmod +x update_videos.sh`
4. **Cron Path**: Update crontab.txt with your actual project path

### Log Files

Check update logs for troubleshooting:
```bash
tail -f hugo-site/logs/video_updates.log
```

### Manual Update

Force an immediate update regardless of day:
```bash
cd hugo-site
python3 scripts/update_videos.py --force
```

## Benefits

✅ **Authentic Content**: Direct from official racing channels
✅ **Fresh Updates**: New videos every Monday automatically  
✅ **Real Links**: Actual YouTube videos fans can watch
✅ **Smart Categories**: Automatic content organization
✅ **Error Logging**: Track updates and troubleshoot issues

Your video section will always showcase the latest authentic motocross and supercross content!