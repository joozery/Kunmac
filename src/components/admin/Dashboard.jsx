import { FiHome } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="w-full max-w-4xl mx-auto px-0">
      <div className="flex items-center justify-between mb-8 px-8">
        <div className="flex items-center gap-3">
          <FiHome className="text-3xl text-blue-700" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 tracking-tight">Dashboard</h1>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl w-full p-0 border border-blue-50 mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-8 pt-8 pb-4">
          <div className="font-bold text-xl text-blue-700">สรุปสถิติ</div>
        </div>
        <div className="px-8 pb-8">
          {/* mockup dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-700">12</div>
              <div className="text-gray-500 mt-2">รถทั้งหมด</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-700">5</div>
              <div className="text-gray-500 mt-2">บทความ</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-700">8</div>
              <div className="text-gray-500 mt-2">ข้อความติดต่อ</div>
            </div>
          </div>
          <div className="bg-blue-100 rounded-xl p-8 text-center text-blue-700 font-bold text-lg">(Mockup) กราฟสถิติจะอยู่ตรงนี้</div>
        </div>
      </div>
    </div>
  );
} 