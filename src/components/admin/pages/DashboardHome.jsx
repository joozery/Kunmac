import { FiTruck, FiFileText, FiMail, FiUser, FiVideo, FiPlus } from "react-icons/fi";

const mockRecent = [
  { type: "car", label: "เพิ่มรถใหม่: Alphard 2024", time: "2 นาทีที่แล้ว" },
  { type: "article", label: "เพิ่มบทความ: โปรโมชั่นพิเศษ!", time: "10 นาทีที่แล้ว" },
  { type: "youtube", label: "เพิ่มลิงก์ YouTube: รีวิวรถตู้", time: "30 นาทีที่แล้ว" },
  { type: "contact", label: "ข้อความใหม่จาก Jane", time: "1 ชั่วโมงที่แล้ว" },
];

export default function DashboardHome() {
  return (
    <div>
      <div className="flex items-center mb-8 gap-3">
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight">Dashboard Overview</h1>
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded">Admin Panel</span>
      </div>
      {/* Quick Actions */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <a href="/admin/cars/add" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold shadow transition text-sm"><FiPlus /> เพิ่มรถใหม่</a>
        <a href="/admin/articles/add" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow transition text-sm"><FiPlus /> เพิ่มบทความ</a>
        <a href="/admin/youtube" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold shadow transition text-sm"><FiPlus /> เพิ่มลิงก์ YouTube</a>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl shadow-lg flex items-center gap-4 border border-blue-50 col-span-1">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 text-2xl"><FiTruck /></div>
          <div>
            <div className="text-gray-500 text-sm font-medium">จำนวนรถ</div>
            <div className="text-3xl font-bold text-blue-700">6</div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg flex items-center gap-4 border border-blue-50 col-span-1">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 text-2xl"><FiFileText /></div>
          <div>
            <div className="text-gray-500 text-sm font-medium">บทความ</div>
            <div className="text-3xl font-bold text-blue-700">3</div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg flex items-center gap-4 border border-blue-50 col-span-1">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 text-2xl"><FiMail /></div>
          <div>
            <div className="text-gray-500 text-sm font-medium">ข้อความติดต่อ</div>
            <div className="text-3xl font-bold text-blue-700">12</div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg flex items-center gap-4 border border-blue-50 col-span-1">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 text-2xl"><FiUser /></div>
          <div>
            <div className="text-gray-500 text-sm font-medium">ผู้ใช้งาน</div>
            <div className="text-3xl font-bold text-blue-700">2</div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg flex items-center gap-4 border border-blue-50 col-span-1">
          <div className="bg-red-100 text-red-600 rounded-full p-3 text-2xl"><FiVideo /></div>
          <div>
            <div className="text-gray-500 text-sm font-medium">ลิงก์ YouTube</div>
            <div className="text-3xl font-bold text-red-600">1</div>
          </div>
        </div>
      </div>
      {/* กราฟยอดวิว YouTube */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-50 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-lg text-blue-700 flex items-center gap-2"><FiVideo /> ยอดวิว YouTube (Mockup)</div>
          <span className="text-xs text-gray-400">7 วันล่าสุด</span>
        </div>
        <svg viewBox="0 0 300 80" width="100%" height="80" className="mb-2">
          <polyline fill="none" stroke="#e53e3e" strokeWidth="4" points="0,60 40,30 80,50 120,20 160,60 200,40 240,70 280,30" />
          <circle cx="40" cy="30" r="4" fill="#e53e3e" />
          <circle cx="120" cy="20" r="4" fill="#e53e3e" />
          <circle cx="280" cy="30" r="4" fill="#e53e3e" />
        </svg>
        <div className="flex gap-6 text-xs text-gray-500">
          <div>วิวใหม่: <span className="font-bold text-red-600">120</span></div>
          <div>ลิงก์ใหม่: <span className="font-bold text-red-600">1</span></div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-50">
        <div className="font-bold text-lg text-blue-700 mb-4">กิจกรรมล่าสุด</div>
        <ul className="divide-y divide-blue-50">
          {mockRecent.map((item, idx) => (
            <li key={idx} className="py-3 flex items-center gap-3">
              {item.type === "car" && <FiTruck className="text-blue-500" />}
              {item.type === "article" && <FiFileText className="text-green-500" />}
              {item.type === "youtube" && <FiVideo className="text-red-500" />}
              {item.type === "contact" && <FiMail className="text-blue-400" />}
              <span className="flex-1 text-gray-700">{item.label}</span>
              <span className="text-xs text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 