require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:WZlX1datrVf3pUXX@todolistapi.lrywl97.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Middleware
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
