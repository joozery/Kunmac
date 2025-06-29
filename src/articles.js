// routes/articles.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const db = require("../db/db");

// ✅ GET: ใช้ทดสอบเปิดจากเบราว์เซอร์
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM articles ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("GET /api/articles error:", err);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

// ✅ POST: สำหรับอัปโหลดบทความพร้อมรูปภาพ
router.post("/", upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "ogImage", maxCount: 1 },
]), async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      metaTitle,
      metaDesc,
      status,
      keywords
    } = req.body;

    const mainImageUrl = req.files?.mainImage?.[0]?.path || null;
    const ogImageUrl = req.files?.ogImage?.[0]?.path || null;

    const [result] = await db.promise().query(
      `INSERT INTO articles 
        (title, slug, content, meta_title, meta_desc, keywords, status, main_image, og_image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        content,
        metaTitle,
        metaDesc,
        keywords,
        status,
        mainImageUrl,
        ogImageUrl
      ]
    );

    res.status(201).json({ message: "Article created", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// ลบบทความ
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.promise().query('DELETE FROM articles WHERE id = ?', [id]);
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// แก้ไขบทความ
router.put('/:id', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'ogImage', maxCount: 1 },
]), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      content,
      metaTitle,
      metaDesc,
      status,
      keywords
    } = req.body;
    const mainImageUrl = req.files?.mainImage?.[0]?.path || null;
    const ogImageUrl = req.files?.ogImage?.[0]?.path || null;

    // สร้าง query และ params แบบ dynamic (ถ้าไม่ได้อัปโหลดรูปใหม่ ให้ใช้รูปเดิม)
    let updateFields = [
      'title = ?',
      'slug = ?',
      'content = ?',
      'meta_title = ?',
      'meta_desc = ?',
      'keywords = ?',
      'status = ?'
    ];
    let params = [title, slug, content, metaTitle, metaDesc, keywords, status];
    if (mainImageUrl) {
      updateFields.push('main_image = ?');
      params.push(mainImageUrl);
    }
    if (ogImageUrl) {
      updateFields.push('og_image = ?');
      params.push(ogImageUrl);
    }
    params.push(id);
    const sql = `UPDATE articles SET ${updateFields.join(', ')} WHERE id = ?`;
    await db.promise().query(sql, params);
    res.json({ message: 'Article updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// GET: ดึงบทความตาม id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.promise().query('SELECT * FROM articles WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch article' });
  }
});

module.exports = router;
