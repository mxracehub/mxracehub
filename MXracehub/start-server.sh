#!/bin/bash

# Script to start MXRaceHub application with TypeScript server and Hugo site

# Display banner
echo "==================================="
echo "  MXRaceHub Server Startup Script  "
echo "==================================="

# Set environment variables if not already set
export SESSION_SECRET=${SESSION_SECRET:-"mxracehub-secret-key"}
export PORT=${PORT:-8080}
export NODE_ENV=${NODE_ENV:-"development"}

# Create a startup shell script for npx
cat > run-ts-node.sh << EOL
#!/bin/bash
cd hugo-site
npx ts-node server/index.ts
EOL

chmod +x run-ts-node.sh

# Start TypeScript server
echo "Starting TypeScript server..."
./run-ts-node.sh &
TS_SERVER_PID=$!

# Function to handle shutdown
function cleanup() {
  echo "Shutting down servers..."
  kill $TS_SERVER_PID
  exit 0
}

# Set up signal traps
trap cleanup SIGINT SIGTERM

# Wait for TypeScript server to be available
echo "Waiting for server to start..."
sleep 5

echo "MXRaceHub application is now running!"
echo "Access the site at: http://localhost:$PORT"

# Keep the script running to maintain the background processes
wait