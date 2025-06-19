
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ServicesSection from '@/components/ServicesSection';
import OurWorkGallerySection from '@/components/OurWorkGallerySection';
import CarGallerySection from '@/components/CarGallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import CarDetailModal from '@/components/CarDetailModal';

import carImage1 from './assets/car1.jpg';
import carImage2 from './assets/car2.jpg';
import carImage3 from './assets/car3.jpg';
import carImage4 from './assets/car5.png';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [isCarDetailModalOpen, setIsCarDetailModalOpen] = React.useState(false);
  const [selectedCar, setSelectedCar] = React.useState(null);

  const handleBooking = (carModel) => {
    if (carModel) {
      setSelectedCar(carModel);
      setIsCarDetailModalOpen(true);
    } else {
      toast({
        title: "🚧 ฟีเจอร์นี้ยังไม่พร้อมใช้งาน",
        description: "แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มฟีเจอร์นี้ในข้อความถัดไป! 🚀",
        className: "bg-yellow-500 text-black border-yellow-600",
      });
    }
  };

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseCarDetailModal = () => {
    setIsCarDetailModalOpen(false);
    setSelectedCar(null);
  };
  
  const handleCarDetailModalContact = () => {
    setIsCarDetailModalOpen(false);
    // A slight delay to ensure the first modal is fully closed before opening the next
    setTimeout(() => {
      setIsContactModalOpen(true);
    }, 150); 
  };


  const carModels = [
    {
      id: "alphard-2023",
      name: "อัลพาร์ด ปี 2020-2023 (TOP SC)",
      image: carImage1,  // 👈 เพิ่มตรงนี้
      description: "ภายในเบาะหนังหรู ตกแต่งระดับ VVIP พร้อมเครื่องเสียงชั้นนำ และสิ่งอำนวยความสะดวกครบครัน",
      details: [
        "กรุงเทพ - ปริมณฑล: เริ่มต้น 5,500 บาท (10 ชม.)",
        "รับ-ส่ง สนามบิน – โรงแรมกรุงเทพ: 2,500 บาท (รวมน้ำมัน/ทางด่วน)",
        "กรุงเทพ - ต่างจังหวัด: เริ่มต้น 6,000 บาท (10 ชม.)"
      ],
      conditions: [
        "ราคานี้ ไม่รวมน้ำมัน, ทางด่วน, ที่จอดรถ",
        "ใช้งานได้ 10 ชั่วโมง (เกินคิด OT ชมละ 500 บาท)",
        "กรณีออกต่างจังหวัดมีค่าที่พักคนขับ 500 บาท (กรณีมีที่พักให้ไม่คิดเงิน)",
        "***ใช้งานหลายวันมีราคาพิเศษ***"
      ],
      imageAlt: "Toyota Alphard 2020-2023 TOP SC model interior and exterior",
      imagePlaceholder: "Sleek black Toyota Alphard 2020-2023 model",
      features: ["เบาะหนังแท้ปรับไฟฟ้า", "ระบบเสียง JBL", "จอ TV ขนาดใหญ่", "ประตูสไลด์ไฟฟ้า", "หลังคา Sunroof"]
    },
    {
      id: "commuter-2024",
      name: "COMMUTER 2019-2024",
      image: carImage2,  // 👈 เพิ่มตรงนี้
      description: "รถตู้โดยสารขนาดใหญ่ ตกแต่งภายในหรูหรา เหมาะสำหรับการเดินทางเป็นกลุ่ม",
      details: [
        "กรุงเทพ - ปริมณฑล: เริ่มต้น 3,500 บาท (10 ชม.)",
        "รับ-ส่ง สนามบิน – โรงแรมกรุงเทพ: 1,500 บาท (รวมน้ำมัน/ทางด่วน)",
        "กรุงเทพ - ต่างจังหวัด: เริ่มต้น 4,000 บาท (10 ชม.)"
      ],
      conditions: [
        "ราคานี้ ไม่รวมน้ำมัน, ทางด่วน, ที่จอดรถ",
        "ใช้งานได้ 10 ชั่วโมง (เกินคิด OT ชมละ 300 บาท)",
        "กรณีออกต่างจังหวัดมีค่าที่พักคนขับ 500 บาท (กรณีมีที่พักให้ไม่คิดเงิน)",
        "***ใช้งานหลายวันมีราคาพิเศษ***"
      ],
      imageAlt: "Toyota Commuter 2019-2024 model interior and exterior",
      imagePlaceholder: "Modern white Toyota Commuter 2019-2024 van",
      features: ["เบาะ VIP 9-13 ที่นั่ง", "เครื่องเสียงคาราโอเกะ", "TV พับได้", "ช่องชาร์จ USB ทุกที่นั่ง", "แอร์เย็นทั่วถึง"]
    },
    {
      id: "commuter-2018",
      name: "COMMUTER โฉมปี 2016-2018",
      image: carImage3,  // 👈 เพิ่มตรงนี้
      description: "รถตู้โดยสารยอดนิยม คุ้มค่า คุ้มราคา สำหรับทุกการเดินทาง",
      details: [
        "กรุงเทพ - ปริมณฑล: เริ่มต้น 2,500 บาท (10 ชม.)",
        "รับ-ส่ง สนามบิน – โรงแรมกรุงเทพ: 1,000 บาท (รวมน้ำมัน/ทางด่วน)",
        "กรุงเทพ - ต่างจังหวัด: เริ่มต้น 3,000 บาท (10 ชม.)"
      ],
      conditions: [
        "ราคานี้ ไม่รวมน้ำมัน, ทางด่วน, ที่จอดรถ",
        "ใช้งานได้ 10 ชั่วโมง (เกินคิด OT ชมละ 200 บาท)",
        "กรณีออกต่างจังหวัดมีค่าที่พักคนขับ 500 บาท (กรณีมีที่พักให้ไม่คิดเงิน)",
        "***ใช้งานหลายวันมีราคาพิเศษ***"
      ],
      imageAlt: "Toyota Commuter 2016-2018 model interior and exterior",
      imagePlaceholder: "Reliable Toyota Commuter 2016-2018 van",
      features: ["เบาะนั่งสบาย", "เครื่องเสียงมาตรฐาน", "แอร์เย็น", "ราคาประหยัด", "เหมาะสำหรับเดินทางทั่วไป"]
    },
    {
      id: "alphard-latest",
      name: "อัลพาร์ด ปี 2023-2024 (ใหม่ล่าสุด)",
      image: carImage4,  // 👈 เพิ่มตรงนี้
      description: "ที่สุดแห่งความหรูหราและเทคโนโลยีล้ำสมัย ประสบการณ์การเดินทางระดับ First Class",
      details: [
        "กรุงเทพ - ปริมณฑล: เริ่มต้น 7,000 บาท (10 ชม.)",
        "รับ-ส่ง สนามบิน – โรงแรมกรุงเทพ: 3,500 บาท (รวมน้ำมัน/ทางด่วน)",
        "กรุงเทพ - ต่างจังหวัด: เริ่มต้น 7,500 บาท (10 ชม.)"
      ],
      conditions: [
        "ราคานี้ ไม่รวมน้ำมัน, ทางด่วน, ที่จอดรถ",
        "ใช้งานได้ 10 ชั่วโมง (เกินคิด OT ชมละ 700 บาท)",
        "กรณีออกต่างจังหวัดมีค่าที่พักคนขับ 500 บาท (กรณีมีที่พักให้ไม่คิดเงิน)",
        "***ใช้งานหลายวันมีราคาพิเศษ***"
      ],
      imageAlt: "Latest Toyota Alphard 2023-2024 model interior and exterior",
      imagePlaceholder: "Brand new luxurious Toyota Alphard 2023-2024",
      features: ["เบาะนวดไฟฟ้า Executive Lounge", "ระบบเสียงพรีเมียม", "จอ Entertainment ขนาดใหญ่", "ระบบฟอกอากาศ NanoeX", "ดีไซน์ภายนอกโฉบเฉี่ยว"]
    }
  ];

  const contactDetails = {
    phones: ["083-363-8893", "091-198-8899"],
    line: "RoyalvanTH (083-363-8893)",
    whatsapp: "RoyalvanTH"
  };

  const portfolioImages = [
    { srcPlaceholder: "Luxury van at airport pickup service", alt: "รถ Alphard ให้บริการรับส่งลูกค้าที่สนามบิน" },
    { srcPlaceholder: "Couple posing with a luxury van for wedding", alt: "รถ Alphard สำหรับงานแต่งงานสุดหรู" },
    { srcPlaceholder: "Business executives exiting a luxury van", alt: "รถ Alphard บริการสำหรับนักธุรกิจ" },
    { srcPlaceholder: "Family enjoying a trip in a spacious van", alt: "ครอบครัวท่องเที่ยวอย่างมีความสุขด้วยรถตู้ Alphard" },
    { srcPlaceholder: "Luxury van driving through scenic route", alt: "รถ Alphard ขับผ่านเส้นทางท่องเที่ยวที่สวยงาม" },
    { srcPlaceholder: "Interior of a luxury van with comfortable seats", alt: "ภายในรถ Alphard ที่กว้างขวางและสะดวกสบาย" },
  ];


  return (
    <div className="min-h-screen bg-black  scroll-smooth">
      <Header onContactClick={handleOpenContactModal} />
      <HeroSection onBookingClick={() => handleBooking(null)} onContactClick={handleOpenContactModal} />
      <FeaturesSection />
      <CarGallerySection carModels={carModels} onBookingClick={handleBooking} />
      <OurWorkGallerySection images={portfolioImages} />
      <ContactSection onContactClick={handleOpenContactModal} />
      <Footer onSocialClick={handleOpenContactModal} />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        contactDetails={contactDetails}
      />
      {selectedCar && (
        <CarDetailModal
          isOpen={isCarDetailModalOpen}
          onClose={handleCloseCarDetailModal}
          carModel={selectedCar}
          onContactClick={handleCarDetailModalContact}
        />
      )}
      <Toaster />
    </div>
  );
}

export default App;
