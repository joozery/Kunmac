
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageSquare, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ContactModal = ({ isOpen, onClose, contactDetails }) => {
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `คัดลอก ${type} แล้ว!`,
      description: `${text} ถูกคัดลอกไปยังคลิปบอร์ดของคุณ`,
      className: "bg-green-500 text-white border-green-600",
    });
  };

  const contactItems = [
    {
      icon: Phone,
      label: "โทรศัพท์ 1",
      value: contactDetails.phones[0],
      href: `tel:${contactDetails.phones[0]}`,
      actionText: "โทรเลย",
      copyType: "เบอร์โทรศัพท์"
    },
    {
      icon: Phone,
      label: "โทรศัพท์ 2",
      value: contactDetails.phones[1],
      href: `tel:${contactDetails.phones[1]}`,
      actionText: "โทรเลย",
      copyType: "เบอร์โทรศัพท์"
    },
    {
      icon: MessageSquare,
      label: "LINE ID",
      value: contactDetails.line.split(' ')[0],
      subValue: `(${contactDetails.line.split(' ')[1].replace(/[()]/g, '')})`,
      href: `https://line.me/ti/p/~${contactDetails.line.split(' ')[0]}`,
      actionText: "เพิ่มเพื่อน LINE",
      copyType: "LINE ID"
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: contactDetails.whatsapp,
      href: `https://wa.me/${contactDetails.phones[0].replace(/-/g, '')}`, // Assuming WhatsApp uses the first phone number
      actionText: "แชท WhatsApp",
      copyType: "WhatsApp"
    },
  ];

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
            className="bg-gray-900/80 thai-pattern border-2 border-yellow-400/50 rounded-xl p-6 md:p-8 shadow-2xl w-full max-w-md relative glass-effect"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 text-yellow-300 hover:text-yellow-100 hover:bg-yellow-400/20"
              onClick={onClose}
            >
              <X size={24} />
            </Button>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold gold-gradient mb-2 text-shadow-gold">ติดต่อเรา</h2>
              <p className="text-yellow-200/80 text-sm">เลือกช่องทางที่สะดวกสำหรับคุณ</p>
            </div>

            <div className="space-y-4">
              {contactItems.map((item) => (
                <div key={item.label} className="bg-black/30 p-4 rounded-lg border border-yellow-400/30 hover:border-yellow-400/60 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-6 h-6 text-yellow-400" />
                      <div>
                        <p className="text-sm text-yellow-300/70">{item.label}</p>
                        <p className="text-lg font-medium text-yellow-100">
                          {item.value} {item.subValue && <span className="text-xs text-yellow-300/70">{item.subValue}</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                       <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-yellow-400 border-yellow-400/50 hover:bg-yellow-400/20 hover:text-yellow-200"
                        onClick={() => copyToClipboard(item.value, item.copyType)}
                        aria-label={`คัดลอก ${item.copyType}`}
                      >
                        <Copy size={16} />
                      </Button>
                      <Button 
                        asChild 
                        size="sm"
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 text-xs px-3 py-1 h-auto"
                      >
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.actionText}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full mt-8 text-yellow-300 border-yellow-400/50 hover:bg-yellow-400/20 hover:text-yellow-100"
            >
              ปิดหน้าต่าง
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
