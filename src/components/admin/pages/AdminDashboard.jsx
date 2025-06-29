import React, { useState } from 'react';
import AdminSidebar from '../AdminSidebar';

const initialCars = [
  { id: 1, name: 'Alphard 2023', price: '7,000', status: 'พร้อมให้บริการ' },
  { id: 2, name: 'Commuter 2024', price: '3,500', status: 'พร้อมให้บริการ' },
];
const initialArticles = [
  { id: 1, title: 'บริการเช่ารถ Alphard สุดหรู', date: '2024-06-01' },
  { id: 2, title: '5 เหตุผลที่ควรเลือกเช่ารถ Alphard', date: '2024-05-20' },
];

export default function AdminDashboard() {
  const [menu, setMenu] = useState('cars');
  const [cars, setCars] = useState(initialCars);
  const [articles, setArticles] = useState(initialArticles);
  const [searchCar, setSearchCar] = useState('');
  const [searchArticle, setSearchArticle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('car');
  const [form, setForm] = useState({ name: '', price: '', status: '', title: '', date: '' });

  // ฟังก์ชันเพิ่มข้อมูล
  const handleAdd = () => {
    if (modalType === 'car') {
      setCars([...cars, { id: Date.now(), name: form.name, price: form.price, status: form.status }]);
    } else {
      setArticles([...articles, { id: Date.now(), title: form.title, date: form.date }]);
    }
    setShowModal(false);
    setForm({ name: '', price: '', status: '', title: '', date: '' });
  };

  // ฟังก์ชันลบข้อมูล
  const handleDelete = (id, type) => {
    if (type === 'car') setCars(cars.filter(car => car.id !== id));
    else setArticles(articles.filter(article => article.id !== id));
  };

  // ฟิลเตอร์ข้อมูล
  const filteredCars = cars.filter(car => car.name.toLowerCase().includes(searchCar.toLowerCase()));
  const filteredArticles = articles.filter(article => article.title.toLowerCase().includes(searchArticle.toLowerCase()));

  return (
    <div className="h-screen w-full flex bg-gray-50">
      <AdminSidebar selected={menu} onSelect={label => {
        if (label === 'Dashboard' || label === 'To-do List' || label === 'Goals' || label === 'Projects' || label === 'Budgets' || label === 'Templates' || label === 'Reports') setMenu('cars');
        else if (label === 'All' || label === 'Assigned to me' || label === 'Shared' || label === 'Private' || label === 'Add team member') setMenu('articles');
      }} />
      <main className="flex-1 p-8 overflow-y-auto">
        {menu === 'cars' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 20 }}>รายการรถ</h3>
              <button style={{ background: '#FFD700', color: '#18181b', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setShowModal(true); setModalType('car'); }}>+ เพิ่มรถ</button>
            </div>
            <input placeholder="ค้นหารถ..." value={searchCar} onChange={e => setSearchCar(e.target.value)} style={{ marginBottom: 12, padding: 6, borderRadius: 4, border: '1px solid #FFD700', width: 200 }} />
            <table style={{ width: '100%', background: '#23232a', borderRadius: 8, overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#FFD700', color: '#18181b' }}>
                  <th style={{ padding: 8 }}>ชื่อรถ</th>
                  <th style={{ padding: 8 }}>ราคา/วัน</th>
                  <th style={{ padding: 8 }}>สถานะ</th>
                  <th style={{ padding: 8 }}>ลบ</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map(car => (
                  <tr key={car.id}>
                    <td style={{ padding: 8 }}>{car.name}</td>
                    <td style={{ padding: 8 }}>{car.price}</td>
                    <td style={{ padding: 8 }}>{car.status}</td>
                    <td style={{ padding: 8 }}><button onClick={() => handleDelete(car.id, 'car')} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>ลบ</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {menu === 'articles' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 20 }}>รายการบทความ</h3>
              <button style={{ background: '#FFD700', color: '#18181b', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setShowModal(true); setModalType('article'); }}>+ เพิ่มบทความ</button>
            </div>
            <input placeholder="ค้นหาบทความ..." value={searchArticle} onChange={e => setSearchArticle(e.target.value)} style={{ marginBottom: 12, padding: 6, borderRadius: 4, border: '1px solid #FFD700', width: 200 }} />
            <table style={{ width: '100%', background: '#23232a', borderRadius: 8, overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#FFD700', color: '#18181b' }}>
                  <th style={{ padding: 8 }}>ชื่อบทความ</th>
                  <th style={{ padding: 8 }}>วันที่</th>
                  <th style={{ padding: 8 }}>ลบ</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map(article => (
                  <tr key={article.id}>
                    <td style={{ padding: 8 }}>{article.title}</td>
                    <td style={{ padding: 8 }}>{article.date}</td>
                    <td style={{ padding: 8 }}><button onClick={() => handleDelete(article.id, 'article')} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>ลบ</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Modal ฟอร์มเพิ่มข้อมูล (mockup) */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#23232a', padding: 32, borderRadius: 8, minWidth: 320, color: '#fff', position: 'relative' }}>
              <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 8, right: 12, background: 'none', border: 'none', color: '#FFD700', fontSize: 22, cursor: 'pointer' }}>×</button>
              <h4 style={{ marginBottom: 16 }}>{modalType === 'car' ? 'เพิ่มรถ' : 'เพิ่มบทความ'}</h4>
              {modalType === 'car' ? (
                <>
                  <input placeholder="ชื่อรถ" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ marginBottom: 10, width: '100%', padding: 6, borderRadius: 4, border: '1px solid #FFD700' }} />
                  <input placeholder="ราคา/วัน" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} style={{ marginBottom: 10, width: '100%', padding: 6, borderRadius: 4, border: '1px solid #FFD700' }} />
                  <input placeholder="สถานะ" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} style={{ marginBottom: 10, width: '100%', padding: 6, borderRadius: 4, border: '1px solid #FFD700' }} />
                </>
              ) : (
                <>
                  <input placeholder="ชื่อบทความ" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={{ marginBottom: 10, width: '100%', padding: 6, borderRadius: 4, border: '1px solid #FFD700' }} />
                  <input placeholder="วันที่ (YYYY-MM-DD)" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ marginBottom: 10, width: '100%', padding: 6, borderRadius: 4, border: '1px solid #FFD700' }} />
                </>
              )}
              <button onClick={handleAdd} style={{ background: '#FFD700', color: '#18181b', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>บันทึก</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 