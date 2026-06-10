const pool = require('../config/db');

const todoModel = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM todos');
    return result.rows;
  },
  create: async (task) => {
    const result = await pool.query('INSERT INTO todos (task) VALUES ($1) RETURNING *', [task]);
    return result.rows[0];
  }
};

module.exports = todoModel;