import React, { useState } from "react";
import { FiVideo, FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

export default function YoutubeManager() {
  const [links, setLinks] = useState([
    { id: 1, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  ]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!input.trim()) return;
    if (editId) {
      setLinks(links.map(l => l.id === editId ? { ...l, url: input } : l));
      setEditId(null);
    } else {
      setLinks([...links, { id: Date.now(), url: input }]);
    }
    setInput("");
  };
  const handleEdit = (id) => {
    const link = links.find(l => l.id === id);
    setInput(link.url);
    setEditId(id);
  };
  const handleDelete = (id) => setLinks(links.filter(l => l.id !== id));

  return (
    <div className="w-full px-4 md:px-8">
      <div className="flex items-center gap-3 mb-8 mt-4">
        <FiVideo className="text-3xl text-blue-700" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 tracking-tight">เพิ่มลิงก์ YouTube</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-xl w-full p-8 border border-blue-50 mb-8">
        <div className="flex gap-3 mb-6">
          <input
            className="flex-1 border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400 transition"
            placeholder="วางลิงก์ YouTube ที่นี่..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg text-lg transition-all"
            onClick={handleAdd}
          >
            {editId ? <FiEdit2 /> : <FiPlus />} {editId ? "แก้ไข" : "เพิ่ม"}
          </button>
        </div>
        <div className="space-y-4">
          {links.length === 0 && <div className="text-gray-400">ยังไม่มีลิงก์</div>}
          {links.map(link => (
            <div key={link.id} className="flex items-center gap-4 bg-blue-50 rounded-xl px-4 py-3">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline flex-1 truncate">{link.url}</a>
              <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600" onClick={() => handleEdit(link.id)} title="แก้ไข"><FiEdit2 /></button>
              <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600" onClick={() => handleDelete(link.id)} title="ลบ"><FiTrash2 /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 