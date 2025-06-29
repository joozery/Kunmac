const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")("articles"); // 📌 ส่ง folder "articles"
const db = require("../db/db");

// ✅ GET ทั้งหมด
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM articles ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("GET /api/articles error:", err);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

// ✅ GET รายการเดียว
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

// ✅ POST
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
    console.error("POST /api/articles error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// ✅ PUT
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
    console.error("PUT /api/articles/:id error:", err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// ✅ DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.promise().query('DELETE FROM articles WHERE id = ?', [id]);
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
