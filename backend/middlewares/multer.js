import multer from "multer";

// Store in memory (we'll upload to Cloudinary)
export const storage = multer.memoryStorage();
export const upload = multer({ storage });
