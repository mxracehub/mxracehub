#!/bin/bash

# YouTube Video Updater Script for MXRaceHub
# Automatically updates video content every Monday from official channels

# Set script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Log file for tracking updates
LOG_FILE="$PROJECT_DIR/logs/video_updates.log"

# Create logs directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log_message "Starting YouTube video update process..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    log_message "ERROR: Python3 is not installed or not in PATH"
    exit 1
fi

# Check if required Python packages are installed
python3 -c "import requests" 2>/dev/null
if [ $? -ne 0 ]; then
    log_message "Installing required Python packages..."
    pip3 install requests
fi

# Check for YouTube API key
if [ -z "$YOUTUBE_API_KEY" ]; then
    log_message "WARNING: YouTube API key not found in environment variables"
    log_message "Please set YOUTUBE_API_KEY environment variable to enable automatic updates"
    exit 1
fi

# Run the Python video updater
log_message "Executing video content update..."
cd "$PROJECT_DIR"

python3 "$SCRIPT_DIR/update_videos.py" 2>&1 | tee -a "$LOG_FILE"

# Check if the update was successful
if [ $? -eq 0 ]; then
    log_message "Video content update completed successfully"
    
    # Rebuild Hugo site if it's running
    if pgrep -f "hugo server" > /dev/null; then
        log_message "Hugo server detected - content will auto-refresh"
    fi
else
    log_message "ERROR: Video content update failed"
    exit 1
fi

log_message "Video update process finished"