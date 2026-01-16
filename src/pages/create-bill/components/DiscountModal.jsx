import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DiscountModal = ({ isOpen, onClose, onApply, subtotal }) => {
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [error, setError] = useState('');

  const discountTypeOptions = [
    { value: 'percentage', label: 'Percentage (%)' },
    { value: 'fixed', label: 'Fixed Amount ($)' },
  ];

  const calculateDiscount = () => {
    const value = parseFloat(discountValue);
    if (isNaN(value) || value <= 0) {
      return 0;
    }

    if (discountType === 'percentage') {
      if (value > 100) return 0;
      return (subtotal * value) / 100;
    } else {
      if (value > subtotal) return subtotal;
      return value;
    }
  };

  const handleApply = () => {
    const value = parseFloat(discountValue);
    
    if (!discountValue || isNaN(value) || value <= 0) {
      setError('Please enter a valid discount value');
      return;
    }

    if (discountType === 'percentage' && value > 100) {
      setError('Percentage cannot exceed 100%');
      return;
    }

    if (discountType === 'fixed' && value > subtotal) {
      setError('Discount cannot exceed subtotal amount');
      return;
    }

    const discountAmount = calculateDiscount();
    onApply(discountAmount);
    handleClose();
  };

  const handleClose = () => {
    setDiscountValue('');
    setDiscountType('percentage');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  const previewDiscount = calculateDiscount();
  const finalAmount = subtotal - previewDiscount;

  return (
    <>
      <div 
        className="fixed inset-0 z-[300] bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-[310] flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-warm-xl w-full max-w-md animate-slide-down">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-success/10">
                <Icon name="Percent" size={20} color="var(--color-success)" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Apply Discount
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <Select
              label="Discount Type"
              options={discountTypeOptions}
              value={discountType}
              onChange={setDiscountType}
            />

            <Input
              label={`Discount ${discountType === 'percentage' ? 'Percentage' : 'Amount'}`}
              type="number"
              placeholder={discountType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
              value={discountValue}
              onChange={(e) => {
                setDiscountValue(e?.target?.value);
                setError('');
              }}
              error={error}
              min="0"
              max={discountType === 'percentage' ? '100' : subtotal?.toString()}
              step={discountType === 'percentage' ? '1' : '0.01'}
            />

            {discountValue && !error && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground data-text font-medium">
                    ${subtotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-success">Discount</span>
                  <span className="text-success data-text font-medium">
                    -${previewDiscount?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm font-body font-semibold text-foreground">
                    New Subtotal
                  </span>
                  <span className="text-base font-heading font-bold text-primary data-text">
                    ${finalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Check"
              iconPosition="left"
              onClick={handleApply}
              fullWidth
            >
              Apply Discount
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountModal;
