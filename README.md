# MXRaceHub: Motocross and Supercross Racing Platform

MXRaceHub is a cutting-edge digital platform revolutionizing Supercross and Motocross racing fan engagement through innovative content management and automated data synchronization.

## Project Structure

This project consists of two main components:

1. **Hugo Static Site (hugo-site/)**: 
   - Front-end Blowfish theme-based site
   - Responsive design for mobile and desktop
   - Race cards, rider profiles, and track information
   - Forms for betting and user interaction

2. **Backend API Server (server/)**:
   - Node.js/Express backend with TypeScript
   - PostgreSQL database with Drizzle ORM
   - Authentication system with JWT
   - Friend betting and group betting functionality

## Features

- Automated rider data updates from external sources
- Real-time race updates via WebSockets
- Comprehensive betting system for individual and group wagers
- Membership system with fee reduction for subscribers
- Multiple payment options including cryptocurrency

## Deployment

The static site can be deployed to GitHub Pages using the workflow in `.github/workflows/hugo-deploy.yml`.

The backend requires a PostgreSQL database and can be deployed to any Node.js hosting platform.

## Development

To run the project locally:

1. Start the backend server: `cd server && npm run dev`
2. Start the Hugo site: `cd hugo-site && hugo server -D`

## License

© 2025 MXRaceHub - All rights reserved