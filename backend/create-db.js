const { Client } = require('pg');

async function createDatabase() {
  const client = new Client({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'postgres' // Connect to default db first
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL as 'postgres'");
    
    // Check if db exists
    const res = await client.query(`SELECT datname FROM pg_database WHERE datname = 'cleannest_db';`);
    if (res.rowCount === 0) {
      await client.query('CREATE DATABASE cleannest_db;');
      console.log("Database 'cleannest_db' created successfully.");
    } else {
      console.log("Database 'cleannest_db' already exists.");
    }
  } catch (err) {
    console.error("Error creating database:", err);
  } finally {
    await client.end();
  }
}

createDatabase();
