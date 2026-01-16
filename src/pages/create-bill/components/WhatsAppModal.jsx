import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WhatsAppModal = ({ isOpen, onClose, customer, billData }) => {
  const [customMessage, setCustomMessage] = useState('');
  const [sending, setSending] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })?.format(amount);
  };

  const generateMessage = () => {
    const header = `*SalonBill Pro Invoice*\n\n`;
    const customerInfo = `Dear ${customer?.name || 'Customer'},\n\nThank you for visiting us!\n\n`;
    
    const services = billData?.services?.map((service, index) => 
      `${index + 1}. ${service?.name}\n   Qty: ${service?.quantity} × ${formatCurrency(service?.price)} = ${formatCurrency(service?.total)}`
    )?.join('\n\n');

    const totals = `\n\n*Bill Summary:*\nSubtotal: ${formatCurrency(billData?.subtotal)}\nTax (8.5%): ${formatCurrency(billData?.tax)}\n${billData?.discount > 0 ? `Discount: -${formatCurrency(billData?.discount)}\n` : ''}*Total Amount: ${formatCurrency(billData?.total)}*`;

    const footer = `\n\nDate: ${new Date()?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}\n\nWe look forward to serving you again!\n\n_SalonBill Pro_\n123 Beauty Avenue, Suite 100\nNew York, NY 10001\n+1 (555) 987-6543`;

    return header + customerInfo + services + totals + footer;
  };

  const handleSend = () => {
    setSending(true);
    
    // Simulate sending delay
    setTimeout(() => {
      const message = customMessage || generateMessage();
      const phoneNumber = customer?.phone?.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      setSending(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setCustomMessage('');
    onClose();
  };

  if (!isOpen) return null;

  const defaultMessage = generateMessage();

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
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Message Preview
                </label>
                <div className="p-4 bg-muted rounded-md">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-body">
                    {defaultMessage}
                  </pre>
                </div>
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
                  Clicking "Send" will open WhatsApp with the pre-filled message. You can review and edit before sending.
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
              Send via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppModal;
