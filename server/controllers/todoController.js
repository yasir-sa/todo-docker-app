const pool = require('../config/db'); // உங்கள் db.js கோப்பை இம்போர்ட் செய்யவும்

// 1. அனைத்து வேலைகளையும் பெறுதல்
exports.getTodos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. புதிய வேலை சேர்த்தல்
exports.createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const result = await pool.query(
      'INSERT INTO todos (task) VALUES ($1) RETURNING *',
      [task]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. வேலையை அப்டேட் செய்தல் (Edit Task OR Toggle Complete)
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;
    
    // task மற்றும் completed ஆகிய இரண்டையும் கையாளுதல்
    const result = await pool.query(
      'UPDATE todos SET task = COALESCE($1, task), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *',
      [task, completed, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. வேலையை நீக்குதல்
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};