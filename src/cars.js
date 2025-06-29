// dependencies
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const mysql = require('mysql2/promise');
const router = express.Router();

// ตั้งค่า Cloudinary
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

// Multer สำหรับรับไฟล์
const upload = multer({ storage: multer.memoryStorage() });

// สร้างรถใหม่ (พร้อมอัปโหลดหลายรูป)
router.post('/cars', upload.array('images', 10), async (req, res) => {
  const { name, desc, features, prices, conditions, status } = req.body;
  const files = req.files;

  try {
    // 1. บันทึกข้อมูลรถ
    const [result] = await db.execute(
      'INSERT INTO cars (name, `desc`, features, prices, conditions, status) VALUES (?, ?, ?, ?, ?, ?)',
      [
        name,
        desc,
        JSON.stringify(JSON.parse(features)),
        JSON.stringify(JSON.parse(prices)),
        JSON.stringify(JSON.parse(conditions)),
        status
      ]
    );
    const carId = result.insertId;

    // 2. อัปโหลดรูปขึ้น Cloudinary และบันทึก url
    for (const file of files) {
      const uploadRes = await cloudinary.uploader.upload_stream(
        { folder: 'cars' },
        async (error, result) => {
          if (error) throw error;
          await db.execute(
            'INSERT INTO car_images (car_id, image_url) VALUES (?, ?)',
            [carId, result.secure_url]
          );
        }
      );
      uploadRes.end(file.buffer);
    }

    res.json({ success: true, carId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ดึงรถทั้งหมด (พร้อมรูป)
router.get('/cars', async (req, res) => {
  const [cars] = await db.query('SELECT * FROM cars');
  for (const car of cars) {
    const [images] = await db.query('SELECT image_url FROM car_images WHERE car_id = ?', [car.id]);
    car.images = images.map(img => img.image_url);
    car.features = JSON.parse(car.features || '[]');
    car.prices = JSON.parse(car.prices || '[]');
    car.conditions = JSON.parse(car.conditions || '[]');
  }
  res.json(cars);
});

// ดึงข้อมูลรถทีละคัน (GET /cars/:id)
router.get('/cars/:id', async (req, res) => {
  const { id } = req.params;
  const [[car]] = await db.query('SELECT * FROM cars WHERE id = ?', [id]);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  const [images] = await db.query('SELECT image_url FROM car_images WHERE car_id = ?', [car.id]);
  car.images = images.map(img => img.image_url);
  car.features = JSON.parse(car.features || '[]');
  car.prices = JSON.parse(car.prices || '[]');
  car.conditions = JSON.parse(car.conditions || '[]');
  res.json(car);
});

// แก้ไขข้อมูลรถ (PUT /cars/:id)
router.put('/cars/:id', upload.array('images', 10), async (req, res) => {
  const { id } = req.params;
  const { name, desc, features, prices, conditions, status, keepImages } = req.body;
  const files = req.files;

  // อัปเดตข้อมูลรถ
  await db.execute(
    'UPDATE cars SET name=?, `desc`=?, features=?, prices=?, conditions=?, status=? WHERE id=?',
    [
      name,
      desc,
      JSON.stringify(JSON.parse(features)),
      JSON.stringify(JSON.parse(prices)),
      JSON.stringify(JSON.parse(conditions)),
      status,
      id
    ]
  );

  // ลบรูปเดิมที่ไม่อยู่ใน keepImages
  const keep = keepImages ? JSON.parse(keepImages) : [];
  const [oldImages] = await db.query('SELECT image_url FROM car_images WHERE car_id = ?', [id]);
  for (const img of oldImages) {
    if (!keep.includes(img.image_url)) {
      await db.execute('DELETE FROM car_images WHERE car_id = ? AND image_url = ?', [id, img.image_url]);
      // (optionally) ลบจาก Cloudinary ด้วย
    }
  }

  // อัปโหลดรูปใหม่
  for (const file of files) {
    const uploadRes = await cloudinary.uploader.upload_stream(
      { folder: 'cars' },
      async (error, result) => {
        if (error) throw error;
        await db.execute(
          'INSERT INTO car_images (car_id, image_url) VALUES (?, ?)',
          [id, result.secure_url]
        );
      }
    );
    uploadRes.end(file.buffer);
  }

  res.json({ success: true });
});

// ลบรถ (และรูป)
router.delete('/cars/:id', async (req, res) => {
  const { id } = req.params;
  await db.execute('DELETE FROM cars WHERE id = ?', [id]);
  res.json({ success: true });
});

module.exports = router;