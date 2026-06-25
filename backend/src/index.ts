import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'CampusFlow API is running' });
});

// Define routes here
app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
