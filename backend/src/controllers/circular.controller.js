import Circular from "../models/Circular.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createCircular = async (req, res) => {
  try {
    const { title, message, sentTo } = req.body;
    const file = req.file;
    const userId = req.user.id;

    const data = {
      title: title || "Untitled Circular",
      message: message || "",
      createdBy: userId,
      status: "PENDING_PRINCIPAL",
      sentTo: Array.isArray(sentTo) ? sentTo : ["PRINCIPAL", "FACULTY"],
    };

    if (file) {
      data.fileUrl = `/uploads/${file.filename}`;
      data.fileName = file.originalname;
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext === ".pdf") data.fileType = "pdf";
      else if ([".doc", ".docx"].includes(ext)) data.fileType = ext.slice(1);
    }

    const circular = await Circular.create(data);
    res.status(201).json(circular);
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to create circular" });
  }
};

const PRINCIPAL_VISIBLE_STATUSES = ["PENDING_PRINCIPAL", "APPROVED", "SENT_BACK"];

export const listCirculars = async (req, res) => {
  try {
    const { status } = req.query;
    const role = req.user.role;
    const query = {};
    if (role === "PRINCIPAL") {
      if (status && PRINCIPAL_VISIBLE_STATUSES.includes(status)) {
        query.status = status;
      } else {
        query.status = { $in: PRINCIPAL_VISIBLE_STATUSES };
      }
    } else if (status) {
      query.status = status;
    }

    const circulars = await Circular.find(query)
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email")
      .populate("rejectedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(circulars);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to list circulars" });
  }
};

export const getCircular = async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email")
      .populate("rejectedBy", "name email");
    if (!circular) return res.status(404).json({ message: "Circular not found" });
    res.json(circular);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get circular" });
  }
};

export const approveCircular = async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id);
    if (!circular) return res.status(404).json({ message: "Circular not found" });
    if (circular.status !== "PENDING_PRINCIPAL")
      return res.status(400).json({ message: "Circular is not pending principal approval" });

    circular.status = "APPROVED";
    circular.approvedBy = req.user.id;
    circular.rejectionReason = null;
    circular.rejectedBy = null;
    await circular.save();

    const populated = await Circular.findById(circular._id)
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to approve circular" });
  }
};

export const sendBackCircular = async (req, res) => {
  try {
    const { reason } = req.body;
    const circular = await Circular.findById(req.params.id);
    if (!circular) return res.status(404).json({ message: "Circular not found" });
    if (circular.status !== "PENDING_PRINCIPAL")
      return res.status(400).json({ message: "Circular is not pending principal approval" });

    circular.status = "SENT_BACK";
    circular.rejectedBy = req.user.id;
    circular.rejectionReason = reason || "Rejected by Principal";
    circular.approvedBy = null;
    await circular.save();

    const populated = await Circular.findById(circular._id)
      .populate("createdBy", "name email")
      .populate("rejectedBy", "name email");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to send back circular" });
  }
};
