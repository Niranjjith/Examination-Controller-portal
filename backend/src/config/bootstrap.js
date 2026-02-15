import User from "../models/User.model.js";
import { hashPassword } from "../utils/password.js";
import { ROLES } from "./constants.js";

const DEFAULT_ADMIN_EMAIL =
  process.env.DEFAULT_ADMIN_EMAIL || "examcontroller@gmail.com";
const DEFAULT_ADMIN_PASSWORD =
  process.env.DEFAULT_ADMIN_PASSWORD || "123456";
const DEFAULT_PRINCIPAL_EMAIL =
  process.env.DEFAULT_PRINCIPAL_EMAIL || "principal@university.ac.in";
const DEFAULT_PRINCIPAL_PASSWORD =
  process.env.DEFAULT_PRINCIPAL_PASSWORD || "principal123";

export const ensureDefaultAdmin = async () => {
  const existing = await User.findOne({ email: DEFAULT_ADMIN_EMAIL });
  if (existing) return;

  const hashed = await hashPassword(DEFAULT_ADMIN_PASSWORD);

  await User.create({
    name: "Controller of Examinations",
    email: DEFAULT_ADMIN_EMAIL,
    password: hashed,
    role: ROLES.ADMIN,
  });

  // eslint-disable-next-line no-console
  console.log(
    `✅ Default admin created: ${DEFAULT_ADMIN_EMAIL} / ${DEFAULT_ADMIN_PASSWORD}`
  );
};

export const ensureDefaultPrincipal = async () => {
  const existing = await User.findOne({ email: DEFAULT_PRINCIPAL_EMAIL });
  if (existing) return;

  const hashed = await hashPassword(DEFAULT_PRINCIPAL_PASSWORD);

  await User.create({
    name: "Principal",
    email: DEFAULT_PRINCIPAL_EMAIL,
    password: hashed,
    role: ROLES.PRINCIPAL,
  });

  // eslint-disable-next-line no-console
  console.log(
    `✅ Default principal created: ${DEFAULT_PRINCIPAL_EMAIL} / ${DEFAULT_PRINCIPAL_PASSWORD}`
  );
};

