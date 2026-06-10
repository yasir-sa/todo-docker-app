const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.DB_HOST !== 'localhost';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: false  // <--- இந்த வரியை கவனியுங்கள்
});

pool.connect()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch(err => {
    console.error("❌ Database connection error:", err.message);
    console.error("DEBUG: Host is set to:", process.env.DB_HOST);
  });

module.exports = pool;