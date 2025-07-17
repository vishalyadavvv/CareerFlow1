import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" }); // ✅ Load .env before using any env variables

import app from "./app.js";
import cloudinary from "cloudinary";

// ✅ Configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// ✅ Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
