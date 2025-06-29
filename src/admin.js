const express = require('express');
const router = express.Router();
const db = require('../db/db'); // ปรับ path ตามจริง
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middlewares/adminAuth');

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM admin_users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (!results.length) return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    const user = results[0];
    // bcrypt.compare แบบ callback
    bcrypt.compare(password, user.password_hash, (err, match) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      if (!match) return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'YOUR_SECRET',
        { expiresIn: '1d' }
      );
      res.json({ token, user: { id: user.id, username: user.username, name: user.name } });
    });
  });
});

// ตัวอย่าง protected route
router.get('/protected', adminAuth, (req, res) => {
  res.json({ message: 'You are admin', admin: req.admin });
});

// ตัวอย่าง: ป้องกันการดึงข้อมูลรถ (เฉพาะแอดมิน)
router.get('/cars', adminAuth, (req, res) => {
  db.query('SELECT * FROM cars', (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json({ cars: results });
  });
});

router.post('/register', async (req, res) => {
    const { username, password, name } = req.body;
    const bcrypt = require('bcrypt');
    const hash = await bcrypt.hash(password, 10);
    db.query('INSERT INTO admin_users (username, password_hash, name) VALUES (?, ?, ?)', [username, hash, name], (err, result) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      res.json({ success: true, id: result.insertId });
    });
  });


module.exports = router;