const express = require('express');
const router = express.Router();
const db = require('../db/db');
const createUploadMiddleware = require('../middlewares/upload');
const upload = createUploadMiddleware('cars'); // ใช้ folder cars ใน Cloudinary
const cloudinary = require('../db/cloudinary'); // ✅ ใช้ตอนลบจาก Cloudinary

// ✅ POST: เพิ่มรถพร้อมรูป
router.post('/cars', upload.array('images', 10), async (req, res) => {
  try {
    const { name, desc, features, prices, conditions, status } = req.body;
    const [result] = await db.promise().query(
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

    if (Array.isArray(req.files) && req.files.length > 0) {
      const values = req.files.map(f => [carId, f.path]);
      await db.promise().query(
        'INSERT INTO car_images (car_id, image_url) VALUES ?',
        [values]
      );
    }

    res.status(201).json({ success: true, carId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET: ดึงรถทั้งหมด
router.get('/cars', async (req, res) => {
  const [cars] = await db.promise().query('SELECT * FROM cars ORDER BY id DESC');
  for (const car of cars) {
    const [images] = await db.promise().query('SELECT image_url FROM car_images WHERE car_id = ?', [car.id]);
    car.images = images.map(img => img.image_url);
    car.features = JSON.parse(car.features || '[]');
    car.prices = JSON.parse(car.prices || '[]');
    car.conditions = JSON.parse(car.conditions || '[]');
  }
  res.json(cars);
});

// ✅ GET: รถทีละคัน
router.get('/cars/:id', async (req, res) => {
    const { id } = req.params;
  
    const [[car]] = await db.promise().query('SELECT * FROM cars WHERE id = ?', [id]); // ✅ ต้องตรวจสอบว่าไม่ค้าง
  
    if (!car) return res.status(404).json({ error: 'Car not found' });
  
    const [images] = await db.promise().query('SELECT image_url FROM car_images WHERE car_id = ?', [car.id]); // ✅ อันนี้ก็ไม่ควร delay
    car.images = images.map(img => img.image_url);
  
    car.features = JSON.parse(car.features || '[]');
    car.prices = JSON.parse(car.prices || '[]');
    car.conditions = JSON.parse(car.conditions || '[]');
  
    res.json(car);
  });
  

// ✅ PUT: แก้ไขรถ
router.put('/cars/:id', upload.array('images', 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, features, prices, conditions, status, keepImages } = req.body;

    await db.promise().query(
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

    // ✅ ลบรูปที่ไม่อยู่ใน keepImages
    const keep = keepImages ? JSON.parse(keepImages) : [];
    const [oldImages] = await db.promise().query('SELECT image_url FROM car_images WHERE car_id = ?', [id]);
    for (const img of oldImages) {
      if (!keep.includes(img.image_url)) {
        await db.promise().query('DELETE FROM car_images WHERE car_id = ? AND image_url = ?', [id, img.image_url]);

        // ✅ ลบจาก Cloudinary (optional)
        const publicId = img.image_url.split('/').pop().split('.')[0];
        try {
          await cloudinary.uploader.destroy(`cars/${publicId}`);
        } catch (e) {
          console.warn('Failed to delete from Cloudinary:', e.message);
        }
      }
    }

    // ✅ เพิ่มรูปใหม่
    if (Array.isArray(req.files) && req.files.length > 0) {
      const values = req.files.map(f => [id, f.path]);
      await db.promise().query(
        'INSERT INTO car_images (car_id, image_url) VALUES ?',
        [values]
      );
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE: ลบรถ
router.delete('/cars/:id', async (req, res) => {
  const { id } = req.params;

  // ✅ ดึงรูปจาก Cloudinary เพื่อลบ
  const [imgs] = await db.promise().query('SELECT image_url FROM car_images WHERE car_id = ?', [id]);
  for (const img of imgs) {
    const publicId = img.image_url.split('/').pop().split('.')[0];
    try {
      await cloudinary.uploader.destroy(`cars/${publicId}`);
    } catch (e) {
      console.warn('Failed to delete image from Cloudinary:', e.message);
    }
  }

  await db.promise().query('DELETE FROM car_images WHERE car_id = ?', [id]);
  await db.promise().query('DELETE FROM cars WHERE id = ?', [id]);
  res.json({ success: true });
});

module.exports = router;
