import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: "รายชั่วโมง",
    price: "1,500",
    unit: "บาท/ชั่วโมง",
    features: [
      "ขั้นต่ำ 3 ชั่วโมง",
      "คนขับมืออาชีพ",
      "น้ำมันและค่าทางด่วน",
      "ประกันภัยครอบคลุม"
    ],
    popular: false
  },
  {
    title: "รายวัน",
    price: "8,500",
    unit: "บาท/วัน",
    features: [
      "บริการ 10 ชั่วโมง",
      "คนขับมืออาชีพ",
      "น้ำมันและค่าทางด่วน",
      "ประกันภัยครอบคลุม",
      "น้ำดื่มฟรี"
    ],
    popular: true
  },
  {
    title: "ท่องเที่ยว",
    price: "12,000",
    unit: "บาท/วัน",
    features: [
      "บริการเต็มวัน",
      "คนขับไกด์ท้องถิ่น",
      "น้ำมันและค่าทางด่วน",
      "ประกันภัยครอบคลุม",
      "อาหารว่างและน้ำดื่ม"
    ],
    popular: false
  }
];

const ServicesSection = ({ onBookingClick }) => {
  return (
    <section id="ราคา" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gold-gradient">
            บริการของเรา
          </h2>
          <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
            เลือกแพ็คเกจที่เหมาะสมกับความต้องการของคุณ
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`relative glass-effect rounded-xl p-8 text-center luxury-shadow ${
                service.popular ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    ยอดนิยม
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">{service.title}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold gold-gradient">{service.price}</span>
                <span className="text-yellow-200 ml-2">{service.unit}</span>
              </div>
              
              <ul className="space-y-3 mb-8 text-left">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-yellow-200">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={onBookingClick}
                className={`w-full font-bold ${
                  service.popular 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600' 
                    : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                }`}
                variant={service.popular ? 'default' : 'outline'}
              >
                เลือกแพ็คเกจนี้
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;