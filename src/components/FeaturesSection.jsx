import React from 'react';
import { motion } from 'framer-motion';
import { Car, Users, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Car,
    title: "รถหรูระดับพรีเมียม",
    description: "Toyota Alphard รุ่นใหม่ล่าสุด พร้อมสิ่งอำนวยความสะดวกครบครัน"
  },
  {
    icon: Users,
    title: "คนขับมืออาชีพ",
    description: "คนขับที่ผ่านการอบรมและมีประสบการณ์สูง ใส่ใจความปลอดภัย"
  },
  {
    icon: Shield,
    title: "ประกันภัยครอบคลุม",
    description: "ประกันภัยเต็มวงเงิน ให้ความมั่นใจในทุกการเดินทาง"
  },
  {
    icon: Clock,
    title: "บริการ 24/7",
    description: "พร้อมให้บริการตลอด 24 ชั่วโมง ทุกวันไม่มีวันหยุด"
  }
];

const FeaturesSection = () => {
  return (
    <section id="บริการ" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gold-gradient">
            ทำไมต้องเลือกเรา?
          </h2>
          <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
            เราให้บริการที่เหนือระดับด้วยมาตรฐานสากลและความใส่ใจในทุกรายละเอียด
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-effect rounded-xl p-6 text-center luxury-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">{feature.title}</h3>
              <p className="text-yellow-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;