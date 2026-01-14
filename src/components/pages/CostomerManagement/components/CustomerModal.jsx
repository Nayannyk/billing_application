import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerModal = ({ customer, onClose, onEdit, onCreateBill }) => {
  if (!customer) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[300]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[310] flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-card rounded-md shadow-warm-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary font-heading font-semibold text-xl">
                {customer?.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  {customer?.name}
                </h2>
                <p className="caption text-muted-foreground mt-1">
                  Customer Profile
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

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Phone" size={18} className="text-primary" />
                  <span className="caption text-muted-foreground">Phone Number</span>
                </div>
                <p className="font-body font-medium text-foreground">
                  {customer?.phone}
                </p>
              </div>

              <div className="bg-muted/50 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Mail" size={18} className="text-primary" />
                  <span className="caption text-muted-foreground">Email Address</span>
                </div>
                <p className="font-body font-medium text-foreground truncate">
                  {customer?.email}
                </p>
              </div>

              <div className="bg-muted/50 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Calendar" size={18} className="text-primary" />
                  <span className="caption text-muted-foreground">Last Visit</span>
                </div>
                <p className="font-body font-medium text-foreground">
                  {formatDate(customer?.lastVisit)}
                </p>
              </div>

              <div className="bg-muted/50 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="DollarSign" size={18} className="text-primary" />
                  <span className="caption text-muted-foreground">Total Spent</span>
                </div>
                <p className="font-body font-semibold text-foreground data-text text-lg">
                  {formatCurrency(customer?.totalSpent)}
                </p>
              </div>

              <div className="bg-muted/50 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Repeat" size={18} className="text-primary" />
                  <span className="caption text-muted-foreground">Visit Frequency</span>
                </div>
                <p className="font-body font-medium text-foreground">
                  {customer?.visitFrequency}
                </p>
              </div>

              <div className="bg-muted/50 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Star" size={18} className="text-primary" />
                  <span className="caption text-muted-foreground">Preferred Services</span>
                </div>
                <p className="font-body font-medium text-foreground">
                  {customer?.preferredServices}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="History" size={20} className="text-primary" />
                Service History
              </h3>
              <div className="space-y-3">
                {customer?.serviceHistory?.map((service) => (
                  <div
                    key={service?.id}
                    className="bg-muted/30 rounded-md p-4 border border-border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-body font-semibold text-foreground">
                          {service?.serviceName}
                        </h4>
                        <p className="caption text-muted-foreground mt-1">
                          {formatDate(service?.date)} at {formatTime(service?.date)}
                        </p>
                      </div>
                      <span className="font-body font-semibold text-foreground data-text whitespace-nowrap ml-4">
                        {formatCurrency(service?.amount)}
                      </span>
                    </div>
                    {service?.whatsappSent && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                        <Icon name="MessageCircle" size={14} className="text-success" />
                        <span className="caption text-success">
                          Bill sent via WhatsApp
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                iconName="Edit"
                iconPosition="left"
                onClick={() => {
                  onEdit(customer);
                  onClose();
                }}
                fullWidth
              >
                Edit Customer
              </Button>
              <Button
                variant="default"
                iconName="FileText"
                iconPosition="left"
                onClick={() => {
                  onCreateBill(customer);
                  onClose();
                }}
                fullWidth
              >
                Create Bill
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerModal;
