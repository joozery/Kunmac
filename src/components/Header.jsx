
import React from 'react';
import { motion } from 'framer-motion';
import { Car, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '../assets/logo.png';

const Header = ({ onContactClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = ['หน้าแรก', 'บริการ', 'รถของเรา', 'ติดต่อ'];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 glass-effect thai-pattern"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
          <motion.a 
  href="#หน้าแรก"
  className="flex items-center space-x-3"
  whileHover={{ scale: 1.05 }}
>
  <img 
    src={logoImage}
    alt="AlphardRent Logo"
    className="w-12 h-12 object-contain"
  />
  <div>
    <h1 className="text-2xl font-bold gold-gradient">AlphardRent</h1>
    <p className="text-xs text-yellow-300/80 tracking-wide">บริการเช่ารถหรูพร้อมคนขับ</p>
  </div>
</motion.a>
            
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-yellow-200 hover:text-yellow-400 transition-colors font-medium text-shadow-gold text-sm"
                  whileHover={{ scale: 1.1, textShadow: "0 0 8px rgba(255,215,0,0.7)" }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <motion.div whileHover={{ scale: 1.05 }} className="hidden md:block">
              <Button 
                onClick={onContactClick}
                className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 shadow-md hover:shadow-lg transition-all duration-300"
              >
                จองเลย
              </Button>
            </motion.div>

            <div className="md:hidden">
              <Button onClick={toggleMobileMenu} variant="ghost" size="icon" className="text-yellow-300 hover:text-yellow-400">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-20 z-40 md:hidden glass-effect thai-pattern p-4 shadow-xl rounded-b-lg"
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-yellow-200 hover:text-yellow-400 transition-colors font-medium py-2 text-center rounded-md hover:bg-yellow-400/10"
                onClick={toggleMobileMenu}
              >
                {item}
              </a>
            ))}
            <Button 
              onClick={() => { onContactClick(); toggleMobileMenu(); }}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 mt-2"
            >
              จองเลย
            </Button>
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default Header;
