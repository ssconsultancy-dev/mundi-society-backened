import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  pdfUrl: {
    type: String,           // ✅ This is the URL/path to the PDF
    required: true,
  },
});

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
