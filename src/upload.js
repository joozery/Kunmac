const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../db/cloudinary");

// ฟังก์ชันเพื่อสร้าง middleware พร้อม folder ที่กำหนด
function createUploadMiddleware(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder: folderName, // ใช้ folder ตามที่กำหนด
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 1200, crop: "limit" }],
      };
    },
  });

  return multer({ storage });
}

module.exports = createUploadMiddleware;
