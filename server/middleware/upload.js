import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
const storage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params: {
    folder: "mou_documents",
    allowed_formats: ["pdf", "doc", "docx"],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

export default upload;
