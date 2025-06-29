const express = require('express');
const router = express.Router();
const db = require('../db/db'); // ปรับ path ตามจริง
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middlewares/adminAuth');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM admin_users WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'YOUR_SECRET', { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, username: user.username, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ตัวอย่าง protected route
router.get('/protected', adminAuth, (req, res) => {
  res.json({ message: 'You are admin', admin: req.admin });
});

// ตัวอย่าง: ป้องกันการดึงข้อมูลรถ (เฉพาะแอดมิน)
router.get('/cars', adminAuth, async (req, res) => {
  try {
    const [cars] = await db.query('SELECT * FROM cars');
    res.json({ cars });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;