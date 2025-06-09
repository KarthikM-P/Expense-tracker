import { Client } from 'pg';

export const connectDB = async () => {
  const db = process.env.PG_CONNECTION_STRING;

  if (!db) {
    console.error("❌ PG_CONNECTION_STRING is not defined in environment variables");
    process.exit(1);
  }

  const client = new Client({
    connectionString: db,
    ssl: {
      rejectUnauthorized: false, // Required by Azure PostgreSQL
    },
  });

  try {
    await client.connect();
    console.log(`✅ PostgreSQL connected successfully`);
    return client; // Export this if you want to use it for queries
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error.message);
    process.exit(1);
  }
};
