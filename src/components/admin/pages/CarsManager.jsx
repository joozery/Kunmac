import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { FiTruck, FiPlus, FiTrash2, FiX, FiUpload, FiCheckCircle, FiImage, FiEdit2 } from "react-icons/fi";
import Swal from 'sweetalert2';

function StatusBadge({ status }) {
  const color = status === "พร้อมให้บริการ" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500";
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>{status}</span>;
}

export default function CarsManager() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    image: null,
    imagePreview: "",
    name: "",
    desc: "",
    features: [""],
    prices: [""],
    conditions: [""],
    status: "พร้อมให้บริการ",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [editCar, setEditCar] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get("cars")
      .then(res => setCars(res.data))
      .catch(() => setError("เกิดข้อผิดพลาดในการโหลดข้อมูล"))
      .finally(() => setLoading(false));
  }, []);

  // ฟังก์ชัน handle
  const handleFormChange = (field, value) => setForm(f => ({ ...f, [field]: value }));
  const handleArrayChange = (field, idx, value) => setForm(f => ({ ...f, [field]: f[field].map((v, i) => i === idx ? value : v) }));
  const addArrayField = (field) => setForm(f => ({ ...f, [field]: [...f[field], ""] }));
  const removeArrayField = (field, idx) => setForm(f => ({ ...f, [field]: f[field].filter((_, i) => i !== idx) }));
  const handleImage = e => {
    const file = e.target.files[0];
    if (file) {
      setForm(f => ({ ...f, image: file }));
      const reader = new FileReader();
      reader.onload = ev => setForm(f => ({ ...f, imagePreview: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleAddCar = e => {
    e.preventDefault();
    setCars(cars => [
      ...cars,
      {
        id: Date.now(),
        name: form.name,
        price: form.prices[0] || "-",
        status: form.status,
        image: form.imagePreview,
        desc: form.desc,
        features: form.features,
        prices: form.prices,
        conditions: form.conditions,
      },
    ]);
    setShowModal(false);
    setForm({ image: null, imagePreview: "", name: "", desc: "", features: [""], prices: [""], conditions: [""], status: "พร้อมให้บริการ" });
  };

  const handleDelete = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: 'ยืนยันการลบ',
        text: 'คุณต้องการลบรถคันนี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก',
      });
      if (!confirm.isConfirmed) return;
      await api.delete(`cars/${id}`);
      const res = await api.get("cars");
      setCars(res.data);
      Swal.fire({ icon: 'success', title: 'ลบรถสำเร็จ', timer: 1200, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'ลบไม่สำเร็จ', text: err.response?.data?.error || err.message });
    }
  };

  const handleEdit = (car) => {
    navigate(`/admin/cars/add?id=${car.id}`);
  };

  const handleEditSave = async () => {
    try {
      await api.put(`cars/${editCar.id}`, {
        ...editCar,
        ...editForm,
      });
      setCars(cars => cars.map(c => c.id === editCar.id ? { ...c, ...editForm } : c));
      setShowEditModal(false);
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="w-full px-4 md:px-8">
      <div className="flex items-center justify-between mb-8 px-2 md:px-8">
        <div className="flex items-center gap-3">
          <FiTruck className="text-3xl text-blue-700" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 tracking-tight">จัดการรถ</h1>
        </div>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-7 py-3 rounded-2xl font-bold shadow-lg text-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => navigate('/admin/cars/add')}
        >
          <FiPlus />
          เพิ่มรถ
        </button>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl w-full p-0 border border-blue-50 mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 pt-8 pb-4">
          <div className="font-bold text-xl text-blue-700">รายการรถทั้งหมด</div>
        </div>
        <div className="overflow-x-auto px-2 md:px-6 pb-8">
          {loading ? (
            <div className="py-12 text-center text-blue-400">Loading...</div>
          ) : error ? (
            <div className="py-12 text-center text-red-400">{error}</div>
          ) : (
            <table className="w-full bg-white text-base">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="py-4 px-4 text-left font-bold text-base">รูป</th>
                  <th className="py-4 px-4 text-left font-bold text-base">ชื่อรถ</th>
                  <th className="py-4 px-4 text-left font-bold text-base">ราคา/วัน</th>
                  <th className="py-4 px-4 text-left font-bold text-base">สถานะ</th>
                  <th className="py-4 px-4 text-center font-bold text-base">ลบ</th>
                  <th className="py-4 px-4 text-center font-bold text-base">แก้ไข</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car.id} className="border-b last:border-b-0 hover:bg-blue-50/80 transition group">
                    <td className="py-3 px-4">
                      {car.images && car.images.length > 0 ? (
                        <img src={car.images[0]} alt={car.name} className="w-16 h-12 object-cover rounded-lg border border-blue-100 shadow" />
                      ) : (
                        <div className="w-16 h-12 flex items-center justify-center bg-blue-50 text-blue-200 rounded-lg border border-blue-100">
                          <FiImage size={24} />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-blue-900 font-semibold max-w-xs truncate group-hover:text-blue-700 text-base">{car.name}</td>
                    <td className="py-3 px-4 text-blue-900 font-medium text-base">
                      {Array.isArray(car.prices) && car.prices.length > 0 ? car.prices[0] : "-"}
                    </td>
                    <td className="py-3 px-4"><StatusBadge status={car.status} /></td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
                        title="ลบ"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full transition"
                        title="แก้ไข"
                        onClick={() => handleEdit(car)}
                      >
                        <FiEdit2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showModal && (
        <div className="w-full px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 mb-6 mt-4">
            <FiTruck className="text-blue-500 text-3xl" /> เพิ่มรถใหม่
          </h2>
          <form
            className="flex flex-col gap-8"
            onSubmit={handleAddCar}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* คอลัมน์ 1: อัปโหลดรูป */}
              <div className="flex flex-col gap-2">
                <label className="block font-semibold text-gray-800 mb-1">รูปภาพรถ</label>
                <label className="flex items-center gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg w-fit">
                  <FiUpload />
                  <span>{form.image ? (form.image.name || "เลือกรูปใหม่") : "เลือกไฟล์"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                </label>
                {form.imagePreview && (
                  <img src={form.imagePreview} alt="preview" className="w-32 h-24 object-cover rounded-lg border border-blue-100 shadow mt-2" />
                )}
                {form.image && <span className="text-green-600 text-xs flex items-center gap-1 mt-1"><FiCheckCircle /> อัปโหลดแล้ว</span>}
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
              <button type="button" className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold" onClick={() => setShowModal(false)}>ยกเลิก</button>
              <button type="submit" className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow">บันทึก</button>
            </div>
          </form>
        </div>
      )}
      {/* Modal Confirm Delete */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xs flex flex-col items-center animate-fadeIn">
            <FiTrash2 className="text-4xl text-red-500 mb-4" />
            <div className="font-bold text-lg text-gray-800 mb-2">ยืนยันการลบรถ</div>
            <div className="text-gray-500 mb-6 text-center">คุณต้องการลบรถคันนี้ออกจากระบบหรือไม่?</div>
            <div className="flex gap-4 w-full justify-center">
              <button className="px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold" onClick={() => setDeleteId(null)}>ยกเลิก</button>
              <button className="px-6 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold shadow" onClick={() => handleDelete(deleteId)}>ลบ</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal แก้ไขข้อมูลรถ */}
      {showEditModal && editForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">แก้ไขข้อมูลรถ</h2>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              value={editForm.name}
              onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
              placeholder="ชื่อรถ"
            />
            <select
              className="w-full border rounded px-3 py-2 mb-3"
              value={editForm.status}
              onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}
            >
              <option value="พร้อมให้บริการ">พร้อมให้บริการ</option>
              <option value="ไม่พร้อมให้บริการ">ไม่พร้อมให้บริการ</option>
            </select>
            <div className="flex gap-2 justify-end mt-4">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded bg-gray-200">ยกเลิก</button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 