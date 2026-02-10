import Exam from "../models/Exam.model.js";

export const createExam = async (req, res) => {
  const exam = await Exam.create(req.body);
  res.json(exam);
};

export const getExams = async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
};

export const lockExam = async (req, res) => {
  const exam = await Exam.findByIdAndUpdate(
    req.params.id,
    { locked: true },
    { new: true }
  );
  res.json(exam);
};
