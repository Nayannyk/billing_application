import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import BillStatusBadge from './BillStatusBadge';

const BillCard = ({ bill, onView, onEdit, onShare, onPrint }) => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-warm-sm border border-border hover:shadow-warm-md transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-heading font-semibold text-foreground">{bill?.billNumber}</h3>
            <BillStatusBadge status={bill?.status} />
          </div>
          <p className="text-sm caption text-muted-foreground">{bill?.date}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-heading font-semibold text-foreground data-text">
            ${bill?.amount}
          </p>
        </div>
      </div>
      <div className="space-y-2 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="User" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{bill?.customerName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Phone" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{bill?.customerPhone}</span>
        </div>
        <div className="flex items-start gap-2">
          <Icon name="Scissors" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <span className="text-sm text-foreground">{bill?.services}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          onClick={() => onView(bill)}
          className="hover:bg-primary/10 hover:text-primary hover:border-primary"
        />
        <Button
          variant="outline"
          size="sm"
          iconName="Edit"
          onClick={() => onEdit(bill)}
          className="hover:bg-secondary/10 hover:text-secondary hover:border-secondary"
        />
        <Button
          variant="outline"
          size="sm"
          iconName="MessageCircle"
          onClick={() => onShare(bill)}
          className="hover:bg-success/10 hover:text-success hover:border-success"
        />
        <Button
          variant="outline"
          size="sm"
          iconName="Printer"
          onClick={() => onPrint(bill)}
          className="hover:bg-accent/10 hover:text-accent hover:border-accent"
        />
      </div>
    </div>
  );
};

export default BillCard;
