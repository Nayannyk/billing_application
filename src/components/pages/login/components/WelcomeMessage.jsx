import React from 'react';

const WelcomeMessage = () => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-2">
        Welcome Back
      </h2>
      <p className="text-sm md:text-base caption text-muted-foreground">
        Sign in to access your salon billing dashboard
      </p>
    </div>
  );
};

export default WelcomeMessage;
