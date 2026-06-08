import { config } from 'dotenv';
import { Pool } from 'pg';
import path from 'path';

// load env from repo root (consistent with drizzle.config.ts)
config({ path: path.resolve(new URL(import.meta.url).pathname, '../../.env') });
config({ path: path.resolve(new URL(import.meta.url).pathname, '../../.env.local') });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set. Please add it to .env at repo root.');
  process.exit(1);
}

const pool = new Pool({ connectionString: databaseUrl });

async function run() {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id serial PRIMARY KEY,
        title text NOT NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id serial PRIMARY KEY,
        conversation_id integer NOT NULL,
        role text NOT NULL CHECK (role IN ('user','assistant')),
        content text NOT NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
      );
    `);

    await client.query(`COMMIT`);
    console.log('Database initialized (tables created if missing).');
  } catch (err) {
    await client.query(`ROLLBACK`);
    console.error('Error initializing database:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

run();
