import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-muted/50 rounded-md border border-border">
      <Icon name="Shield" size={18} color="var(--color-success)" strokeWidth={2} />
      <span className="text-sm caption text-muted-foreground">
        Secured with SSL encryption
      </span>
    </div>
  );
};

export default SecurityBadge;
