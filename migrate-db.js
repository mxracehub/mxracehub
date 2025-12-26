const { Client } = require('pg');

async function migrateDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Create teams table
    await client.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        manufacturer VARCHAR(50),
        color VARCHAR(7) DEFAULT '#333333',
        logo_url TEXT,
        description TEXT,
        founded INTEGER,
        championships INTEGER DEFAULT 0,
        race_wins INTEGER DEFAULT 0,
        website VARCHAR(255),
        statistics JSON,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    console.log('Teams table created');

    // Add team reference to riders table if it doesn't exist
    try {
      await client.query(`
        ALTER TABLE riders ADD COLUMN team_id INTEGER REFERENCES teams(id);
      `);
      console.log('Added team_id to riders table');
    } catch (error) {
      if (error.code !== '42701') { // Column already exists
        console.log('team_id column may already exist:', error.message);
      }
    }

    // Add new rider fields if they don't exist
    const newRiderFields = [
      'hometown VARCHAR(100)',
      'height VARCHAR(20)',
      'weight VARCHAR(20)', 
      'bike VARCHAR(50)',
      'is_active BOOLEAN DEFAULT true'
    ];

    for (const field of newRiderFields) {
      try {
        const fieldName = field.split(' ')[0];
        await client.query(`ALTER TABLE riders ADD COLUMN ${field};`);
        console.log(`Added ${fieldName} to riders table`);
      } catch (error) {
        if (error.code !== '42701') { // Column already exists
          console.log(`${field.split(' ')[0]} column may already exist`);
        }
      }
    }

    // Insert sample teams for dynamic loading
    await client.query(`
      INSERT INTO teams (name, manufacturer, color, description, founded, championships, race_wins)
      VALUES 
        ('Monster Energy Kawasaki', 'Kawasaki', '#00FF00', 'Premier Kawasaki racing team', 2010, 15, 125),
        ('Red Bull KTM Factory Racing', 'KTM', '#FF4500', 'Official KTM factory team', 2008, 22, 180),
        ('Team Honda HRC', 'Honda', '#FF0000', 'Honda racing corporation team', 1995, 35, 250),
        ('Yamaha Factory Racing', 'Yamaha', '#0066CC', 'Official Yamaha factory racing', 2000, 28, 200)
      ON CONFLICT DO NOTHING;
    `);
    console.log('Sample teams inserted');

    // Insert sample riders linked to teams
    await client.query(`
      INSERT INTO riders (first_name, last_name, number, team, team_id, bike_brand, division, nationality, hometown, bike, is_active)
      VALUES 
        ('Jason', 'Anderson', 21, 'Monster Energy Kawasaki', 1, 'Kawasaki', '450', 'USA', 'Rio Rancho, NM', 'KX450', true),
        ('Cooper', 'Webb', 2, 'Red Bull KTM Factory Racing', 2, 'KTM', '450', 'USA', 'Newport, NC', '450 SX-F', true),
        ('Ken', 'Roczen', 94, 'Team Honda HRC', 3, 'Honda', '450', 'Germany', 'Mattstedt', 'CRF450R', true),
        ('Aaron', 'Plessinger', 7, 'Yamaha Factory Racing', 4, 'Yamaha', '450', 'USA', 'Hamilton, OH', 'YZ450F', true),
        ('Cameron', 'McAdoo', 42, 'Monster Energy Kawasaki', 1, 'Kawasaki', '250', 'USA', 'Sioux City, IA', 'KX250', true),
        ('Tom', 'Vialle', 28, 'Red Bull KTM Factory Racing', 2, 'KTM', '250', 'France', 'Vienne', '250 SX-F', true)
      ON CONFLICT DO NOTHING;
    `);
    console.log('Sample riders inserted');

    console.log('Database migration completed successfully!');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await client.end();
  }
}

migrateDatabase();