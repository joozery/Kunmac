import React from 'react';
import { motion } from 'framer-motion';
import { Car, Facebook, MessageCircle, Instagram, Phone, MapPin } from 'lucide-react';
import bgImage from '../assets/footer-bg.jpg';
import logoImage from '../assets/logo.png';

const Footer = ({ onSocialClick }) => {
  const footerSections = [
    {
      title: "บริการของเรา",
      links: [
        { label: "เช่ารายชั่วโมง", href: "#ราคา" },
        { label: "เช่ารายวัน", href: "#ราคา" },
        { label: "ทัวร์ท่องเที่ยว", href: "#บริการ" },
        { label: "รับส่งสนามบิน", href: "#บริการ" },
      ]
    },
    {
      title: "ข้อมูลบริษัท",
      links: [
        { label: "เกี่ยวกับเรา", action: onSocialClick, isButton: true },
        { label: "ข้อกำหนดการใช้งาน", action: onSocialClick, isButton: true },
        { label: "นโยบายความเป็นส่วนตัว", action: onSocialClick, isButton: true },
        { label: "ติดต่อเรา", href: "#ติดต่อ" },
      ]
    },
    {
      title: "ติดต่อเรา",
      isContact: true,
      contacts: [
        { icon: Phone, text: "083-363-8893", href: "tel:0833638893" },
        { icon: Phone, text: "091-198-8899", href: "tel:0911988899" },
        { icon: MapPin, text: "กรุงเทพฯ, ประเทศไทย", href: "#" },
      ]
    }
  ];

  const socialIcons = [
    { icon: Facebook, label: "Facebook", action: onSocialClick },
    { icon: MessageCircle, label: "Line", action: onSocialClick },
    { icon: Instagram, label: "Instagram", action: onSocialClick },
  ];

  return (
    <footer className="relative py-12 md:py-16 border-t-2 border-yellow-400/30">
      
      {/* ภาพพื้นหลัง */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* เนื้อหา */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <img 
                src={logoImage} 
                alt="AlphardRent Logo" 
                className="w-40 h-auto object-contain" 
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-yellow-200/80 text-sm leading-relaxed"
            >
              บริการเช่ารถ Toyota Alphard และรถตู้อื่นๆ สุดหรูพร้อมคนขับมืออาชีพ มอบประสบการณ์การเดินทางที่เหนือกว่า ปลอดภัย และสะดวกสบาย
            </motion.p>
          </div>

          {footerSections.map((section, index) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <p className="font-semibold text-yellow-400 text-lg mb-4 text-shadow-gold">{section.title}</p>
              {section.isContact ? (
                <ul className="space-y-3">
                  {section.contacts.map((contact, idx) => (
                    <li key={idx} className="flex items-center text-yellow-200/90 text-sm hover:text-yellow-300 transition-colors">
                      <contact.icon className="w-4 h-4 mr-3 text-yellow-400 flex-shrink-0" />
                      <a href={contact.href} className="truncate">{contact.text}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      {link.isButton ? (
                        <button onClick={link.action} className="text-yellow-200/90 text-sm hover:text-yellow-300 transition-colors hover:underline">
                          {link.label}
                        </button>
                      ) : (
                        <a href={link.href} className="text-yellow-200/90 text-sm hover:text-yellow-300 transition-colors hover:underline">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-yellow-400/20 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-yellow-300/80 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AlphardRent Thailand. สงวนลิขสิทธิ์ทุกประการ
          </p>
          <div className="flex space-x-4">
            {socialIcons.map((social) => (
              <motion.button
                key={social.label}
                onClick={social.action}
                whileHover={{ scale: 1.15, y: -2, color: 'hsl(var(--primary))' }}
                whileTap={{ scale: 0.95 }}
                className="text-yellow-300/70 hover:text-yellow-400 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;