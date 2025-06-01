import express from 'express';
import upload from '../middleware/upload.js';
import verifyToken from '../middleware/auth.js';
import { createNotice, deleteNotice,getAllNotices } from '../controllers/noticecontroller.js';
import { adminLogin } from '../controllers/authController.js';

const router = express.Router();

// Admin login to get JWT
router.post('/admin/login', adminLogin);
router.get('/usernotices', getAllNotices);
// Protected notice routes
router.post('/notices',verifyToken, upload.single('attachment'), createNotice);
router.delete('/notices/:id', verifyToken, deleteNotice);
export default router;
