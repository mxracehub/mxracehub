#!/bin/bash

# Update race data by scraping from supercrosslive.com and promotocross.com
# This script is meant to be run weekly to keep the race schedule up to date

# Navigate to the script directory
cd "$(dirname "$0")"

# Set log file
LOG_DIR="../logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/update_races_$(date +\%Y\%m\%d_\%H\%M\%S).log"

echo "Starting race data update at $(date)" | tee -a "$LOG_FILE"

# Ensure required Python packages are installed
pip install requests beautifulsoup4 2>&1 | tee -a "$LOG_FILE"

# Run the Python scraper script
python3 update_races.py 2>&1 | tee -a "$LOG_FILE"
RESULT=$?

if [ $RESULT -eq 0 ]; then
    echo "Race data update completed successfully at $(date)" | tee -a "$LOG_FILE"
    exit 0
else
    echo "ERROR: Race data update failed with code $RESULT at $(date)" | tee -a "$LOG_FILE"
    exit 1
fi