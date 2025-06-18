
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CarDetailModal = ({ isOpen, onClose, carModel, onContactClick }) => {
  if (!carModel) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-gray-900/80 thai-pattern border-2 border-yellow-400/50 rounded-xl p-6 md:p-8 shadow-2xl w-full max-w-2xl relative glass-effect max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 text-yellow-300 hover:text-yellow-100 hover:bg-yellow-400/20 z-10"
              onClick={onClose}
            >
              <X size={24} />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-auto rounded-lg overflow-hidden border border-yellow-400/30">
                <img 
                  class="w-full h-full object-cover shimmer"
                  alt={carModel.imageAlt}
                  src={carModel.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
              </div>

              <div>
                <h2 className="text-3xl font-bold gold-gradient mb-3 text-shadow-gold">{carModel.name}</h2>
                <p className="text-yellow-200/90 text-sm mb-4 leading-relaxed">{carModel.description}</p>

                {carModel.features && carModel.features.length > 0 && (
                  <div className="mb-4">
                    <p className="text-yellow-400 font-semibold mb-1">คุณสมบัติเด่น:</p>
                    <ul className="space-y-1 text-xs text-yellow-300/80 list-disc list-inside">
                      {carModel.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-yellow-400 font-semibold mb-2 text-md">รายละเอียดราคา:</p>
                <ul className="space-y-1.5 text-xs text-yellow-300/80">
                  {carModel.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-yellow-400 font-semibold mb-2 text-md">เงื่อนไขการให้บริการ:</p>
                <ul className="space-y-1.5 text-xs text-yellow-300/80">
                  {carModel.conditions.map((condition, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onContactClick}
                size="lg"
                className="flex-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600 luxury-shadow group"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                ติดต่อเพื่อจอง
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
                size="lg"
                className="flex-1 border-yellow-400/70 text-yellow-300 hover:bg-yellow-400/10 hover:text-yellow-100"
              >
                <Calendar className="w-5 h-5 mr-2" />
                ดูรุ่นอื่น / ปิด
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CarDetailModal;
