require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const subtodoRoutes = require('./routes/subtodoRoutes');

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
    console.log('Connected to the database');
    await sequelize.sync({ alter: true }); // This will ensure all models are synced with the database
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Server is running on port ${port}`);
});
