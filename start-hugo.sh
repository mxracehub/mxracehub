#!/bin/bash
echo "Starting MXRaceHub Hugo server..."
hugo server --bind 0.0.0.0 --port 8080 --buildDrafts --buildFuture