import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from '../database/db';  // Adjusted the path
import categoriesRoutes from './routes/categories';
import moviesRoutes from './routes/movies';

const app: Application = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/movies', moviesRoutes);

export default app;
