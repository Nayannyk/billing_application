import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import LogoImg from '/assets/images/Logo.png';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const BillTemplate = React.forwardRef(({ customer, services, subtotal, discount, total, stylist }, ref) => (
  <div ref={ref} style={{ width: '800px', padding: '40px', background: 'white', fontFamily: 'Arial, sans-serif', color: '#1F2937' }}>
    {/* Header */}
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

    {/* Customer */}
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

    {/* Services Table */}
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

    {/* Totals */}
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

    {/* Footer */}
    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: '11px', color: '#6B7280' }}>Thank you for choosing Hairverse Unisex Salon!</p>
      <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#6B7280' }}>
        Invoice generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  </div>
));

const generateMessage = (customer, billData, formatCurrency) => {
  const header = `*Hairverse Unisex Salon Invoice*\n\n`;
  const customerInfo = `Dear ${customer?.name || 'Customer'},\n\nThank you for visiting us!\n\n`;
  
  const services = billData?.services?.map((service, index) => 
    `${index + 1}. ${service?.name}\n   Qty: ${service?.quantity} × ${formatCurrency(service?.price)} = ${formatCurrency(service?.total)}`
  )?.join('\n\n');

  const totals = `\n\n*Bill Summary:*\nSubtotal: ${formatCurrency(billData?.subtotal)}\n${billData?.discount > 0 ? `Discount: -${formatCurrency(billData?.discount)}\n` : ''}*Total Amount: ${formatCurrency(billData?.total)}*${billData?.stylist ? `\n\n*Stylist:* ${billData.stylist}` : ''}`;

  const footer = `\n\nDate: ${new Date()?.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}\n\nWe look forward to serving you again!\n\n_Hairverse Unisex Salon_\nNear Tuta Bagicha, Sadar\nNagpur - 440001\n+91 7559377506`;

  return header + customerInfo + services + totals + footer;
};

const WhatsAppModal = ({ isOpen, onClose, customer, billData }) => {
  const [customMessage, setCustomMessage] = useState('');
  const [sending, setSending] = useState(false);
  const billRef = useRef(null);

  const handleSend = async () => {
    setSending(true);
    try {
      const element = billRef.current;
      if (!element) throw new Error('Bill element not found');

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

      const pdfBlob = doc.output('blob');
      const fileName = `Hairverse_Invoice_${Date.now()}.pdf`;
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);

      const message = customMessage || generateMessage(customer, billData, formatCurrency);
      const phoneNumber = customer?.phone?.replace(/\D/g, '');
      if (phoneNumber) {
        window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
      }
    } catch (_) {
      const phoneNumber = customer?.phone?.replace(/\D/g, '');
      const message = customMessage || generateMessage(customer, billData, formatCurrency);
      if (phoneNumber) {
        window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
      }
    }
    setSending(false);
    onClose();
  };

  const handleClose = () => {
    setCustomMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-[300] bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-[310] flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-warm-xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slide-down">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-success/10">
                <Icon name="MessageCircle" size={20} color="var(--color-success)" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Send Bill via WhatsApp
                </h3>
                <p className="text-sm caption text-muted-foreground">
                  To: {customer?.name} ({customer?.phone})
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="space-y-4">
              <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-md">
                <Icon name="FileText" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm caption text-foreground">
                  A PDF invoice will be downloaded automatically. WhatsApp then opens directly with the customer's number — just attach the PDF and send.
                </p>
              </div>

              <Input
                label="Custom Message (Optional)"
                type="text"
                placeholder="Add a personal message..."
                description="Leave empty to use default message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e?.target?.value)}
              />

              <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-md">
                <Icon name="Info" size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm caption text-foreground">
                  Clicking "Send" will generate a PDF and share it via WhatsApp.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleClose}
              fullWidth
              disabled={sending}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              iconName="Send"
              iconPosition="left"
              onClick={handleSend}
              loading={sending}
              fullWidth
            >
              Send Invoice PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Hidden bill template for PDF generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <BillTemplate
          ref={billRef}
          customer={customer}
          services={billData?.services}
          subtotal={billData?.subtotal}
          discount={billData?.discount}
          total={billData?.total}
          stylist={billData?.stylist}
        />
      </div>
    </>
  );
};

export default WhatsAppModal;
