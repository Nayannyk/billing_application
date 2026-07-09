import React from 'react';
import LogoImg from '/assets/images/Logo.png';

const BrandHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="w-24 h-24 rounded-xl bg-white shadow-warm-md overflow-hidden flex items-center justify-center p-2">
          <img src={LogoImg} alt="Hairverse" className="w-full h-full object-contain" />
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-2">
        Hairverse
      </h1>
      <p className="text-base md:text-lg caption text-muted-foreground">
        Unisex Salon - Near Tuta Bagicha, Sadar Nagpur
      </p>
    </div>
  );
};

export default BrandHeader;
