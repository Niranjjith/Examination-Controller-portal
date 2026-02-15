import User from "../models/User.model.js";
import { hashPassword } from "../utils/password.js";
import { ROLES } from "../config/constants.js";

export const listPrincipals = async (req, res) => {
  try {
    const principals = await User.find({ role: ROLES.PRINCIPAL })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(principals);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to list principals" });
  }
};

export const addPrincipal = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    if (!trimmedEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await User.findOne({ email: trimmedEmail });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await hashPassword(password || "principal123");
    const principal = await User.create({
      name: (name && String(name).trim()) || "Principal",
      email: trimmedEmail,
      password: hashed,
      role: ROLES.PRINCIPAL,
    });

    const user = principal.toObject();
    delete user.password;
    res.status(201).json(user);
  } catch (err) {
    let message = "Failed to add principal";
    if (err.code === 11000) message = "Email already exists";
    else if (err.name === "ValidationError") message = Object.values(err.errors || {}).map((e) => e.message).join(", ") || err.message;
    else if (err.message) message = err.message;
    res.status(400).json({ message });
  }
};

export const updatePrincipal = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const principal = await User.findOne({ _id: req.params.id, role: ROLES.PRINCIPAL });
    if (!principal) return res.status(404).json({ message: "Principal not found" });

    if (name) principal.name = name;
    if (email) {
      const existing = await User.findOne({ email, _id: { $ne: principal._id } });
      if (existing) return res.status(400).json({ message: "Email already exists" });
      principal.email = email;
    }
    if (password && password.length >= 6) {
      principal.password = await hashPassword(password);
    }

    await principal.save();
    const user = principal.toObject();
    delete user.password;
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to update principal" });
  }
};

export const deletePrincipal = async (req, res) => {
  try {
    const principal = await User.findOneAndDelete({
      _id: req.params.id,
      role: ROLES.PRINCIPAL,
    });
    if (!principal) return res.status(404).json({ message: "Principal not found" });
    res.json({ message: "Principal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete principal" });
  }
};
