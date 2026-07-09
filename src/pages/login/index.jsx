import React from 'react';
import BrandHeader from './components/BrandHeader';
import WelcomeMessage from './components/WelcomeMessage';
import LoginForm from './components/LoginForm';
import RoleInfoCard from './components/RoleInfoCard';
import SecurityBadge from './components/SecurityBadge';

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
          <div className="mt-6">
            <SecurityBadge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
