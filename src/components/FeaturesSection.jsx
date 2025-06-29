import React from 'react';

const FeaturesSection = () => {
  return (
    <section
      id="บริการ"
      className="py-20 relative bg-black"
    >
      {/* overlay เพื่อทำให้ bg มืดลงและตัวอักษรชัด */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="container relative z-10 mx-auto px-4 flex justify-center">
        <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400/20 bg-black flex items-center justify-center">
          <video
            src="https://res.cloudinary.com/dxgfnmjup/video/upload/v1751172704/772026563.344254_akpcej.mp4"
            controls
            autoPlay
            loop
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;