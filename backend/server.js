import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import { dbConnection } from "./database/dbConnection.js";
import app from "./app.js";
import cloudinary from "cloudinary";

// ✅ Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// ✅ Connect DB then start server
const startServer = async () => {
  await dbConnection();
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
};

startServer();
