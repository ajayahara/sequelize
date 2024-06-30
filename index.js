require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');

const authRoutes = require('./routes/auth.route');
const todoRoutes = require('./routes/todo.route');
const subtodoRoutes = require('./routes/subTodo.route');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/subtodos', subtodoRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Todo API' });
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Connected to the database\nTable sync complete');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Server is running on port ${port}`);
});
