const { spawn } = require('child_process');

// Start the server with ts-node and bypass strict type checking
const server = spawn('npx', ['ts-node', '--transpile-only', '-r', 'tsconfig-paths/register', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});