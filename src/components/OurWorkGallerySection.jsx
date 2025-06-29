import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';

const OurWorkGallerySection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get('portfolio')
      .then(res => setPortfolio(res.data))
      .catch(() => setError('เกิดข้อผิดพลาดในการโหลดข้อมูล'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  const navigateLightbox = (direction) => {
    setSelectedImageIndex(prevIndex => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return portfolio.length - 1;
      if (newIndex >= portfolio.length) return 0;
      return newIndex;
    });
  };

  if (loading) return <div className="min-h-[300px] flex items-center justify-center text-yellow-200 text-xl">Loading...</div>;
  if (error) return <div className="min-h-[300px] flex items-center justify-center text-red-400 text-xl">{error}</div>;
  if (!portfolio.length) return null;

  return (
    <section id="ผลงานของเรา" className="py-20 bg-gradient-to-b from-black to-black-900 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gold-gradient text-shadow-gold">
            ผลงานของเรา
          </h2>
          <p className="text-xl text-yellow-200/90 max-w-3xl mx-auto">
            ชมภาพความประทับใจจากลูกค้าที่เลือกใช้บริการเช่ารถ Alphard พร้อมคนขับกับเรา
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect={isMobile ? 'slide' : 'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={isMobile ? 1.2 : 2.5}
            spaceBetween={isMobile ? 15 : 30}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next-portfolio',
              prevEl: '.swiper-button-prev-portfolio',
            }}
            pagination={{ clickable: true, el: '.swiper-pagination-portfolio' }}
            className="pb-16"
          >
            {portfolio.map((item, index) => (
              <SwiperSlide key={item.id} className="h-auto group">
                <div 
                  className="relative aspect-[16/10] rounded-xl overflow-hidden border-2 border-yellow-400/30 shadow-xl cursor-pointer glass-effect"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 shimmer"
                    alt={item.title}
                    src={item.images && item.images.length > 0 ? item.images[0] : "https://images.unsplash.com/photo-1595872018818-97555653a011"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="w-12 h-12 text-yellow-300 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="text-base font-bold text-yellow-200/95 truncate mb-0.5 drop-shadow">{item.title}</div>
                    <p className="text-xs text-yellow-200/90 truncate">{item.description}</p>
                  </div>
                </div>
                {item.id && (
                  <div className="flex justify-center mt-2">
                    <button
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition"
                      onClick={e => { e.stopPropagation(); navigate(`/portfolio/${item.id}`); }}
                    >
                      อ่านเพิ่มเติม
                    </button>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev-portfolio absolute left-0 md:-left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer p-3 bg-black/60 rounded-full text-yellow-400 hover:bg-black/80 transition-colors">
            <ChevronLeft size={isMobile ? 24 : 32} />
          </div>
          <div className="swiper-button-next-portfolio absolute right-0 md:-right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer p-3 bg-black/60 rounded-full text-yellow-400 hover:bg-black/80 transition-colors">
            <ChevronRight size={isMobile ? 24 : 32} />
          </div>
          <div className="swiper-pagination-portfolio text-center mt-6"></div>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxOpen && portfolio[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                alt={portfolio[selectedImageIndex].title}
                src={portfolio[selectedImageIndex].images && portfolio[selectedImageIndex].images.length > 0 ? portfolio[selectedImageIndex].images[0] : "https://images.unsplash.com/photo-1595872018818-97555653a011"} />
              {portfolio[selectedImageIndex].title && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-yellow-200 text-lg font-bold px-6 py-2 rounded-md mb-2 drop-shadow-lg">
                  {portfolio[selectedImageIndex].title}
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X size={28} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                onClick={() => navigateLightbox(-1)}
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                onClick={() => navigateLightbox(1)}
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-2 rounded-md">
                {portfolio[selectedImageIndex].title} ({selectedImageIndex + 1} / {portfolio.length})
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurWorkGallerySection;

