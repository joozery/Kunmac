import { useSidebar } from "./SidebarContext";
import { NavLink } from "react-router-dom";
import { FiHome, FiTruck, FiFileText, FiMail, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight, FiImage, FiVideo } from "react-icons/fi";
import { motion } from "framer-motion";

const mainMenu = [
  { key: "overview", label: "Dashboard", icon: <FiHome />, to: "/admin" },
  { key: "cars", label: "จัดการรถ", icon: <FiTruck />, to: "/admin/cars" },
  { key: "articles", label: "จัดการบทความ", icon: <FiFileText />, to: "/admin/articles" },
  { key: "portfolio", label: "จัดการผลงาน", icon: <FiImage />, to: "/admin/portfolio" },
  { key: "contacts", label: "ข้อความติดต่อ", icon: <FiMail />, to: "/admin/contacts" },
  { key: "youtube", label: "เพิ่มลิงก์ YouTube", icon: <FiVideo />, to: "/admin/youtube" },
  { key: "settings", label: "ตั้งค่า", icon: <FiSettings />, to: "/admin/settings" },
];

const sidebarVariants = {
  open: { width: 260, transition: { type: "spring", stiffness: 80, damping: 18 } },
  collapsed: { width: 72, transition: { type: "spring", stiffness: 80, damping: 18 } },
};

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <motion.aside
      className="min-h-screen flex flex-col border-r border-gray-100 shadow-2xl relative z-40 pt-8 bg-gradient-to-b from-white via-blue-50 to-white"
      animate={collapsed ? "collapsed" : "open"}
      variants={sidebarVariants}
      initial={false}
    >
      {/* Toggle Button */}
      <button
        className="absolute -right-3 top-10 w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-blue-600 hover:bg-blue-50 transition z-50"
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? "ขยาย sidebar" : "หุบ sidebar"}
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
      {/* Logo */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className={`flex items-center gap-3 mb-10 transition-all duration-300 ${collapsed ? 'justify-center' : 'pl-6'}`} style={{ minHeight: 56 }}>
        <div className="bg-gradient-to-tr from-blue-200 to-blue-500 rounded-xl p-2 shadow-lg">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none"><path d="M16 4L28 28H4L16 4Z" fill="#1976D2"/></svg>
        </div>
        {!collapsed && <span className="font-extrabold text-xl text-blue-700 tracking-wide whitespace-nowrap drop-shadow">ระบบจัดการรถ</span>}
      </motion.div>
      {/* MAIN MENU */}
      <div className={`text-xs text-gray-400 font-bold tracking-widest mb-4 pl-6 transition-all duration-300 ${collapsed ? 'text-center pl-0' : ''}`}>MENU</div>
      <nav className="flex flex-col gap-2 mb-6">
        {mainMenu.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-6 py-2 rounded-xl font-semibold text-base transition relative overflow-hidden ${
                isActive ? 'bg-gradient-to-r from-blue-100 to-blue-300 text-blue-800 shadow-lg before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-blue-300' : 'text-gray-700 hover:bg-blue-50'
              } ${collapsed ? 'justify-center px-0' : ''}`
            }
            title={collapsed ? item.label : undefined}
            end={item.to === "/admin"}
          >
            <span className="text-xl drop-shadow-lg">{item.icon}</span>
            {!collapsed && <span className="transition-all duration-200 group-hover:pl-2">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="flex-1" />
      {/* User Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
        className={`mx-4 mb-6 p-4 rounded-2xl bg-white/80 shadow-lg flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}
        style={{ minHeight: 56 }}
      >
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-11 h-11 rounded-full object-cover border-2 border-blue-200 shadow" />
        {!collapsed && (
          <div>
            <div className="font-bold text-gray-800 text-base">Mathew</div>
            <div className="text-xs text-gray-400">Designer</div>
          </div>
        )}
      </motion.div>
      {/* Logout Button */}
      <div className="px-4 pb-8">
        <button
          className={`flex items-center gap-3 w-full px-0 py-3 rounded-xl font-semibold text-base text-red-600 hover:bg-red-50 transition justify-center ${collapsed ? 'justify-center' : ''}`}
          onClick={() => {
            localStorage.removeItem('admin-auth');
            window.location.reload();
          }}
          title={collapsed ? "Logout" : undefined}
        >
          <FiLogOut className="text-xl" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
} 