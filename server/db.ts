import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon database to use WebSockets
neonConfig.webSocketConstructor = ws;

// Check for environment variable
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable must be set. Did you forget to provision a database?"
  );
}

// Create database connection pool
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize Drizzle ORM with our schema
export const db = drizzle({ client: pool, schema });