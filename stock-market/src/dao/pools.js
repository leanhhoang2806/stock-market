
const { Pool } = require('pg');

// Connect to PostgreSQL
const pool = new Pool({
  user: 'yourUsername',
  host: 'postgres', // Change this to the name of your PostgreSQL service in Docker Compose
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432,
});

module.exports = {
  pool
};