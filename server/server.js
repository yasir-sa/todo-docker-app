require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // இதை மறக்காமல் சேர்க்கவும்

const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// இதோ அந்த டெஸ்ட் ரவுட்:
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: "DB Connection Successful", time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});