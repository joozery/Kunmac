import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShake(false);
    try {
      // ใช้ axios instance (api) และ path ที่ถูกต้อง
      const res = await api.post("/admin/login", { username, password });
      localStorage.setItem("admin-auth", res.data.token || "1");
      navigate("/admin");
    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      Swal.fire({ icon: "error", title: "เข้าสู่ระบบไม่สำเร็จ", text: err.response?.data?.error || err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <motion.form
        onSubmit={handleLogin}
        className="bg-white/90 p-10 rounded-2xl shadow-2xl flex flex-col gap-6 w-full max-w-sm border border-blue-100"
        style={{ backdropFilter: "blur(2px)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 14 }}
        {...(shake ? { animate: { x: [0, -16, 16, -12, 12, -8, 8, 0] }, transition: { duration: 0.6 } } : {})}
      >
        <motion.div
          className="flex flex-col items-center mb-2"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <motion.img
            src={logo}
            alt="logo"
            className="w-16 h-16 mb-2 drop-shadow"
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 8 }}
            whileHover={{ scale: 1.08, rotate: 6 }}
          />
          <motion.h2
            className="text-3xl font-extrabold text-blue-800 mb-1 tracking-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            Admin Login
          </motion.h2>
          <motion.div
            className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ originX: 0 }}
          />
        </motion.div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">อีเมล / Username</label>
          <input
            className="border-2 border-blue-200 focus:border-yellow-500 rounded-lg px-4 py-2 text-lg transition bg-white/80 focus:bg-yellow-50 font-medium text-gray-800 placeholder-gray-400"
            placeholder="อีเมลหรือชื่อผู้ใช้"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">รหัสผ่าน</label>
          <input
            className="border-2 border-blue-200 focus:border-yellow-500 rounded-lg px-4 py-2 text-lg transition bg-white/80 focus:bg-yellow-50 font-medium text-gray-800 placeholder-gray-400"
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <motion.button
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white rounded-lg py-2 text-lg font-bold shadow-lg mt-2 transition-all"
          disabled={loading}
          whileHover={{ scale: 1.04, boxShadow: "0 4px 24px 0 rgba(255, 193, 7, 0.18)" }}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </motion.button>
        <div className="text-xs text-gray-400 text-center mt-2">© {new Date().getFullYear()} Luxury Car Admin</div>
      </motion.form>
    </div>
  );
} 