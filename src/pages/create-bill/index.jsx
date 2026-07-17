import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Header from '../../components/ui/Header';
import PageTitle from '../../components/ui/PageTitle';
import ActionButtonZone from '../../components/ui/ActionButtonZone';
import ServiceSelector from './components/ServiceSelector';
import CustomerSelector from './components/CustomerSelector';
import BillPreview from './components/BillPreview';
import DiscountModal from './components/DiscountModal';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import { useCustomers } from '../../context/CustomerContext';
import { useBills } from '../../context/BillContext';
import LogoImg from '/assets/images/Logo.png';

const STYLIST_OPTIONS = [
  { value: 'Sudama Mankar', label: 'Sudama Mankar' },
  { value: 'Sonam Mankar', label: 'Sonam Mankar' },
  { value: 'Aayush Sen', label: 'Aayush Sen' },
  { value: 'Hampi Marathe', label: 'Hampi Marathe' },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const BillTemplate = React.forwardRef(({ customer, services, subtotal, discount, total, stylist }, ref) => (
  <div ref={ref} style={{ width: '800px', padding: '40px', background: 'white', fontFamily: 'Arial, sans-serif', color: '#1F2937' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #E5E7EB' }}>
      <img src={LogoImg} alt="Hairverse" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
      <div>
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, fontFamily: 'Arial, sans-serif' }}>Hairverse</h3>
        <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>Unisex Salon</p>
      </div>
    </div>
    <div style={{ marginBottom: '16px', fontSize: '12px', color: '#6B7280', lineHeight: '1.6' }}>
      <p style={{ margin: 0 }}>Near Tuta Bagicha, Sadar</p>
      <p style={{ margin: 0 }}>Sadar Nagpur -440001</p>
      <p style={{ margin: 0 }}>Phone: +91 7559377506</p>
    </div>
    {customer && (
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #E5E7EB' }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, fontFamily: 'Arial, sans-serif' }}>Customer Details</h4>
        <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
          <p style={{ margin: 0 }}>{customer.name}</p>
          <p style={{ margin: 0 }}>{customer.phone}</p>
          {customer.email && <p style={{ margin: 0 }}>{customer.email}</p>}
          {stylist && <p style={{ margin: 0, fontWeight: 600 }}>Stylist: {stylist}</p>}
        </div>
      </div>
    )}
    <div style={{ marginBottom: '24px' }}>
      <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, fontFamily: 'Arial, sans-serif' }}>Services</h4>
      {(!services || services.length === 0) ? (
        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>No services added yet</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E7EB', fontSize: '12px', color: '#6B7280' }}>
              <th style={{ textAlign: 'left', paddingBottom: '8px' }}>Service</th>
              <th style={{ textAlign: 'center', paddingBottom: '8px' }}>Qty</th>
              <th style={{ textAlign: 'right', paddingBottom: '8px' }}>Price</th>
              <th style={{ textAlign: 'right', paddingBottom: '8px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', fontSize: '13px' }}>
                <td style={{ padding: '10px 0' }}>
                  <div style={{ fontWeight: 500 }}>{s.name}</div>
                  {s.duration && <div style={{ fontSize: '11px', color: '#6B7280' }}>{s.duration}</div>}
                </td>
                <td style={{ textAlign: 'center', padding: '10px 0', color: '#6B7280' }}>{s.quantity}</td>
                <td style={{ textAlign: 'right', padding: '10px 0', fontFamily: 'Courier New, monospace' }}>{formatCurrency(s.price)}</td>
                <td style={{ textAlign: 'right', padding: '10px 0', fontWeight: 600, fontFamily: 'Courier New, monospace' }}>{formatCurrency(s.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    {services && services.length > 0 && (
      <div style={{ paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
          <span style={{ color: '#6B7280' }}>Subtotal</span>
          <span style={{ fontWeight: 500, fontFamily: 'Courier New, monospace' }}>{formatCurrency(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ color: '#059669' }}>Discount</span>
            <span style={{ color: '#059669', fontFamily: 'Courier New, monospace' }}>-{formatCurrency(discount)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>Total Amount</span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#0F766E', fontFamily: 'Courier New, monospace' }}>{formatCurrency(total)}</span>
        </div>
      </div>
    )}
    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: '11px', color: '#6B7280' }}>Thank you for choosing Hairverse Unisex Salon!</p>
      <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#6B7280' }}>
        Invoice generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  </div>
));

const CreateBill = () => {
  const navigate = useNavigate();
  const { customers } = useCustomers();
  const { addBill } = useBills();
  const billRef = useRef(null);
  const [user] = useState({
    name: 'Sudama Mankar',
    email: 'sudama@hairverse.in',
    role: 'Manager',
  });

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
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
    const found = customers?.find(c => c?.id?.toString() === customerId);
    setCustomerData(found || null);
  };

  const handleNewCustomer = (customer) => {
    setCustomerData(customer);
    setSelectedCustomer(customer?.id?.toString());
  };

  const calculateSubtotal = () => {
    return services?.reduce((sum, service) => sum + service?.total, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - discount;
  };

  const handleApplyDiscount = (discountAmount, percentage) => {
    setDiscount(discountAmount);
    setDiscountPercentage(percentage || 0);
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
      addBill(billData);
      setSaving(false);
      alert('Invoice generated successfully!');
      window.print();
    }, 1000);
  };

  const handleSendWhatsApp = async () => {
    if (!customerData) {
      alert('Please select a customer before sending bill');
      return;
    }
    if (services?.length === 0) {
      alert('Please add at least one service to the bill');
      return;
    }

    addBill(billData);
    setSaving(true);

    try {
      const element = billRef.current;
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          logging: false,
        });
        const imgData = canvas.toDataURL('image/png');
        const imgW = 190;
        const imgH = (canvas.height / canvas.width) * imgW;
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.addImage(imgData, 'PNG', 10, 10, imgW, imgH);
        doc.save(`Hairverse_Invoice_${Date.now()}.pdf`);
      }
    } catch (_) {}

    const servicesList = services?.map((s, i) =>
      `${i + 1}. ${s?.name}\n   Qty: ${s?.quantity} x ₹${s?.price?.toFixed(2)} = ₹${s?.total?.toFixed(2)}`
    )?.join('\n\n');

    const totals = `\n\n*Bill Summary:*\nSubtotal: ₹${billData?.subtotal?.toFixed(2)}\n${billData?.discount > 0 ? `Discount: -₹${billData?.discount?.toFixed(2)}\n` : ''}*Total Amount: ₹${billData?.total?.toFixed(2)}*${billData?.stylist ? `\n\n*Stylist:* ${billData.stylist}` : ''}`;

    const message = `*Hairverse Unisex Salon Invoice*\n\nDear ${customerData?.name || 'Customer'},\n\nThank you for visiting us!\n\n${servicesList}${totals}\n\nDate: ${new Date()?.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}\n\nPlease find the invoice PDF attached.\n\nWe look forward to serving you again!\n\n_Hairverse Unisex Salon_\nNear Tuta Bagicha, Sadar\nNagpur - 440001\n+91 7559377506`;

    const phone = customerData?.phone?.replace(/\D/g, '');
    if (phone) {
      window.open(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank');
    }

    setSaving(false);
  };

  const billData = {
    services,
    subtotal: calculateSubtotal(),
    tax: 0,
    discount,
    total: calculateTotal(),
    customer: customerData,
    stylist: selectedStylist,
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

              <div className="bg-card rounded-lg shadow-warm-md p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                    <Icon name="Scissors" size={20} color="var(--color-primary)" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-body font-semibold text-foreground">
                    Stylist
                  </h3>
                </div>
                <Select
                  options={STYLIST_OPTIONS}
                  value={selectedStylist}
                  onChange={setSelectedStylist}
                  placeholder="Select stylist"
                  searchable
                />
              </div>
              
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
                            -₹{discount?.toFixed(2)} discount active
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
                discount={discount}
                discountPercentage={discountPercentage}
                total={calculateTotal()}
                stylist={selectedStylist}
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
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <BillTemplate
          ref={billRef}
          customer={customerData}
          services={services}
          subtotal={calculateSubtotal()}
          discount={discount}
          total={calculateTotal()}
          stylist={selectedStylist}
        />
      </div>
    </div>
  );
};

export default CreateBill;
