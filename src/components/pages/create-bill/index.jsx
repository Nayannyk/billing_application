import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PageTitle from '../../components/ui/PageTitle';
import ActionButtonZone from '../../components/ui/ActionButtonZone';
import ServiceSelector from './components/ServiceSelector';
import CustomerSelector from './components/CustomerSelector';
import BillPreview from './components/BillPreview';
import DiscountModal from './components/DiscountModal';
import WhatsAppModal from './components/WhatsAppModal';
import Icon from '../../components/AppIcon';

const CreateBill = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@salonbill.com',
    role: 'Manager',
  });

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [services, setServices] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddService = (service) => {
    setServices([...services, service]);
  };

  const handleRemoveService = (index) => {
    setServices(services?.filter((_, i) => i !== index));
  };

  const handleCustomerChange = (customerId) => {
    setSelectedCustomer(customerId);
    const customers = [
      { 
        id: 1, 
        name: 'Sarah Johnson', 
        phone: '+1 (555) 123-4567', 
        email: 'sarah.j@email.com',
      },
      { 
        id: 2, 
        name: 'Michael Chen', 
        phone: '+1 (555) 234-5678', 
        email: 'mchen@email.com',
      },
      { 
        id: 3, 
        name: 'Emily Rodriguez', 
        phone: '+1 (555) 345-6789', 
        email: 'emily.r@email.com',
      },
      { 
        id: 4, 
        name: 'David Thompson', 
        phone: '+1 (555) 456-7890', 
        email: 'dthompson@email.com',
      },
      { 
        id: 5, 
        name: 'Jessica Martinez', 
        phone: '+1 (555) 567-8901', 
        email: 'jmartinez@email.com',
      },
    ];
    const customer = customers?.find(c => c?.id?.toString() === customerId);
    setCustomerData(customer || null);
  };

  const handleNewCustomer = (customer) => {
    setCustomerData(customer);
    setSelectedCustomer(customer?.id?.toString());
  };

  const calculateSubtotal = () => {
    return services?.reduce((sum, service) => sum + service?.total, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * 8.5) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    return subtotal + tax - discount;
  };

  const handleApplyDiscount = (discountAmount) => {
    setDiscount(discountAmount);
  };

  const handleSaveDraft = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Bill saved as draft successfully!');
    }, 1000);
  };

  const handleGenerateInvoice = () => {
    if (!customerData) {
      alert('Please select a customer before generating invoice');
      return;
    }
    if (services?.length === 0) {
      alert('Please add at least one service to the bill');
      return;
    }
    
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Invoice generated successfully!');
      window.print();
    }, 1000);
  };

  const handleSendWhatsApp = () => {
    if (!customerData) {
      alert('Please select a customer before sending bill');
      return;
    }
    if (services?.length === 0) {
      alert('Please add at least one service to the bill');
      return;
    }
    setShowWhatsAppModal(true);
  };

  const billData = {
    services,
    subtotal: calculateSubtotal(),
    tax: calculateTax(),
    discount,
    total: calculateTotal(),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-20">
        <PageTitle />
        
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                New Invoice
              </h2>
              <p className="text-sm caption text-muted-foreground mt-1">
                Invoice #{new Date()?.getFullYear()}{String(new Date()?.getMonth() + 1)?.padStart(2, '0')}{String(new Date()?.getDate())?.padStart(2, '0')}-{String(Math.floor(Math.random() * 1000))?.padStart(3, '0')}
              </p>
            </div>
            
            <ActionButtonZone
              primaryAction={{
                label: 'Send via WhatsApp',
                icon: 'MessageCircle',
                variant: 'success',
                onClick: handleSendWhatsApp,
                disabled: !customerData || services?.length === 0,
              }}
              secondaryActions={[
                {
                  label: 'Save Draft',
                  icon: 'Save',
                  variant: 'outline',
                  onClick: handleSaveDraft,
                },
                {
                  label: 'Generate Invoice',
                  icon: 'FileText',
                  variant: 'default',
                  onClick: handleGenerateInvoice,
                  disabled: !customerData || services?.length === 0,
                },
              ]}
              loading={saving}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <CustomerSelector
                selectedCustomer={selectedCustomer}
                onCustomerChange={handleCustomerChange}
                onNewCustomer={handleNewCustomer}
              />
              
              <ServiceSelector
                onAddService={handleAddService}
              />

              {services?.length > 0 && (
                <div className="bg-card rounded-lg shadow-warm-md p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-md bg-success/10">
                        <Icon name="Percent" size={20} color="var(--color-success)" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-base font-body font-semibold text-foreground">
                          Discount Applied
                        </h3>
                        {discount > 0 && (
                          <p className="text-sm caption text-success">
                            -${discount?.toFixed(2)} discount active
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDiscountModal(true)}
                      className="px-4 py-2 rounded-md bg-success/10 text-success hover:bg-success/20 transition-smooth text-sm font-body font-medium"
                    >
                      {discount > 0 ? 'Edit Discount' : 'Add Discount'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <BillPreview
                services={services}
                customer={customerData}
                subtotal={calculateSubtotal()}
                tax={calculateTax()}
                discount={discount}
                total={calculateTotal()}
                onRemoveService={handleRemoveService}
              />
            </div>
          </div>
        </div>
      </main>
      <DiscountModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        onApply={handleApplyDiscount}
        subtotal={calculateSubtotal()}
      />
      <WhatsAppModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        customer={customerData}
        billData={billData}
      />
    </div>
  );
};

export default CreateBill;
