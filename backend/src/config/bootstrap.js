import User from "../models/User.model.js";
import { hashPassword } from "../utils/password.js";

const DEFAULT_ADMIN_EMAIL =
  process.env.DEFAULT_ADMIN_EMAIL || "examcontroller@gmail.com";
const DEFAULT_ADMIN_PASSWORD =
  process.env.DEFAULT_ADMIN_PASSWORD || "123456";

export const ensureDefaultAdmin = async () => {
  const existing = await User.findOne({ email: DEFAULT_ADMIN_EMAIL });
  if (existing) return;

  const hashed = await hashPassword(DEFAULT_ADMIN_PASSWORD);

  await User.create({
    name: "Controller of Examinations",
    email: DEFAULT_ADMIN_EMAIL,
    password: hashed,
    role: "ADMIN",
  });

  // eslint-disable-next-line no-console
  console.log(
    `✅ Default admin created: ${DEFAULT_ADMIN_EMAIL} / ${DEFAULT_ADMIN_PASSWORD}`
  );
};

