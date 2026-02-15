import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ensureDefaultAdmin, ensureDefaultPrincipal } from "./config/bootstrap.js";

const start = async () => {
  await connectDB();
  await ensureDefaultAdmin();
  await ensureDefaultPrincipal();

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
};

start();
