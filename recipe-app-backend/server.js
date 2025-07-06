import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: [
    'https://my-recipe-app-psi.vercel.app',
    'http://localhost:19006',
    'http://localhost:8081',
    'http://10.0.2.2:5001',
    'http://192.168.1.100:5001'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/recipes', recipeRoutes);

app.use((req, res, next) => {
  res.status(404).send('API route not found');
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB successfully connected!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
