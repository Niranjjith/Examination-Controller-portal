import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  name: String,
  date: Date,
  subject: String,
  locked: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Exam", examSchema);
