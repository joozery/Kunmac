import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiX, FiImage, FiUpload, FiCheckCircle, FiGlobe, FiTag, FiEdit3 } from "react-icons/fi";
import api from '@/lib/api';
import Swal from 'sweetalert2';

const mockArticle = {
  title: "",
  slug: "",
  metaTitle: "",
  metaDesc: "",
  keywords: [],
  ogImage: null,
  content: "",
  status: "ฉบับร่าง",
  mainImage: null,
};

export default function ArticleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(mockArticle);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [ogImagePreview, setOgImagePreview] = useState(null);
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    if (id) {
      api.get(`articles/${id}`).then(res => {
        const data = res.data;
        setForm({
          ...mockArticle,
          ...data,
          metaTitle: data.meta_title || "",
          metaDesc: data.meta_desc || "",
          mainImage: null, // reset file input
          ogImage: null,
          keywords: data.keywords ? data.keywords.split(',').map(k => k.trim()).filter(Boolean) : [],
        });
        if (data.main_image) setMainImagePreview(data.main_image);
        if (data.og_image) setOgImagePreview(data.og_image);
      });
    } else {
      setForm(mockArticle);
      setMainImagePreview(null);
      setOgImagePreview(null);
    }
  }, [id]);

  const handleTitleChange = (v) => {
    setForm(f => ({ ...f, title: v, slug: v ? v.toLowerCase().replace(/[^a-z0-9ก-๙\-\s]/gi, '').replace(/\s+/g, '-') : f.slug }));
  };
  const handleImage = (field, e) => {
    const file = e.target.files[0];
    setForm(f => ({ ...f, [field]: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        if (field === "mainImage") setMainImagePreview(ev.target.result);
        if (field === "ogImage") setOgImagePreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      if (field === "mainImage") setMainImagePreview(null);
      if (field === "ogImage") setOgImagePreview(null);
    }
  };
  const handleKeywordAdd = () => {
    if (keywordInput.trim() && !form.keywords.includes(keywordInput.trim())) {
      setForm(f => ({ ...f, keywords: [...f.keywords, keywordInput.trim()] }));
      setKeywordInput("");
    }
  };
  const handleKeywordRemove = (kw) => setForm(f => ({ ...f, keywords: f.keywords.filter(k => k !== kw) }));
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('slug', form.slug);
    formData.append('content', form.content);
    formData.append('meta_title', form.metaTitle);
    formData.append('meta_desc', form.metaDesc);
    formData.append('keywords', form.keywords.join(','));
    formData.append('status', form.status);
    if (form.mainImage) formData.append('mainImage', form.mainImage);
    if (form.ogImage) formData.append('ogImage', form.ogImage);
    try {
      if (id) {
        await api.put(`articles/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        await Swal.fire({
          icon: 'success',
          title: 'แก้ไขบทความสำเร็จ',
          text: 'บทความถูกอัปเดตเรียบร้อย',
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
        await api.post('articles', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        await Swal.fire({
          icon: 'success',
          title: 'เพิ่มบทความสำเร็จ',
          text: 'บทความถูกบันทึกเรียบร้อย',
          timer: 1800,
          showConfirmButton: false,
        });
      }
      navigate('/admin/articles');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถบันทึกบทความได้',
      });
    }
  };

  return (
    <div className="w-full px-4 md:px-8">
      <button type="button" className="absolute top-6 right-6 text-gray-400 hover:text-red-500 text-3xl z-10" onClick={() => navigate('/admin/articles')}>
        <FiX />
      </button>
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 mb-6 mt-4">
        <FiEdit3 className="text-blue-500 text-3xl" /> {id ? "แก้ไขบทความ" : "เพิ่มบทความ"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT: Content */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">ชื่อบทความ</label>
              <input className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:border-blue-400 transition" value={form.title} onChange={e => handleTitleChange(e.target.value)} required placeholder="ชื่อบทความ..." />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">เนื้อหา</label>
              <textarea className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:border-blue-400 transition min-h-[120px]" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="เนื้อหาบทความ..." />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">รูปภาพหลัก</label>
              <div className="flex items-center gap-4">
                {mainImagePreview ? (
                  <img src={mainImagePreview} alt="main" className="w-24 h-24 object-cover rounded-lg border border-blue-100 shadow" />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-blue-50 text-blue-200 rounded-lg border border-blue-100">
                    <FiImage size={32} />
                  </div>
                )}
                <label className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition-all">
                  <FiUpload />
                  <span>เลือกรูป</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleImage("mainImage", e)} />
                </label>
                {form.mainImage && <span className="text-green-600 text-xs flex items-center gap-1"><FiCheckCircle /> อัปโหลดแล้ว</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">สถานะ</label>
              <select className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 focus:border-blue-400 transition" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="เผยแพร่">เผยแพร่</option>
                <option value="ฉบับร่าง">ฉบับร่าง</option>
              </select>
            </div>
          </div>
          {/* RIGHT: SEO */}
          <div className="flex flex-col gap-6">
            <div className="font-bold text-lg text-blue-700 mb-2 flex items-center gap-2"><FiGlobe /> SEO</div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">Slug (URL)</label>
              <input className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:border-blue-400 transition font-mono" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="slug-url" />
              <span className="text-xs text-gray-400">URL: https://yourdomain.com/articles/<span className="text-blue-600">{form.slug || "slug-url"}</span></span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">Meta Title</label>
              <input className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:border-blue-400 transition" value={form.metaTitle} onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value }))} placeholder="Meta Title..." maxLength={60} />
              <span className="text-xs text-gray-400">{form.metaTitle.length}/60 ตัวอักษร</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">Meta Description</label>
              <textarea className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:border-blue-400 transition min-h-[60px]" value={form.metaDesc} onChange={e => setForm(f => ({ ...f, metaDesc: e.target.value }))} placeholder="Meta Description..." maxLength={160} />
              <span className="text-xs text-gray-400">{form.metaDesc.length}/160 ตัวอักษร</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">Keywords</label>
              <div className="flex gap-2 flex-wrap">
                {form.keywords.map(kw => (
                  <span key={kw} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                    <FiTag /> {kw}
                    <button type="button" className="ml-1 text-red-400 hover:text-red-600" onClick={() => handleKeywordRemove(kw)}>&times;</button>
                  </span>
                ))}
                <input
                  className="border-2 border-blue-100 rounded-lg px-2 py-1 text-gray-800 placeholder-gray-400 focus:border-blue-400 transition text-xs w-24"
                  value={keywordInput}
                  onChange={e => setKeywordInput(e.target.value)}
                  onKeyDown={e => (e.key === 'Enter' ? (e.preventDefault(), handleKeywordAdd()) : null)}
                  placeholder="เพิ่ม keyword"
                />
                <button type="button" className="text-blue-500 hover:text-blue-700 text-xs font-bold" onClick={handleKeywordAdd}>เพิ่ม</button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">OG Image (Social)</label>
              <div className="flex items-center gap-4">
                {ogImagePreview ? (
                  <img src={ogImagePreview} alt="og" className="w-20 h-20 object-cover rounded-lg border border-blue-100 shadow" />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-blue-50 text-blue-200 rounded-lg border border-blue-100">
                    <FiImage size={24} />
                  </div>
                )}
                <label className="flex items-center gap-2 cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg font-semibold shadow transition-all">
                  <FiUpload />
                  <span>เลือกรูป</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleImage("ogImage", e)} />
                </label>
              </div>
            </div>
            {/* SEO Snippet Preview */}
            <div className="bg-gray-50 border border-blue-100 rounded-lg p-4 mt-2">
              <div className="text-xs text-gray-400 mb-1">SEO Preview</div>
              <div className="text-blue-800 font-bold text-base leading-tight truncate">{form.metaTitle || form.title || "Meta Title"}</div>
              <div className="text-green-700 text-xs mb-1 truncate">https://yourdomain.com/articles/{form.slug || "slug-url"}</div>
              <div className="text-gray-700 text-sm leading-snug line-clamp-2">{form.metaDesc || "Meta Description..."}</div>
            </div>
          </div>
        </div>
        {/* ปุ่ม action */}
        <div className="flex flex-col md:flex-row gap-4 justify-end mt-6 border-t pt-8">
          <button type="button" className="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-lg shadow transition" onClick={() => navigate('/admin/articles')}>ยกเลิก</button>
          <button type="submit" className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition">บันทึก</button>
        </div>
      </form>
    </div>
  );
} 