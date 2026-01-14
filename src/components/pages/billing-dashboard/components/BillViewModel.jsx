import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import BillStatusBadge from './BillStatusBadge';

const BillViewModal = ({ bill, onClose, onShare, onPrint }) => {
  if (!bill) return null;

  const serviceItems = [
    { name: 'Haircut & Styling', price: 45.00, quantity: 1 },
    { name: 'Hair Coloring', price: 85.00, quantity: 1 },
    { name: 'Deep Conditioning Treatment', price: 35.00, quantity: 1 }
  ];

  const subtotal = serviceItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[300]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-warm-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-foreground">Bill Details</h2>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-start justify-between pb-6 border-b border-border">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-heading font-semibold text-foreground">
                    {bill?.billNumber}
                  </h3>
                  <BillStatusBadge status={bill?.status} />
                </div>
                <p className="text-sm caption text-muted-foreground">{bill?.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm caption text-muted-foreground mb-1">Total Amount</p>
                <p className="text-3xl font-heading font-bold text-primary data-text">
                  ${total?.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-heading font-semibold text-foreground mb-3">
                  Customer Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{bill?.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{bill?.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">jessica.martinez@email.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-heading font-semibold text-foreground mb-3">
                  Bill Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">January 14, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">2:30 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="UserCircle" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">Sarah Johnson</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-heading font-semibold text-foreground mb-3">
                Services
              </h4>
              <div className="bg-muted rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Service
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {serviceItems?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-foreground">{item?.name}</td>
                        <td className="px-4 py-3 text-sm text-center text-foreground data-text">
                          {item?.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-foreground data-text">
                          ${item?.price?.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-foreground data-text">
                          ${(item?.price * item?.quantity)?.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground data-text">
                    ${subtotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium text-foreground data-text">
                    ${tax?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg pt-2 border-t border-border">
                  <span className="font-heading font-semibold text-foreground">Total</span>
                  <span className="font-heading font-bold text-primary data-text">
                    ${total?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Button
                variant="default"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => onShare(bill)}
                className="flex-1"
              >
                Share via WhatsApp
              </Button>
              <Button
                variant="outline"
                iconName="Printer"
                iconPosition="left"
                onClick={() => onPrint(bill)}
                className="flex-1"
              >
                Print Bill
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillViewModal;
