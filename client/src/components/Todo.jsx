import React, { useState, useEffect } from 'react';
import API from '../api';
import './todo.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    const res = await API.get('/todos');
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    await API.post('/todos', { task });
    setTask('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  const toggleComplete = async (id, completed) => {
    await API.put(`/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const startEdit = (t) => {
    setEditId(t.id);
    setEditTask(t.task);
  };

  const saveEdit = async (id) => {
    await API.put(`/todos/${id}`, { task: editTask });
    setEditId(null);
    fetchTodos();
  };

  return (
    <div className="todo-container">
      <h2>📝 My Daily Tasks</h2>
      <form onSubmit={addTodo} className="input-group">
        <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="What needs to be done?" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((t) => (
          <li key={t.id} className={t.completed ? 'completed' : ''}>
            {editId === t.id ? (
              <input value={editTask} onChange={(e) => setEditTask(e.target.value)} />
            ) : (
              <span onClick={() => toggleComplete(t.id, t.completed)}>{t.task}</span>
            )}
            
            <div className="actions">
              {editId === t.id ? (
                <button className="save-btn" onClick={() => saveEdit(t.id)}>Save</button>
              ) : (
                <button className="edit-btn" onClick={() => startEdit(t)}>Edit</button>
              )}
              <button className="del-btn" onClick={() => deleteTodo(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
