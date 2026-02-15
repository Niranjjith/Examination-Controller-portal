import mongoose from "mongoose";

const circularSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, default: "" },
    fileUrl: { type: String, default: null },
    fileName: { type: String, default: null },
    fileType: { type: String, default: null }, // pdf | doc | docx
    status: {
      type: String,
      enum: ["DRAFT", "PENDING_PRINCIPAL", "APPROVED", "SENT_BACK"],
      default: "DRAFT",
    },
    sentTo: [{ type: String, enum: ["PRINCIPAL", "FACULTY"], default: [] }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    rejectionReason: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Circular", circularSchema);
