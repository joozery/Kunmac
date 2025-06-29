const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
app.use(cors());
app.use(express.json());

// ✅ Route พื้นฐานเพื่อเช็คว่า server ทำงาน
app.get('/', (req, res) => {
  res.send('✅ API is running on Heroku!');
});

// 🔗 Routes จริง
const articlesRouter = require("./routes/articles");
app.use("/api/articles", articlesRouter.default || articlesRouter);

const portfolioRouter = require("./routes/portfolio"); // ✅ เพิ่มตรงนี้
app.use("/api/portfolio", portfolioRouter.default || portfolioRouter); // ✅ แล้วใช้

const carRoutes = require('./routes/cars');
app.use('/api', carRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// 🚀 Start server
app.listen(process.env.PORT || 5000, () => console.log("Server started"));
