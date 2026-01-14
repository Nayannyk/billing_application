import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillPreview = ({
  services,
  customer,
  subtotal,
  tax,
  discount,
  total,
  onRemoveService,
  onUpdateQuantity
}) => {
  const taxRate = 8.5; // 8.5% tax rate
  const calculatedTax = subtotal * taxRate / 100;
  const calculatedTotal = subtotal + calculatedTax - discount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-accent/10">
          <Icon name="FileText" size={20} color="var(--color-accent)" strokeWidth={2} />
        </div>
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">HairVerse Salon

        </h2>
      </div>
      {/* Invoice Header */}
      <div className="mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10">
            <Icon name="Scissors" size={24} color="var(--color-primary)" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              SalonBill Pro
            </h3>
            <p className="text-sm caption text-muted-foreground">HairVerse Salon

            </p>
          </div>
        </div>
        <div className="space-y-1 text-sm caption text-muted-foreground">
          <p>HairVerse Salon Near Tuta Bagicha</p>
          <p>Sadar Nagpur -440001</p>
          <p>Phone: +91 7559377506</p>
        </div>
      </div>
      {/* Customer Info */}
      {customer &&
      <div className="mb-6 pb-6 border-b border-border">
          <h4 className="text-sm font-body font-semibold text-foreground mb-3">
            Customer Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span className="text-foreground">{customer?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-foreground">{customer?.phone}</span>
            </div>
            {customer?.email &&
          <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{customer?.email}</span>
              </div>
          }
          </div>
        </div>
      }
      {/* Services List */}
      <div className="mb-6">
        <h4 className="text-sm font-body font-semibold text-foreground mb-4">
          Services
        </h4>
        {services?.length === 0 ?
        <div className="text-center py-8">
            <Icon name="ShoppingCart" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No services added yet
            </p>
          </div> :

        <div className="space-y-3">
            {services?.map((service, index) =>
          <div
            key={index}
            className="flex items-start justify-between gap-4 p-3 bg-muted rounded-md">

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-sm font-body font-medium text-foreground">
                      {service?.name}
                    </h5>
                    <span className="text-xs caption text-muted-foreground whitespace-nowrap">
                      {service?.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground">
                      Qty: {service?.quantity}
                    </span>
                    <span className="text-muted-foreground">×</span>
                    <span className="text-foreground data-text">
                      {formatCurrency(service?.price)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-body font-semibold text-foreground data-text whitespace-nowrap">
                    {formatCurrency(service?.total)}
                  </span>
                  <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveService(index)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10">

                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
          )}
          </div>
        }
      </div>
      {/* Totals */}
      {services?.length > 0 &&
      <div className="space-y-3 pt-6 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground data-text font-medium">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tax ({taxRate}%)</span>
            <span className="text-foreground data-text font-medium">
              {formatCurrency(calculatedTax)}
            </span>
          </div>
          {discount > 0 &&
        <div className="flex items-center justify-between text-sm">
              <span className="text-success">Discount</span>
              <span className="text-success data-text font-medium">
                -{formatCurrency(discount)}
              </span>
            </div>
        }
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-base font-body font-semibold text-foreground">
              Total Amount
            </span>
            <span className="text-xl font-heading font-bold text-primary data-text">
              {formatCurrency(calculatedTotal)}
            </span>
          </div>
        </div>
      }
      {/* Invoice Footer */}
      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-xs caption text-muted-foreground">
          Thank you for choosing SalonBill Pro!
        </p>
        <p className="text-xs caption text-muted-foreground mt-1">
          Invoice generated on {new Date()?.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </div>);

};

export default BillPreview;
