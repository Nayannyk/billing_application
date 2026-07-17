import React from 'react';
import BrandHeader from './components/BrandHeader';
import WelcomeMessage from './components/WelcomeMessage';
import LoginForm from './components/LoginForm';
import RoleInfoCard from './components/RoleInfoCard';
import SecurityBadge from './components/SecurityBadge';
import InstagramImg from '/assets/images/Instagram.png';
import WhatsAppQrImg from '/assets/images/WhatsApp QR.png';

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-xl shadow-warm-lg border border-border p-6 md:p-8 lg:p-10">
          <BrandHeader />
          <div className="max-w-md mx-auto">
            <WelcomeMessage />
            <LoginForm />
          </div>
          <RoleInfoCard />

          <div className="mt-6 p-4 bg-muted/30 rounded-md border border-border">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <a href="https://instagram.com/hairverse.salon" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 transition-smooth hover:opacity-80">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white p-1">
                  <img src={InstagramImg} alt="Instagram" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs caption text-muted-foreground">@hairverse.salon</span>
              </a>
              <a href="whatsapp://send?phone=917559377506" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 transition-smooth hover:opacity-80">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white p-1">
                  <img src={WhatsAppQrImg} alt="WhatsApp" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs caption text-muted-foreground">+91 75593 77506</span>
              </a>
            </div>
            <div className="text-center mt-3 text-xs caption text-muted-foreground">
              Near Tuta Bagicha, Azad Chowk, Sadar Nagpur - 440001
            </div>
          </div>

          <div className="mt-4">
            <SecurityBadge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
