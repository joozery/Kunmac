import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import api from '@/lib/api';

const ArticleCard = ({ article, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-black/70 backdrop-blur-lg border border-yellow-400/30 rounded-2xl overflow-hidden luxury-shadow flex flex-col group"
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 shimmer"
          alt={article.title}
          src={article.main_image || "https://images.unsplash.com/photo-1595872018818-97555653a011"} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-yellow-300/80 mb-3 space-x-4">
          <div className="flex items-center space-x-1.5">
            <Tag size={14} />
            <span>{article.category || '-'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Calendar size={14} />
            <span>{article.created_at ? new Date(article.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-yellow-200 mb-3 flex-grow group-hover:text-yellow-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-yellow-200/80 text-sm mb-5 leading-relaxed">{article.meta_desc || article.excerpt || ''}</p>
        <Button asChild size="lg" className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600 luxury-shadow group w-full">
          <Link to={`/articles/${article.id}`}>
            อ่านต่อ <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    api.get('articles').then(res => setArticles(res.data)).catch(() => setArticles([]));
  }, []);
  return (
    <section id="บทความ" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gold-gradient text-shadow-gold">
            บทความและข่าวสาร
          </h2>
          <p className="text-xl text-yellow-200/90 max-w-3xl mx-auto">
            เกร็ดความรู้ ทิปส์การเดินทาง และเรื่องราวน่าสนใจเกี่ยวกับบริการรถเช่าสุดหรู
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600 luxury-shadow group max-w-md mx-auto px-8 w-auto">
            <Link to="/articles">
              ดูบทความทั้งหมด
              <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;