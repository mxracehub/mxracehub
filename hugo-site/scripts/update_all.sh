#!/bin/bash
#
# Weekly update script for MXRaceHub content
# This script will update riders, teams, and races data from official sources
# To be run automatically each week on Sunday at midnight
#

# Set the working directory to the Hugo site
cd "$(dirname "$0")/.."

echo "Starting MXRaceHub data update at $(date)"

# Update rider data
echo "Updating rider data..."
python3 scripts/update_riders.py
if [ $? -eq 0 ]; then
  echo "Rider data update completed successfully"
else
  echo "Error updating rider data"
fi

# Update team data
echo "Updating team data..."
python3 scripts/update_teams.py
if [ $? -eq 0 ]; then
  echo "Team data update completed successfully"
else
  echo "Error updating team data"
fi

# Update race data
echo "Updating race data..."
python3 scripts/update_races.py
if [ $? -eq 0 ]; then
  echo "Race data update completed successfully"
else
  echo "Error updating race data"
fi

# Rebuild the site to apply updates
echo "Rebuilding the site..."
hugo
if [ $? -eq 0 ]; then
  echo "Site rebuild completed successfully"
else
  echo "Error rebuilding site"
fi

echo "MXRaceHub data update completed at $(date)"