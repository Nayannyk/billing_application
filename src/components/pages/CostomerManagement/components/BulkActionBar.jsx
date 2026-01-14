import React from 'react';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onExport, onSendPromo, onClearSelection }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-slide-up">
      <div className="bg-card rounded-md shadow-warm-xl border border-border px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-sm">
            {selectedCount}
          </div>
          <span className="font-body font-medium text-foreground">
            {selectedCount === 1 ? 'customer' : 'customers'} selected
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={onSendPromo}
          >
            Send Promo
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearSelection}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;
