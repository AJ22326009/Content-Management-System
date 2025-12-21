require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/auth');

const articleRoutes = require('./routes/article.routes');
const permissionRoutes = require('./routes/permission.routes');
const roleRoutes = require('./routes/role.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.route');

const app = express();

// Connect to database
connectDB();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/articles', authMiddleware, articleRoutes);
app.use('/api/permissions', authMiddleware, permissionRoutes);
app.use('/api/roles', authMiddleware, roleRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/auth', authRoutes);


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