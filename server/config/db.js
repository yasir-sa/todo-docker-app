const { Pool } = require('pg');
require('dotenv').config();

// Render-ல் நாம் DB_URL என்ற ஒரே வேரியபிளை மட்டும் பயன்படுத்துகிறோம்.
// இது பாதுகாப்பு மற்றும் இணைப்புத் தன்மையை (connection string) எளிதாக்கும்.
const pool = new Pool({
  connectionString: process.env.DB_URL,
  // லோக்கலில் டாக்கருக்கு SSL தேவையில்லை என்றால், அதை நீக்கிவிடலாம் 
  // அல்லது Render-க்கு மட்டும் வேலை செய்யும் வகையில் மாற்றி எழுதலாம்
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.connect()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch(err => {
    console.error("❌ Database connection error:", err.message);
  });

module.exports = pool;