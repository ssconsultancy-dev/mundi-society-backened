import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import noticeRoutes from './routes/noticeRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
// Middleware
// app.use(cors({
//   origin: 'https://mundissociety.in', // or your production frontend domain
//   methods: ['GET', 'POST', 'DELETE'], // Allowed HTTP methods
//   credentials: true, // if you need to send cookies or auth headers
// }));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Notice Management API');
});
app.use('/api', noticeRoutes);

// MongoDB connection
mongoose.connect(process.env.Mongo_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}).catch(err => console.error('DB connection error:', err));
