import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/lib/api';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`articles/${id}`)
      .then(res => setArticle(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-yellow-200 text-xl">Loading...</div>;
  if (!article) return <div className="min-h-screen flex items-center justify-center bg-black text-red-400 text-xl">ไม่พบบทความนี้</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-black/80 rounded-2xl shadow-lg p-0 md:p-0 flex flex-col gap-0">
          <Button asChild variant="ghost" className="mb-6 w-fit text-yellow-300 hover:bg-yellow-400/10 hover:text-yellow-500">
            <Link to="/articles"><ArrowLeft className="w-4 h-4 mr-2" /> กลับหน้ารวมบทความ</Link>
          </Button>
          {article.main_image && (
            <img src={article.main_image} alt={article.title} className="w-full h-64 object-cover rounded-xl mb-6" />
          )}
          <div className="flex items-center gap-4 text-yellow-300/80 text-sm mb-2 px-2">
            <Calendar size={16} />
            <span>{article.created_at ? new Date(article.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-100 mb-4 leading-tight px-2">{article.title}</h1>
          <div className="text-yellow-100/80 text-lg mb-6 px-2">{article.meta_desc}</div>
          <div className="prose prose-lg prose-invert text-yellow-50 max-w-none px-2 pb-8" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </main>
      <Footer />
    </div>
  );
} 