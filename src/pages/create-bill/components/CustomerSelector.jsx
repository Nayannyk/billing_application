import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CustomerSelector = ({ selectedCustomer, onCustomerChange, onNewCustomer }) => {
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const existingCustomers = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      phone: '+1 (555) 123-4567', 
      email: 'sarah.j@email.com',
      visits: 12,
      lastVisit: '2026-01-10'
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      phone: '+1 (555) 234-5678', 
      email: 'mchen@email.com',
      visits: 8,
      lastVisit: '2026-01-12'
    },
    { 
      id: 3, 
      name: 'Emily Rodriguez', 
      phone: '+1 (555) 345-6789', 
      email: 'emily.r@email.com',
      visits: 15,
      lastVisit: '2026-01-13'
    },
    { 
      id: 4, 
      name: 'David Thompson', 
      phone: '+1 (555) 456-7890', 
      email: 'dthompson@email.com',
      visits: 5,
      lastVisit: '2026-01-08'
    },
    { 
      id: 5, 
      name: 'Jessica Martinez', 
      phone: '+1 (555) 567-8901', 
      email: 'jmartinez@email.com',
      visits: 20,
      lastVisit: '2026-01-14'
    },
  ];

  const customerOptions = existingCustomers?.map(customer => ({
    value: customer?.id?.toString(),
    label: customer?.name,
    description: `${customer?.phone} • ${customer?.visits} visits`,
  }));

  const validateNewCustomer = () => {
    const newErrors = {};
    
    if (!newCustomer?.name?.trim()) {
      newErrors.name = 'Customer name is required';
    }
    
    if (!newCustomer?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]+$/?.test(newCustomer?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (newCustomer?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(newCustomer?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSaveNewCustomer = () => {
    if (validateNewCustomer()) {
      const customer = {
        id: Date.now(),
        ...newCustomer,
        visits: 1,
        lastVisit: new Date()?.toISOString()?.split('T')?.[0],
      };
      onNewCustomer(customer);
      setNewCustomer({ name: '', phone: '', email: '' });
      setShowNewCustomerForm(false);
      setErrors({});
    }
  };

  const handleCancel = () => {
    setShowNewCustomerForm(false);
    setNewCustomer({ name: '', phone: '', email: '' });
    setErrors({});
  };

  const selectedCustomerData = existingCustomers?.find(
    c => c?.id?.toString() === selectedCustomer
  );

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-secondary/10">
            <Icon name="User" size={20} color="var(--color-secondary)" strokeWidth={2} />
          </div>
          <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Customer Information
          </h2>
        </div>
        {!showNewCustomerForm && (
          <Button
            variant="outline"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => setShowNewCustomerForm(true)}
          >
            New
          </Button>
        )}
      </div>
      {!showNewCustomerForm ? (
        <>
          <Select
            label="Select Customer"
            description="Choose from existing customers or add new"
            options={customerOptions}
            value={selectedCustomer}
            onChange={onCustomerChange}
            placeholder="Search customer..."
            searchable
            clearable
            required
          />

          {selectedCustomerData && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Phone" size={16} className="text-muted-foreground" />
                  <span className="text-foreground">{selectedCustomerData?.phone}</span>
                </div>
                {selectedCustomerData?.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">{selectedCustomerData?.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Last visit: {new Date(selectedCustomerData.lastVisit)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <Input
            label="Customer Name"
            type="text"
            placeholder="Enter full name"
            value={newCustomer?.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e?.target?.value })}
            error={errors?.name}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={newCustomer?.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e?.target?.value })}
            error={errors?.phone}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="customer@email.com"
            description="Optional - for email receipts"
            value={newCustomer?.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e?.target?.value })}
            error={errors?.email}
          />

          <div className="flex gap-3 pt-2">
            <Button
              variant="default"
              iconName="Check"
              iconPosition="left"
              onClick={handleSaveNewCustomer}
              fullWidth
            >
              Save Customer
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSelector;
