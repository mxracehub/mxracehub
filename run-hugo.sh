#!/bin/bash
cd "$(dirname "$0")"
hugo server --bind=0.0.0.0 --port=3000 --baseURL=https://${REPL_SLUG}.${REPL_OWNER}.replit.dev