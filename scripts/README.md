# MXRaceHub Automatic Update Scripts

This directory contains scripts for automatically updating MXRaceHub content with the latest data from SupercrossLive.com.

## Scripts Overview

- `update_all.sh` - Master script that runs all individual update scripts
- `update_riders.sh` - Updates rider profiles, stats, and images
- `update_teams.sh` - Updates team information, rosters, and images
- `update_riders.py` - Python implementation of rider data scraping
- `update_teams.py` - Python implementation of team data scraping

## Requirements

- Python 3.6 or higher
- Required Python packages:
  - requests
  - beautifulsoup4
  - html5lib
- Bash shell environment
- Cron (for scheduling)

## Installation

1. Make sure all scripts are executable:
   ```
   chmod +x *.sh
   ```

2. Install required Python packages:
   ```
   pip install requests beautifulsoup4 html5lib
   ```

3. Set up scheduled updates using cron:
   ```
   # Edit path in crontab.txt to match your environment
   nano crontab.txt
   
   # Install the crontab
   crontab crontab.txt
   
   # Verify installation
   crontab -l
   ```

## Manual Execution

You can also run the update scripts manually:

```
# Update everything
./update_all.sh

# Update only riders
./update_riders.sh

# Update only teams
./update_teams.sh
```

## Logs

Logs are stored in the `logs` directory with timestamps. Check these logs to troubleshoot any issues with the update process.

## Customization

If you need to customize the update behavior:

1. Edit the Python scripts to modify scraping logic
2. Edit the shell scripts to modify execution flow
3. Edit crontab.txt to modify scheduling

## Troubleshooting

If updates are failing:

1. Check the logs in the `logs` directory
2. Verify network connectivity to SupercrossLive.com
3. Run the scripts manually with verbose output
4. Check for changes to the SupercrossLive.com HTML structure that might break scraping

## Additional Notes

- Updates are scheduled to run at midnight every Sunday by default
- All times are interpreted in the server's local timezone
- The scripts include retry logic for network resilience