import React from 'react';
import { LayoutDashboard, ListTodo, Target, FolderKanban, Wallet, FileText, BarChart2, Users, User, PlusCircle, Search, Bell, Settings, UserCircle } from 'lucide-react';

const mainMenu = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { icon: <ListTodo size={20} />, label: 'To-do List', badge: '05' },
  { icon: <Target size={20} />, label: 'Goals' },
  { icon: <FolderKanban size={20} />, label: 'Projects' },
  { icon: <Wallet size={20} />, label: 'Budgets', badge: 'New' },
  { icon: <FileText size={20} />, label: 'Templates' },
  { icon: <BarChart2 size={20} />, label: 'Reports' },
];

const mySpaces = [
  { icon: <Users size={18} />, label: 'All' },
  { icon: <User size={18} />, label: 'Assigned to me' },
  { icon: <User size={18} />, label: 'Shared' },
  { icon: <User size={18} />, label: 'Private' },
  { icon: <PlusCircle size={18} />, label: 'Add team member' },
];

export default function AdminSidebar({ selected, onSelect }) {
  return (
    <aside className="w-72 min-h-screen bg-white flex flex-col border-r border-gray-200 shadow-xl">
      {/* Logo */}
      <div className="flex flex-col items-center pt-6 pb-2 border-b border-gray-200">
        <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain mb-2" />
        <span className="font-extrabold text-2xl text-gray-800 tracking-wide flex items-center gap-1">
          DesignLib <Settings size={18} className="inline ml-1 text-gray-400" />
        </span>
      </div>
      {/* Search */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>
      {/* Main Menu */}
      <div className="px-6 pt-4 pb-2 text-xs text-gray-400 font-bold tracking-widest">GENERAL</div>
      <nav className="flex flex-col px-2">
        {mainMenu.map((item) => (
          <button
            key={item.label}
            className={`flex items-center px-4 py-2 rounded-lg mb-1 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-700 transition relative ${selected === item.label ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : ''}`}
            onClick={() => onSelect && onSelect(item.label)}
          >
            <span className={`mr-3 ${selected === item.label ? 'text-blue-500' : 'text-gray-400'}`}>{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${item.badge === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700 font-bold'}`}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="px-6 pt-4 pb-2 text-xs text-gray-400 font-bold tracking-widest mt-2">MY SPACES</div>
      <nav className="flex flex-col px-2">
        {mySpaces.map((item) => (
          <button
            key={item.label}
            className={`flex items-center px-4 py-2 rounded-lg mb-1 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-700 transition ${selected === item.label ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : ''}`}
            onClick={() => onSelect && onSelect(item.label)}
          >
            <span className={`mr-3 ${selected === item.label ? 'text-blue-500' : 'text-gray-400'}`}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="flex-1" />
      {/* User Profile */}
      <div className="flex items-center px-6 py-5 border-t border-gray-200 mt-4 bg-white">
        <UserCircle size={36} className="text-gray-400 mr-3" />
        <div>
          <div className="font-bold text-gray-800 text-base">Mahfuzul Islam Nabil</div>
          <div className="text-xs text-gray-400">Admin</div>
        </div>
      </div>
    </aside>
  );
} 