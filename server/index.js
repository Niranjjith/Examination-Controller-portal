import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/examination_center';

// Middleware
app.use(cors());
app.use(express.json());

// Simple Exam schema/model
const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    programme: { type: String },
    level: { type: String },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    venue: { type: String },
    status: {
      type: String,
      enum: ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    }
  },
  { timestamps: true }
);

const Exam = mongoose.model('Exam', examSchema);

// Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Get all exams
app.get('/api/exams', async (_req, res) => {
  try {
    const exams = await Exam.find().sort({ date: 1, startTime: 1 });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch exams' });
  }
});

// Create exam
app.post('/api/exams', async (req, res) => {
  try {
    const exam = new Exam(req.body);
    const saved = await exam.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create exam', error: err.message });
  }
});

// Update exam
app.put('/api/exams/:id', async (req, res) => {
  try {
    const updated = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update exam', error: err.message });
  }
});

// Delete exam
app.delete('/api/exams/:id', async (req, res) => {
  try {
    const deleted = await Exam.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete exam' });
  }
});

// Connect to Mongo and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

