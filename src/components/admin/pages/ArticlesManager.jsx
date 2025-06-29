import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiFileText, FiPlus, FiEdit2, FiTrash2, FiSearch, FiImage } from "react-icons/fi";
import ArticleForm from "./ArticleForm";
import api from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

const mockArticles = [
  {
    id: 1,
    title: "บริการเช่ารถ Alphard สุดหรู",
    slug: "alphard-luxury-rental",
    metaTitle: "บริการเช่ารถ Alphard สุดหรู",
    metaDesc: "บริการเช่ารถ Alphard สุดหรู พร้อมคนขับมืออาชีพ",
    keywords: ["เช่ารถ","Alphard","รถหรู"],
    date: "2024-06-01",
    status: "เผยแพร่",
    content: "..."
  },
  {
    id: 2,
    title: "5 เหตุผลที่ควรเลือกเช่ารถ Alphard",
    slug: "5-reasons-alphard-rental",
    metaTitle: "5 เหตุผลที่ควรเลือกเช่ารถ Alphard",
    metaDesc: "เหตุผลที่ควรเลือกเช่ารถ Alphard สำหรับทุกโอกาส",
    keywords: ["เช่ารถ","Alphard","เหตุผล"],
    date: "2024-05-20",
    status: "ฉบับร่าง",
    content: "..."
  },
];

function StatusBadge({ status }) {
  const color = status === "เผยแพร่" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>{status}</span>;
}

export default function ArticlesManager() {
  const [articles, setArticles] = useState(mockArticles);
  const [showForm, setShowForm] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('articles')
      .then(res => setArticles(res.data))
      .catch(() => setArticles([]));
  }, []);

  const handleAdd = () => {
    setEditArticle(null);
    setShowForm(true);
  };
  const handleEdit = (article) => {
    setEditArticle(article);
    setShowForm(true);
  };
  const handleSave = (data) => {
    if (editArticle) {
      setArticles(arts => arts.map(a => a.id === editArticle.id ? { ...a, ...data } : a));
    } else {
      setArticles(arts => [
        { ...data, id: Date.now(), date: new Date().toISOString().slice(0,10) },
        ...arts
      ]);
    }
    setShowForm(false);
    setEditArticle(null);
  };
  const handleDelete = async (id) => {
    if (window.confirm("ยืนยันการลบบทความนี้?")) {
      try {
        await api.delete(`articles/${id}`);
        setArticles(arts => arts.filter(a => a.id !== id));
        toast({
          title: '🗑️ ลบบทความสำเร็จ',
          description: 'บทความถูกลบเรียบร้อย',
          className: 'bg-green-500 text-white',
        });
      } catch (err) {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: 'ไม่สามารถลบบทความได้',
          className: 'bg-red-500 text-white',
        });
      }
    }
  };

  // ฟังก์ชันแปลงวันที่
  function formatDate(dateStr) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  return (
    <div className="w-full px-4 md:px-8">
      <div className="flex items-center justify-between mb-8 px-8">
        <div className="flex items-center gap-3">
          <FiFileText className="text-3xl text-blue-700" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 tracking-tight">จัดการบทความ</h1>
        </div>
        <button onClick={() => navigate('/admin/articles/add')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300">
          <FiPlus />
          เพิ่มบทความ
        </button>
      </div>
      <div className="bg-white rounded-3xl shadow-xl w-full p-0 border border-blue-50 mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-8 pt-8 pb-4">
          <div className="font-bold text-xl text-blue-700">รายการบทความ</div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <FiSearch className="text-blue-400" />
            <input className="bg-transparent outline-none text-blue-700 placeholder-blue-300 w-44" placeholder="ค้นหาบทความ..." />
          </div>
        </div>
        {articles.length > 0 ? (
          <div className="overflow-x-auto px-8 pb-8">
            <table className="w-full bg-white text-base">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="py-4 px-8 text-left font-bold">รูป</th>
                  <th className="py-4 px-8 text-left font-bold">ชื่อบทความ</th>
                  <th className="py-4 px-8 text-left font-bold">สถานะ</th>
                  <th className="py-4 px-8 text-left font-bold">วันที่</th>
                  <th className="py-4 px-8 text-center font-bold">แก้ไข</th>
                  <th className="py-4 px-8 text-center font-bold">ลบ</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id} className="border-b last:border-b-0 hover:bg-blue-50/60 transition group">
                    <td className="py-4 px-8">
                      {article.main_image ? (
                        <img src={article.main_image} alt={article.title} className="w-16 h-12 object-cover rounded-lg border border-blue-100 shadow" />
                      ) : (
                        <div className="w-16 h-12 flex items-center justify-center bg-blue-50 text-blue-200 rounded-lg border border-blue-100">
                          <FiImage size={24} />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-8 text-blue-900 font-semibold max-w-xs truncate group-hover:text-blue-700">{article.title}</td>
                    <td className="py-4 px-8"><StatusBadge status={article.status} /></td>
                    <td className="py-4 px-8 text-gray-500 font-medium">{formatDate(article.created_at)}</td>
                    <td className="py-4 px-8 text-center">
                      <button onClick={() => navigate(`/admin/articles/edit/${article.id}`)} className="text-blue-500 hover:text-blue-700 p-2 rounded-full transition" title="แก้ไข">
                        <FiEdit2 size={20} />
                      </button>
                    </td>
                    <td className="py-4 px-8 text-center">
                      <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full transition" title="ลบ">
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-4">
            <FiFileText className="text-6xl" />
            <div className="text-lg font-semibold">ยังไม่มีบทความ</div>
            <button onClick={() => navigate('/admin/articles/add')} className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-lg transition-all">
              <FiPlus /> เพิ่มบทความแรก
            </button>
          </div>
        )}
      </div>
      {showForm && (
        <ArticleForm
          initial={editArticle}
          onCancel={() => { setShowForm(false); setEditArticle(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
} 