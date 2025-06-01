import fs from 'fs';
import path from 'path';
import Notice from '../models/notice.js';

// Add Notice
export const createNotice = async (req, res) => {
  try {
    const { title, date, isUrgent, isNew, posted_by } = req.body;
    console.log(req.body);
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const encodedFileName = encodeURIComponent(req.file.filename);
    const newNotice = new Notice({
      title,
      date: date || new Date(), // default to today if not provided
      isUrgent,
      isNew,
      posted_by,
      pdfUrl: `/uploads/${encodedFileName}`, // save relative path
    });

    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Notice (Admin only)
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    // Delete attached file
    const filePath = path.join(process.cwd(), 'uploads', path.basename(notice.pdfUrl));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Notice.findByIdAndDelete(id);
    res.json({ message: 'Notice deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Notices
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notices', error: error.message });
  }
};
