import React, { useState, useEffect } from "react";
import { FiTruck, FiUpload, FiCheckCircle, FiX } from "react-icons/fi";
import api from '@/lib/api';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function AddCar({ onAdd }) {
  const [form, setForm] = useState({
    images: [],
    imagePreviews: [],
    name: "",
    desc: "",
    features: [""],
    prices: [""],
    conditions: [""],
    status: "พร้อมให้บริการ",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  // ดึงข้อมูลรถถ้าเป็นโหมดแก้ไข
  useEffect(() => {
    const id = query.get('id');
    console.log('edit id:', id); // debug id
    if (id) {
      setEditId(id);
      setLoading(true);
      api.get(`cars/${id}`)
        .then(res => {
          console.log('car data:', res.data); // debug data
          const car = res.data;
          if (!car || !car.id) {
            Swal.fire({ icon: 'error', title: 'ไม่พบข้อมูลรถ' });
            return;
          }
          setForm({
            images: [],
            imagePreviews: Array.isArray(car.images) ? car.images : [],
            name: car.name || "",
            desc: car.desc || "",
            features: Array.isArray(car.features) && car.features.length ? car.features : [""],
            prices: Array.isArray(car.prices) && car.prices.length ? car.prices : [""],
            conditions: Array.isArray(car.conditions) && car.conditions.length ? car.conditions : [""],
            status: car.status || "พร้อมให้บริการ",
          });
        })
        .catch((err) => {
          console.log('API error:', err);
          if (err.response && err.response.status === 404) {
            Swal.fire({ icon: 'error', title: 'ไม่พบข้อมูลรถ' });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [query]);

  const handleFormChange = (field, value) => setForm(f => ({ ...f, [field]: value }));
  const handleArrayChange = (field, idx, value) => setForm(f => ({ ...f, [field]: f[field].map((v, i) => i === idx ? value : v) }));
  const addArrayField = (field) => setForm(f => ({ ...f, [field]: [...f[field], ""] }));
  const removeArrayField = (field, idx) => setForm(f => ({ ...f, [field]: f[field].filter((_, i) => i !== idx) }));

  // handle multiple images
  const handleImages = e => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    // preview
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setForm(f => ({
          ...f,
          images: [...f.images, file],
          imagePreviews: [...f.imagePreviews, ev.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = idx => {
    setForm(f => ({
      ...f,
      images: f.images.filter((_, i) => i !== idx),
      imagePreviews: f.imagePreviews.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('desc', form.desc);
      formData.append('features', JSON.stringify(form.features.filter(f => f)));
      formData.append('prices', JSON.stringify(form.prices.filter(p => p)));
      formData.append('conditions', JSON.stringify(form.conditions.filter(c => c)));
      formData.append('status', form.status);
      form.images.forEach(img => formData.append('images', img));
      // ถ้าแก้ไข ส่ง keepImages เป็น array ของ url เดิมที่ต้องการเก็บไว้
      if (editId) {
        formData.append('keepImages', JSON.stringify(form.imagePreviews.filter(url => typeof url === 'string' && url.startsWith('http'))));
        await api.put(`cars/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire({ icon: 'success', title: 'แก้ไขข้อมูลรถสำเร็จ!', showConfirmButton: false, timer: 1500 });
      } else {
        await api.post('cars', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire({ icon: 'success', title: 'เพิ่มรถสำเร็จ!', showConfirmButton: false, timer: 1500 });
      }
      setForm({ images: [], imagePreviews: [], name: "", desc: "", features: [""], prices: [""], conditions: [""], status: "พร้อมให้บริการ" });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: err.response?.data?.error || err.message });
    }
  };

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 mb-6 mt-4">
        <FiTruck className="text-blue-500 text-3xl" /> เพิ่มรถใหม่
      </h2>
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* คอลัมน์ 1: อัปโหลดรูป */}
          <div className="flex flex-col gap-2">
            <label className="block font-semibold text-gray-800 mb-1">รูปภาพรถ (อัปโหลดได้หลายรูป)</label>
            <label className="flex items-center gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg w-fit">
              <FiUpload />
              <span>เลือกรูป (เลือกได้หลายไฟล์)</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
            </label>
            {form.imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {form.imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img src={src} alt={`preview-${idx}`} className="w-24 h-20 object-cover rounded-lg border border-blue-100 shadow" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 opacity-0 group-hover:opacity-100 transition"><FiX /></button>
                  </div>
                ))}
              </div>
            )}
            {form.images.length > 0 && <span className="text-green-600 text-xs flex items-center gap-1 mt-1"><FiCheckCircle /> อัปโหลดแล้ว {form.images.length} รูป</span>}
          </div>
          {/* คอลัมน์ 2: ชื่อรถ + รายละเอียด */}
          <div className="flex flex-col gap-2">
            <label className="block font-semibold text-gray-800 mb-1">ชื่อรถ</label>
            <input className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400 transition" value={form.name} onChange={e => handleFormChange("name", e.target.value)} required placeholder="เช่น อัลฟาร์ด ปี 2020-2023 (TOP SC)" />
            <label className="block font-semibold text-gray-800 mb-1 mt-2">รายละเอียด</label>
            <textarea className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400 transition" value={form.desc} onChange={e => handleFormChange("desc", e.target.value)} rows={2} placeholder="รายละเอียดรถโดยย่อ" />
          </div>
          {/* คอลัมน์ 3: คุณสมบัติ/ราคา/เงื่อนไข/สถานะ */}
          <div className="flex flex-col gap-2">
            <label className="block font-semibold text-gray-800 mb-1">คุณสมบัติเด่น</label>
            <div className="flex flex-col gap-1">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input className="flex-1 border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400" value={f} onChange={e => handleArrayChange("features", i, e.target.value)} placeholder="เช่น เบาะหนังปรับไฟฟ้า" />
                  {form.features.length > 1 && (
                    <button type="button" className="text-red-500" onClick={() => removeArrayField("features", i)}><FiX /></button>
                  )}
                </div>
              ))}
              <button type="button" className="text-blue-600 text-xs mt-1 self-start" onClick={() => addArrayField("features")}>+ เพิ่มคุณสมบัติ</button>
            </div>
            <label className="block font-semibold text-gray-800 mb-1 mt-2">รายละเอียดราคา</label>
            <div className="flex flex-col gap-1">
              {form.prices.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input className="flex-1 border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400" value={p} onChange={e => handleArrayChange("prices", i, e.target.value)} placeholder="เช่น กรุงเทพฯ - ปริมณฑล: 5,500 บาท (10 ชม.)" />
                  {form.prices.length > 1 && (
                    <button type="button" className="text-red-500" onClick={() => removeArrayField("prices", i)}><FiX /></button>
                  )}
                </div>
              ))}
              <button type="button" className="text-blue-600 text-xs mt-1 self-start" onClick={() => addArrayField("prices")}>+ เพิ่มราคา</button>
            </div>
            <label className="block font-semibold text-gray-800 mb-1 mt-2">เงื่อนไขการให้บริการ</label>
            <div className="flex flex-col gap-1">
              {form.conditions.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input className="flex-1 border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400" value={c} onChange={e => handleArrayChange("conditions", i, e.target.value)} placeholder="เช่น ราคานี้ไม่รวมค่าน้ำมัน" />
                  {form.conditions.length > 1 && (
                    <button type="button" className="text-red-500" onClick={() => removeArrayField("conditions", i)}><FiX /></button>
                  )}
                </div>
              ))}
              <button type="button" className="text-blue-600 text-xs mt-1 self-start" onClick={() => addArrayField("conditions")}>+ เพิ่มเงื่อนไข</button>
            </div>
            <label className="block font-semibold text-gray-800 mb-1 mt-2">สถานะ</label>
            <select className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400 transition" value={form.status} onChange={e => handleFormChange("status", e.target.value)}>
              <option value="พร้อมให้บริการ">พร้อมให้บริการ</option>
              <option value="ไม่พร้อมให้บริการ">ไม่พร้อมให้บริการ</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-4">
          <button type="button" className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold" onClick={() => window.history.back()}>ยกเลิก</button>
          <button type="submit" className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow">บันทึก</button>
        </div>
      </form>
    </div>
  );
} 