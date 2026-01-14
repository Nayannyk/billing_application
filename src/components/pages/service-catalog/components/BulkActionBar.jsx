import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onClearSelection, onBulkEdit, onBulkActivate, onBulkDeactivate }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-slide-up">
      <div className="bg-card rounded-md shadow-warm-xl border border-border p-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
            <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <div className="font-body font-semibold text-foreground">
              {selectedCount} {selectedCount === 1 ? 'service' : 'services'} selected
            </div>
            <button
              onClick={onClearSelection}
              className="caption text-primary hover:underline"
            >
              Clear selection
            </button>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Edit2"
            iconPosition="left"
            onClick={onBulkEdit}
          >
            Edit Prices
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="CheckCircle"
            iconPosition="left"
            onClick={onBulkActivate}
          >
            Activate
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="XCircle"
            iconPosition="left"
            onClick={onBulkDeactivate}
          >
            Deactivate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;
