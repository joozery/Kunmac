import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/lib/api';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArticlesAll() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('articles').then(res => setArticles(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Button asChild variant="ghost" className="mb-8 w-fit text-yellow-300 hover:bg-yellow-400/10 hover:text-yellow-500">
            <Link to="/"><ArrowLeft className="w-4 h-4 mr-2" /> กลับหน้าแรก</Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-100 mb-10 leading-tight">บทความทั้งหมด</h1>
          {loading ? (
            <div className="text-yellow-200 text-lg">Loading...</div>
          ) : articles.length === 0 ? (
            <div className="text-yellow-200 text-lg">ยังไม่มีบทความ</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <Link to={`/articles/${article.id}`} key={article.id} className="bg-black/70 rounded-2xl shadow-lg border border-yellow-400/10 hover:border-yellow-400/40 transition flex flex-col overflow-hidden group">
                  {article.main_image && (
                    <img src={article.main_image} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-yellow-300/80 text-xs mb-2">
                      <Calendar size={14} />
                      <span>{article.created_at ? new Date(article.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}</span>
                    </div>
                    <h2 className="text-lg font-bold text-yellow-100 mb-2 group-hover:text-yellow-400 transition-colors">{article.title}</h2>
                    <div className="text-yellow-100/80 text-sm mb-4 line-clamp-3">{article.meta_desc}</div>
                    <span className="mt-auto text-yellow-400 font-bold text-sm group-hover:underline">อ่านต่อ &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 