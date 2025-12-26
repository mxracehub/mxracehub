#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('Starting MXRaceHub Racing Platform...');

// Start the server
const serverProcess = spawn('npx', ['ts-node', '--transpile-only', '-r', 'tsconfig-paths/register', 'index.ts'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit'
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('\nShutting down MXRaceHub...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nShutting down MXRaceHub...');
  serverProcess.kill('SIGTERM');
  process.exit(0);
});

serverProcess.on('exit', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});