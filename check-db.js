const mongoose = require('mongoose');
require('dotenv').config();

async function checkDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Get all collections
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log('\nAvailable collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

    // Check users collection
    console.log('\n=== USERS ===');
    const User = require('../models/User');
    const users = await User.find({});
    console.log(`Total users: ${users.length}`);
    users.forEach(user => {
      console.log(`- Email: ${user.email}, Name: ${user.firstName} ${user.lastName}`);
    });

    // Check todos collection
    console.log('\n=== TODOS ===');
    const Todo = require('../models/Todo');
    const todos = await Todo.find({});
    console.log(`Total todos: ${todos.length}`);
    todos.forEach(todo => {
      console.log(`- Text: ${todo.text}, Time: ${todo.time}, Done: ${todo.done}, UserId: ${todo.userId}`);
    });

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');

  } catch (error) {
    console.error('Error:', error);
  }
}

checkDatabase();
