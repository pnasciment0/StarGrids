import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import categoriesRoutes from './routes/categories';
import moviesRoutes from './routes/movies';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/movies', moviesRoutes);

export default app;