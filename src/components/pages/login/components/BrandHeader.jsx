import React from 'react';
import Icon from '../../../components/AppIcon';

const BrandHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 shadow-warm-md">
          <Icon name="Scissors" size={36} color="var(--color-primary)" strokeWidth={2.5} />
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-2">
        SalonBill Pro
      </h1>
      <p className="text-base md:text-lg caption text-muted-foreground">
        Professional Salon Billing Management
      </p>
    </div>
  );
};

export default BrandHeader;
