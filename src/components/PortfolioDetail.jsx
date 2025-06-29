import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import api from '@/lib/api';

export default function PortfolioDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(`portfolio/${id}`)
      .then(res => setItem(res.data))
      .catch(() => setError('ไม่พบผลงานนี้'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-yellow-200 text-xl">Loading...</div>;
  if (error || !item) return <div className="min-h-screen flex items-center justify-center bg-black text-red-400 text-xl">{error || 'ไม่พบผลงานนี้'}</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-black/80 rounded-2xl shadow-lg p-0 md:p-0 flex flex-col gap-0">
          <Button asChild variant="ghost" className="mb-6 w-fit text-yellow-300 hover:bg-yellow-400/10 hover:text-yellow-500">
            <Link to="/portfolio"><ArrowLeft className="w-4 h-4 mr-2" /> กลับหน้ารวมผลงาน</Link>
          </Button>
          {/* Gallery/Slider */}
          {item.images && item.images.length > 0 && (
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-72 md:h-96 rounded-xl mb-6 bg-black"
            >
              {item.images.map((img, idx) => (
                <SwiperSlide key={idx} className="flex items-center justify-center">
                  <img src={img} alt={item.title + ' ' + (idx+1)} className="w-full h-72 md:h-96 object-cover rounded-xl" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-100 mb-4 leading-tight px-2">{item.title}</h1>
          <div className="text-yellow-100/80 text-lg mb-6 px-2">{item.description}</div>
          {item.content && (
            <div className="prose prose-lg prose-invert text-yellow-50 max-w-none px-2 pb-8" dangerouslySetInnerHTML={{ __html: item.content }} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 