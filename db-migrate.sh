#!/bin/bash

# Script to handle database migrations for MXRaceHub

# Display help message
function show_help {
  echo "MXRaceHub Database Migration Tool"
  echo "--------------------------------"
  echo "Usage: ./db-migrate.sh [command]"
  echo ""
  echo "Available commands:"
  echo "  push     - Push schema changes to database"
  echo "  generate - Generate migration files"
  echo "  studio   - Start Drizzle Studio to view database"
  echo "  help     - Show this help message"
  echo ""
}

# Check if command is provided
if [ $# -eq 0 ]; then
  show_help
  exit 1
fi

# Process commands
case $1 in
  push)
    echo "Pushing schema changes to database..."
    # Replace placeholder with actual environment variable
    sed "s|\$DATABASE_URL|$DATABASE_URL|g" drizzle.config.json > drizzle.config.tmp.json
    npx drizzle-kit push --config=drizzle.config.tmp.json
    rm drizzle.config.tmp.json
    ;;
  generate)
    echo "Generating migration files..."
    # Replace placeholder with actual environment variable
    sed "s|\$DATABASE_URL|$DATABASE_URL|g" drizzle.config.json > drizzle.config.tmp.json
    npx drizzle-kit generate --config=drizzle.config.tmp.json
    rm drizzle.config.tmp.json
    ;;
  studio)
    echo "Starting Drizzle Studio..."
    # Replace placeholder with actual environment variable
    sed "s|\$DATABASE_URL|$DATABASE_URL|g" drizzle.config.json > drizzle.config.tmp.json
    npx drizzle-kit studio --config=drizzle.config.tmp.json
    rm drizzle.config.tmp.json
    ;;
  help)
    show_help
    ;;
  *)
    echo "Unknown command: $1"
    show_help
    exit 1
    ;;
esac