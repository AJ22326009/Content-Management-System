require ('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

//test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});