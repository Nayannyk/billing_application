import React from 'react';
import Button from './Button';

const ActionButtonZone = ({ 
  primaryAction, 
  secondaryActions = [],
  loading = false,
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {secondaryActions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant || 'outline'}
          iconName={action?.icon}
          iconPosition="left"
          onClick={action?.onClick}
          disabled={action?.disabled || loading}
          className="hidden sm:flex"
        >
          {action?.label}
        </Button>
      ))}
      {primaryAction && (
        <Button
          variant={primaryAction?.variant || 'default'}
          iconName={primaryAction?.icon}
          iconPosition="left"
          onClick={primaryAction?.onClick}
          disabled={primaryAction?.disabled}
          loading={loading}
          className="shadow-warm-sm hover:shadow-warm-md"
        >
          {primaryAction?.label}
        </Button>
      )}
    </div>
  );
};

export default ActionButtonZone;
