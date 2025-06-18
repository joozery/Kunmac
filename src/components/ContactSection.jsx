import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: Phone,
    title: "โทรศัพท์",
    info: "02-123-4567",
    subInfo: "บริการ 24 ชั่วโมง"
  },
  {
    icon: Mail,
    title: "อีเมล",
    info: "info@alphardrent.com",
    subInfo: "ตอบกลับภายใน 1 ชั่วโมง"
  },
  {
    icon: MapPin,
    title: "ที่อยู่",
    info: "123 ถนนสุขุมวิท กรุงเทพฯ",
    subInfo: "เปิดทุกวัน 08:00-20:00"
  }
];

const ContactSection = ({ onContactClick }) => {
  return (
    <section id="ติดต่อ" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gold-gradient">
            ติดต่อเรา
          </h2>
          <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
            พร้อมให้บริการและตอบคำถามทุกข้อสงสัย
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-8 text-center luxury-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <contact.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">{contact.title}</h3>
              <p className="text-lg text-yellow-200 mb-1">{contact.info}</p>
              <p className="text-sm text-yellow-300">{contact.subInfo}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button 
            onClick={onContactClick}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg px-12 py-4 hover:from-yellow-500 hover:to-orange-600 luxury-shadow"
          >
            <Phone className="w-5 h-5 mr-2" />
            ติดต่อเราเลย
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;