import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerForm = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredServices: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer?.name || '',
        phone: customer?.phone || '',
        email: customer?.email || '',
        preferredServices: customer?.preferredServices || ''
      });
    }
  }, [customer]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Customer name is required';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      onSave({
        ...customer,
        ...formData,
        id: customer?.id || Date.now(),
        lastVisit: customer?.lastVisit || new Date()?.toISOString(),
        totalSpent: customer?.totalSpent || 0,
        visitFrequency: customer?.visitFrequency || 'New Customer',
        serviceHistory: customer?.serviceHistory || []
      });
      setLoading(false);
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[300]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[310] flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-card rounded-md shadow-warm-xl w-full max-w-2xl animate-slide-up">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10">
                <Icon name="UserPlus" size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  {customer ? 'Edit Customer' : 'Add New Customer'}
                </h2>
                <p className="caption text-muted-foreground mt-1">
                  {customer ? 'Update customer information' : 'Enter customer details'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <Input
              label="Customer Name"
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData?.name}
              onChange={handleChange}
              error={errors?.name}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData?.phone}
                onChange={handleChange}
                error={errors?.phone}
                description="WhatsApp-compatible number"
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="customer@example.com"
                value={formData?.email}
                onChange={handleChange}
                error={errors?.email}
                required
              />
            </div>

            <Input
              label="Preferred Services"
              type="text"
              name="preferredServices"
              placeholder="e.g., Haircut, Coloring"
              value={formData?.preferredServices}
              onChange={handleChange}
              description="Optional: Services customer frequently requests"
            />

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                loading={loading}
                iconName="Save"
                iconPosition="left"
                fullWidth
              >
                {customer ? 'Update Customer' : 'Add Customer'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerForm;
