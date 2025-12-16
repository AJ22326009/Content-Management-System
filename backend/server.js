require ('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const mockAuth = require('./middleware/mockAuth');

const articleRoutes = require('./routes/article.routes');

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

app.use(mockAuth);

app.use('/articles', articleRoutes);

//test route
app.get('/', (req, res) => {
  res.json(req.user);
});

const authorize= require('./middleware/authorize');
app.get('/protected', authorize('create_article'), (req, res) => {
  res.send(`Hello ${req.user.fullname}, you have accessed a protected route!`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});