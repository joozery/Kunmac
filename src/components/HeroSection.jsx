import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import bgImage from '@/assets/background.jpg';

const HeroSection = ({ onBookingClick, onContactClick }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.5,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { delay: 1, duration: 0.8, ease: "easeOut" } 
    }
  };
  
  const buttonContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.3,
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } }
  };

  const scrollIndicatorVariants = {
    animate: { 
      y: [0, 10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };
  
  const heroTitle = "AlphardRent";

  return (
    <section id="หน้าแรก" className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover opacity-25 shimmer" 
          alt="Luxury Toyota Alphard van parked in a modern city setting at dusk"
          src={bgImage} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 text-shadow-gold flex flex-wrap justify-center items-center"
            initial="hidden"
            animate="visible"
          >
            {heroTitle.split("").map((char, index) => (
              <motion.span 
                key={`${char}-${index}`} 
                variants={titleVariants}
                custom={index}
                className="gold-gradient inline-block transform hover:scale-110 transition-transform duration-200 mx-px"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-yellow-100/90 mb-10 leading-relaxed"
          >
            สัมผัสประสบการณ์การเดินทาง<span className="text-yellow-400 font-semibold">เหนือระดับ</span> ด้วยบริการเช่ารถ Toyota Alphard สุดหรู
            <br className="hidden md:block" />
            พร้อม<span className="text-yellow-400 font-semibold">คนขับมืออาชีพ</span> เพื่อความสะดวกสบายและความปลอดภัยสูงสุดของคุณ
          </motion.p>
          
          <motion.div 
            variants={buttonContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div variants={buttonVariants} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onBookingClick}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black font-bold text-lg px-10 py-6 hover:from-yellow-500 hover:to-orange-600 luxury-shadow rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <Calendar className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                จองรถตอนนี้
                <ArrowRight className="w-5 h-5 ml-3 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onContactClick}
                variant="outline"
                size="lg"
                className="border-2 border-yellow-400/70 text-yellow-300 hover:bg-yellow-400/10 hover:text-yellow-100 hover:border-yellow-400 font-bold text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Phone className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                สอบถามราคา
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={scrollIndicatorVariants}
        animate="animate"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => document.getElementById('บริการ')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <a href="#บริการ" aria-label="Scroll down">
          <div className="w-10 h-16 border-2 border-yellow-400/50 rounded-full flex flex-col justify-center items-center p-1 group hover:border-yellow-400/80 transition-colors">
            <ChevronDown className="w-6 h-6 text-yellow-400/70 group-hover:text-yellow-400 transition-colors" />
            <span className="text-xs text-yellow-400/70 mt-0.5 group-hover:text-yellow-400 transition-colors">เลื่อน</span>
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;