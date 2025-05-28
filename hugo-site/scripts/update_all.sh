#!/bin/bash

# Master Content Updater Script for MXRaceHub
# Automatically updates both video and interview content every Monday

# Set script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Log file for tracking updates
LOG_FILE="$PROJECT_DIR/logs/content_updates.log"

# Create logs directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log_message "Starting MXRaceHub content update process..."

# Check if YouTube API key is available
if [ -z "$YOUTUBE_API_KEY" ]; then
    log_message "WARNING: YouTube API key not found in environment variables"
    log_message "Please set YOUTUBE_API_KEY environment variable to enable automatic updates"
    exit 1
fi

# Update video content
log_message "Updating video content..."
cd "$PROJECT_DIR"
python3 "$SCRIPT_DIR/update_videos.py" --force 2>&1 | tee -a "$LOG_FILE"

if [ $? -eq 0 ]; then
    log_message "Video content update completed successfully"
else
    log_message "ERROR: Video content update failed"
fi

# Update interview content
log_message "Updating interview content..."
python3 "$SCRIPT_DIR/update_interviews.py" --force 2>&1 | tee -a "$LOG_FILE"

if [ $? -eq 0 ]; then
    log_message "Interview content update completed successfully"
else
    log_message "ERROR: Interview content update failed"
fi

# Update race schedule
log_message "Updating race schedule..."
python3 "$SCRIPT_DIR/update_schedule.py" --force 2>&1 | tee -a "$LOG_FILE"

if [ $? -eq 0 ]; then
    log_message "Race schedule update completed successfully"
else
    log_message "ERROR: Race schedule update failed"
fi

# Update betting page with current race
log_message "Updating betting page with upcoming race..."
python3 "$SCRIPT_DIR/update_betting.py" 2>&1 | tee -a "$LOG_FILE"

if [ $? -eq 0 ]; then
    log_message "Betting page update completed successfully"
else
    log_message "ERROR: Betting page update failed"
fi

# Update race schedule with Universe.com ticket links
log_message "Updating race schedule with ticket links..."
python3 "$SCRIPT_DIR/update_tickets.py" 2>&1 | tee -a "$LOG_FILE"

if [ $? -eq 0 ]; then
    log_message "Race schedule with tickets updated successfully"
else
    log_message "ERROR: Ticket links update failed"
fi

# Check if Hugo server is running
if pgrep -f "hugo server" > /dev/null; then
    log_message "Hugo server detected - content will auto-refresh"
fi

log_message "MXRaceHub content update process finished"
log_message "Both video and interview sections updated with fresh authentic racing content"