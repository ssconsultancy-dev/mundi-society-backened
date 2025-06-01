// controllers/authController.js
import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';  // Change to a strong password!
const JWT_SECRET = 'admin';  // Use env var in real app

export const adminLogin = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password); // Debugging line
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};
