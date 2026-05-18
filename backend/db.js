const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool using the connection string from the .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

module.exports = {
  // Export a query function so we can use it in our controllers
  query: (text, params) => pool.query(text, params),
};
