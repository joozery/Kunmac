import React from "react";
import { FiImage, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiUpload } from "react-icons/fi";
import api from '@/lib/api';
import Swal from 'sweetalert2';

function PortfolioForm({ open, onClose, onSave, initial }) {
  const [title, setTitle] = React.useState(initial?.title || "");
  const [images, setImages] = React.useState(initial?.images || []);
  const [files, setFiles] = React.useState([]); // สำหรับไฟล์ใหม่
  const [description, setDescription] = React.useState(initial?.description || "");
  const [content, setContent] = React.useState(initial?.content || "");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setTitle(initial?.title || "");
    setImages(initial?.images || []);
    setFiles([]);
    setDescription(initial?.description || "");
    setContent(initial?.content || "");
    setError("");
  }, [open, initial]);

  const handleFiles = (e) => {
    const filesArr = Array.from(e.target.files);
    filesArr.forEach(f => {
      const reader = new FileReader();
      reader.onload = ev => setImages(imgs => [...imgs, ev.target.result]);
      reader.readAsDataURL(f);
    });
    setFiles(f => [...f, ...filesArr]);
  };
  const handleRemoveImage = idx => {
    setImages(imgs => imgs.filter((_, i) => i !== idx));
    setFiles(f => f.filter((_, i) => i !== idx));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim()) return setError("กรุณากรอกชื่อผลงาน");
    if (images.length === 0) return setError("กรุณาเลือกรูปภาพอย่างน้อย 1 รูป");
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description);
      formData.append('content', content);
      files.forEach(f => formData.append('images', f));
      // POST ไปยัง API จริง
      await api.post('portfolio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await Swal.fire({
        icon: 'success',
        title: 'เพิ่มผลงานสำเร็จ',
        text: 'ผลงานถูกบันทึกเรียบร้อย',
        timer: 1800,
        showConfirmButton: false,
      });
      onSave && onSave();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถบันทึกผลงานได้',
      });
    }
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative animate-fadeIn">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><FiX size={22} /></button>
        <h2 className="text-xl font-bold text-blue-700 mb-6">{initial ? "แก้ไขผลงาน" : "เพิ่มผลงาน"}</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-semibold text-gray-800">ชื่อผลงาน</label>
            <input className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400 transition mt-1" value={title} onChange={e => setTitle(e.target.value)} placeholder="กรอกชื่อผลงาน" />
          </div>
          <div>
            <label className="font-semibold text-gray-800">รูปภาพ (เลือกได้หลายรูป)</label>
            <div className="flex flex-wrap gap-4 mt-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img src={img} alt="preview" className="w-24 h-24 object-cover rounded-lg border border-blue-100 shadow" />
                  <button type="button" className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-700" onClick={() => handleRemoveImage(idx)}><FiX size={16} /></button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg w-24 h-24 border-2 border-dashed border-blue-200">
                <FiUpload size={24} />
                <span className="text-xs">เพิ่มรูป</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
              </label>
            </div>
          </div>
          <div>
            <label className="font-semibold text-gray-800">รายละเอียดสั้น</label>
            <input className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400 transition mt-1" value={description} onChange={e => setDescription(e.target.value)} placeholder="รายละเอียดสั้น ๆ ของผลงาน" />
          </div>
          <div>
            <label className="font-semibold text-gray-800">เนื้อหา (รายละเอียดเต็ม)</label>
            <textarea className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400 transition min-h-[120px] mt-1" value={content} onChange={e => setContent(e.target.value)} placeholder="เนื้อหาผลงาน..." />
          </div>
          {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
          <button type="submit" className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-lg transition-all justify-center"><FiCheck /> บันทึก</button>
        </div>
      </form>
    </div>
  );
}

export default function PortfolioManager() {
  const [portfolio, setPortfolio] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);

  // โหลดข้อมูลผลงานจาก API
  React.useEffect(() => {
    setLoading(true);
    api.get('portfolio')
      .then(res => setPortfolio(res.data))
      .catch(() => setError('เกิดข้อผิดพลาดในการโหลดข้อมูล'))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setShowForm(true);
  };
  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };
  const handleSave = () => {
    // reload ข้อมูลใหม่หลังบันทึก
    setShowForm(false);
    setEditItem(null);
    setLoading(true);
    api.get('portfolio')
      .then(res => setPortfolio(res.data))
      .catch(() => setError('เกิดข้อผิดพลาดในการโหลดข้อมูล'))
      .finally(() => setLoading(false));
  };
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'ยืนยันการลบผลงานนี้?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#d33',
    });
    if (confirm.isConfirmed) {
      try {
        await api.delete(`portfolio/${id}`);
        setPortfolio(list => list.filter(i => i.id !== id));
        Swal.fire({ icon: 'success', title: 'ลบสำเร็จ', timer: 1200, showConfirmButton: false });
      } catch {
        Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: 'ไม่สามารถลบผลงานได้' });
      }
    }
  };

  return (
    <div className="w-full px-4 md:px-8">
      <div className="flex items-center justify-between mb-8 px-8">
        <div className="flex items-center gap-3">
          <FiImage className="text-3xl text-blue-700" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 tracking-tight">จัดการผลงาน</h1>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300">
          <FiPlus />
          เพิ่มผลงาน
        </button>
      </div>
      {loading ? (
        <div className="text-blue-700 text-lg text-center py-16">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-16">{error}</div>
      ) : portfolio.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-4">
          <FiImage className="text-6xl" />
          <div className="text-lg font-semibold">ยังไม่มีผลงาน</div>
          <button onClick={handleAdd} className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-lg transition-all">
            <FiPlus /> เพิ่มผลงานแรก
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8">
          {portfolio.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center relative group border border-blue-50">
              {item.images && item.images.length > 0 && (
                <img src={item.images[0]} alt={item.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              )}
              <div className="font-bold text-blue-800 text-lg mb-2 text-center w-full truncate">{item.title}</div>
              <div className="text-blue-700 text-sm mb-2 text-center w-full truncate">{item.description}</div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(item)} className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="แก้ไข"><FiEdit2 size={18} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition" title="ลบ"><FiTrash2 size={18} /></button>
              </div>
              <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow text-blue-400 group-hover:bg-blue-100 transition"><FiImage size={18} /></div>
            </div>
          ))}
        </div>
      )}
      <PortfolioForm open={showForm} onClose={() => { setShowForm(false); setEditItem(null); }} onSave={handleSave} initial={editItem} />
    </div>
  );
} 