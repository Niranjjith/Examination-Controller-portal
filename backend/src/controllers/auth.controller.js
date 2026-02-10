import User from "../models/User.model.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed, role });
  res.json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await comparePassword(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  const token = generateToken({ id: user._id, role: user.role });
  res.json({ token });
};
