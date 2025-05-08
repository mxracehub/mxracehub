#!/bin/bash
#
# This script runs the rider update script to fetch the latest data from supercrosslive.com
# It should be set up as a cron job to run every Sunday at midnight
#

# Change to the script directory
cd "$(dirname "$0")"

# Activate Python environment if using one
# source /path/to/virtualenv/bin/activate

# Run the update script
python3 update_riders.py

# Exit with the script's exit code
exit $?