import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerCard = ({ 
  customer, 
  onEdit, 
  onViewHistory, 
  onCreateBill,
  onClick 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={() => onClick(customer)}
      className="bg-card rounded-md border border-border p-4 hover:shadow-warm-md transition-smooth cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-heading font-semibold text-lg flex-shrink-0">
            {customer?.name?.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-heading font-semibold text-foreground truncate">
              {customer?.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Icon name="Phone" size={12} className="text-muted-foreground flex-shrink-0" />
              <span className="caption text-muted-foreground whitespace-nowrap">
                {customer?.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Mail" size={14} className="text-muted-foreground flex-shrink-0" />
          <span className="text-sm font-body text-foreground truncate">
            {customer?.email}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={14} className="text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-body text-muted-foreground">
              Last Visit:
            </span>
          </div>
          <span className="text-sm font-body font-medium text-foreground whitespace-nowrap">
            {formatDate(customer?.lastVisit)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="DollarSign" size={14} className="text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-body text-muted-foreground">
              Total Spent:
            </span>
          </div>
          <span className="text-sm font-body font-semibold text-foreground data-text whitespace-nowrap">
            {formatCurrency(customer?.totalSpent)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          onClick={(e) => {
            e?.stopPropagation();
            onEdit(customer);
          }}
          fullWidth
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="History"
          iconPosition="left"
          onClick={(e) => {
            e?.stopPropagation();
            onViewHistory(customer);
          }}
          fullWidth
        >
          History
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="FileText"
          iconPosition="left"
          onClick={(e) => {
            e?.stopPropagation();
            onCreateBill(customer);
          }}
          fullWidth
        >
          Bill
        </Button>
      </div>
    </div>
  );
};

export default CustomerCard;
