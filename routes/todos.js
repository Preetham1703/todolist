const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../../models/Todo');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const secretKey = process.env.JWT_SECRET || 'your-secret-key';
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Get all todos for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new todo
router.post('/', authenticateToken, async (req, res) => {
  const { text, time } = req.body;

  if (!text || !time) {
    return res.status(400).json({ error: 'Text and time are required' });
  }

  try {
    const todo = new Todo({
      userId: req.user.userId,
      text,
      time: new Date(time)
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a todo
router.put('/:id', authenticateToken, async (req, res) => {
  const { text, time, done, missed } = req.body;

  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.userId });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (text !== undefined) todo.text = text;
    if (time !== undefined) todo.time = new Date(time);
    if (done !== undefined) todo.done = done;
    if (missed !== undefined) todo.missed = missed;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
