const express = require('express');
const router = express.Router();

// உங்கள் பாணியில் Destructuring செய்து இம்போர்ட் செய்தல்
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");

// Todo Routes
router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;