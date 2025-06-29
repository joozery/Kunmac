import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const CarModelCard = ({ model, onBookingClick }) => {
  return (
    <div className="bg-gray-900/ backdrop-blur-lg border-2 border-yellow-400/40 rounded-2xl overflow-hidden luxury-shadow flex flex-col h-full ">
      <div className="relative h-60 overflow-hidden">
        <img    
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 shimmer" 
          alt={model.imageAlt}
          src={model.image}
          />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-xl">
          {model.name.includes("ใหม่ล่าสุด") ? "ใหม่ล่าสุด" : "ยอดนิยม"}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold gold-gradient mb-3 text-shadow-gold">{model.name}</h3>
        <p className="text-yellow-200/90 text-sm mb-4 flex-grow leading-relaxed">{model.description}</p>
        
        <div className="mb-4">
          <span className="text-yellow-400 font-semibold block mb-2 text-md">รายละเอียดราคา:</span>
          <ul className="space-y-1.5 text-xs text-yellow-300/80">
            {model.details.map((detail, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-5">
          <span className="text-yellow-400 font-semibold block mb-2 text-md">เงื่อนไข:</span>
          <ul className="space-y-1.5 text-xs text-yellow-300/80">
            {model.conditions.map((condition, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                 <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          onClick={() => onBookingClick(model)}
          className="w-full mt-auto bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl py-3 text-base"
        >
          <Eye className="w-5 h-5 mr-2" />
          ดูรายละเอียดและจอง
        </Button>
      </div>
    </div>
  );
};


const CarGallerySection = ({ carModels, onBookingClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="รถของเรา" className="py-20 bg-gradient-to-b from-gray-900/ to-black ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gold-gradient text-shadow-gold">
            รถของเรา
          </h2>
          <p className="text-xl text-yellow-200/90 max-w-2xl mx-auto">
            เลือกชมรถ Toyota Alphard และ Commuter รุ่นต่างๆ ที่พร้อมให้บริการคุณด้วยความหรูหราและสะดวกสบายสูงสุด
          </p>
        </motion.div>

        {isMobile ? (
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom-car',
              prevEl: '.swiper-button-prev-custom-car',
            }}
            pagination={{ clickable: true, el: '.swiper-pagination-custom-car' }}
            className="pb-12 relative"
          >
            {carModels.map((model, index) => (
              <SwiperSlide key={model.id || index} className="h-auto">
                <CarModelCard model={model} onBookingClick={onBookingClick} />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev-custom-car absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer p-2 bg-black/50 rounded-full text-yellow-400 hover:bg-black/70 transition-colors">
              <ChevronLeft size={28} />
            </div>
            <div className="swiper-button-next-custom-car absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer p-2 bg-black/50 rounded-full text-yellow-400 hover:bg-black/70 transition-colors">
              <ChevronRight size={28} />
            </div>
            <div className="swiper-pagination-custom-car text-center mt-4"></div>
          </Swiper>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {carModels.map((model, index) => (
               <motion.div
                key={model.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <CarModelCard model={model} onBookingClick={onBookingClick} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CarGallerySection;
