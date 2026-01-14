import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleInfoCard = () => {
  const roles = [
    {
      icon: 'Crown',
      title: 'Owner',
      description: 'Full system access and management',
      color: 'var(--color-accent)'
    },
    {
      icon: 'UserCog',
      title: 'Manager',
      description: 'Operations and staff oversight',
      color: 'var(--color-secondary)'
    },
    {
      icon: 'User',
      title: 'Staff',
      description: 'Billing and customer service',
      color: 'var(--color-primary)'
    }
  ];

  return (
    <div className="mt-8 p-4 md:p-6 bg-card rounded-md border border-border">
      <h3 className="text-sm md:text-base font-heading font-semibold text-foreground mb-4">
        Role-Based Access
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {roles?.map((role, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-muted/30 rounded-md transition-smooth hover:bg-muted/50"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-background flex-shrink-0">
              <Icon name={role?.icon} size={20} color={role?.color} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-body font-medium text-foreground">
                {role?.title}
              </div>
              <div className="text-xs caption text-muted-foreground mt-1 line-clamp-2">
                {role?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleInfoCard;
