import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import noticeRoutes from './routes/noticeRoutes.js';

const app = express();
app.use(cors());
// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173', // or your production frontend domain
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
mongoose.connect('mongodb://localhost:27017/notices-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.error('DB connection error:', err));
