const express = require('express');
const router = express.Router();
const db = require('../db/db');
const upload = require('../middlewares/upload')("portfolio"); // ✅ ใช้ dynamic upload folder
const cloudinary = require('../db/cloudinary');

// GET: ดึงผลงานทั้งหมด (รวมรูป)
router.get('/', async (req, res) => {
  const [rows] = await db.promise().query('SELECT * FROM portfolio ORDER BY id DESC');
  for (let p of rows) {
    const [imgs] = await db.promise().query('SELECT image_url FROM portfolio_images WHERE portfolio_id = ?', [p.id]);
    p.images = imgs.map(i => i.image_url);
  }
  res.json(rows);
});

// GET: ดึงผลงานตาม id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[portfolio]] = await db.promise().query('SELECT * FROM portfolio WHERE id = ?', [id]);
  if (!portfolio) return res.status(404).json({ message: 'Not found' });

  const [imgs] = await db.promise().query('SELECT image_url FROM portfolio_images WHERE portfolio_id = ?', [id]);
  portfolio.images = imgs.map(i => i.image_url);
  res.json(portfolio);
});

// POST: เพิ่มผลงานใหม่
router.post(
  '/',
  upload.array('images', 10),
  async (req, res) => {
    const { title, description, content } = req.body;
    const [result] = await db.promise().query(
      'INSERT INTO portfolio (title, description, content) VALUES (?, ?, ?)',
      [title, description, content]
    );
    const portfolioId = result.insertId;

    if (req.files && req.files.length > 0) {
      const values = req.files.map(f => [portfolioId, f.path]); // Cloudinary URL
      await db.promise().query(
        'INSERT INTO portfolio_images (portfolio_id, image_url) VALUES ?',
        [values]
      );
    }

    res.status(201).json({ message: 'Created', id: portfolioId });
  }
);

// PUT: แก้ไขผลงาน
router.put(
  '/:id',
  upload.array('images', 10),
  async (req, res) => {
    const { id } = req.params;
    const { title, description, content, removeImages } = req.body;

    await db.promise().query(
      'UPDATE portfolio SET title=?, description=?, content=? WHERE id=?',
      [title, description, content, id]
    );

    // ลบภาพที่ถูกระบุ
    if (removeImages) {
      const imgs = Array.isArray(removeImages) ? removeImages : [removeImages];
      for (const url of imgs) {
        await db.promise().query('DELETE FROM portfolio_images WHERE portfolio_id=? AND image_url=?', [id, url]);
        const publicId = url.split('/').pop().split('.')[0];
        try { await cloudinary.uploader.destroy(`portfolio/${publicId}`); } catch {}
      }
    }

    // เพิ่มรูปใหม่
    if (req.files && req.files.length > 0) {
      const values = req.files.map(f => [id, f.path]);
      await db.promise().query(
        'INSERT INTO portfolio_images (portfolio_id, image_url) VALUES ?',
        [values]
      );
    }

    res.json({ message: 'Updated' });
  }
);

// DELETE: ลบผลงาน
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const [imgs] = await db.promise().query('SELECT image_url FROM portfolio_images WHERE portfolio_id = ?', [id]);

  for (const img of imgs) {
    const publicId = img.image_url.split('/').pop().split('.')[0];
    try { await cloudinary.uploader.destroy(`portfolio/${publicId}`); } catch {}
  }

  await db.promise().query('DELETE FROM portfolio WHERE id = ?', [id]);
  res.json({ message: 'Deleted' });
});

module.exports = router;
