const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../db/cloudinary");

// ฟังก์ชันสร้าง middleware สำหรับอัปโหลดไฟล์ขึ้น Cloudinary
function createUploadMiddleware(folderName = "uploads") {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName, // โฟลเดอร์ใน Cloudinary
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 1200, crop: "limit" }],
    },
  });

  return multer({ storage });
}

module.exports = createUploadMiddleware; 