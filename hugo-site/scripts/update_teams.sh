#!/bin/bash

# Script to update team information from SupercrossLive
# This is meant to be run on a weekly schedule (Sunday at midnight)

# Navigate to the Hugo site root directory
cd "$(dirname "$0")/.."

# Set log file
LOG_FILE="team_update_$(date +\%Y\%m\%d_\%H\%M\%S).log"

# Execute the Python update script
echo "Starting team update at $(date)" | tee -a "$LOG_FILE"
python3 scripts/update_teams.py 2>&1 | tee -a "$LOG_FILE"

if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "Team update completed successfully at $(date)" | tee -a "$LOG_FILE"
    # Optionally, rebuild the site if needed
    # hugo
    exit 0
else
    echo "Team update failed at $(date)" | tee -a "$LOG_FILE"
    exit 1
fi