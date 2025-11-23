import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config();
import connectDB from './config/db.js';

import expenseRoutes from './routes/expenseRoutes.js';
//import categoryRoutes from './routes/categoryRoutes.js';

const app = express();

// enabled cors for accessing this backup app from frontend
app.use(cors());

app.use(json());

// database connection
connectDB();

// routes
app.use('/api/expenses', expenseRoutes);
//app.use('/api/categories', categoryRoutes);

// health check route
app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
