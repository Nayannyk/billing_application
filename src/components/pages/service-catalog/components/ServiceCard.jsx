import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onEdit, onDuplicate, onToggleStatus }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Hair Care': 'bg-primary/10 text-primary',
      'Nail Services': 'bg-secondary/10 text-secondary',
      'Facial Treatments': 'bg-accent/10 text-accent',
      'Spa Services': 'bg-success/10 text-success',
      'Makeup': 'bg-warning/10 text-warning'
    };
    return colors?.[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-md border border-border p-4 shadow-warm-sm hover:shadow-warm-md transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
            {service?.name}
          </h3>
          {service?.description && (
            <p className="caption text-muted-foreground line-clamp-2">
              {service?.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onToggleStatus(service?.id)}
          className={`flex-shrink-0 ml-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md caption font-medium transition-smooth ${
            service?.active 
              ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${service?.active ? 'bg-success' : 'bg-muted-foreground'}`} />
          {service?.active ? 'Active' : 'Inactive'}
        </button>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-3 py-1 rounded-md caption font-medium ${getCategoryColor(service?.category)}`}>
            {service?.category}
          </span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span className="caption">{service?.duration} min</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between pt-2 border-t border-border">
          <div>
            <div className="font-heading font-bold text-foreground text-xl data-text">
              ${service?.price?.toFixed(2)}
            </div>
            {service?.priceRange && (
              <div className="caption text-muted-foreground mt-0.5">
                Range: ${service?.priceRange?.min} - ${service?.priceRange?.max}
              </div>
            )}
          </div>
          {service?.taxApplicable && (
            <span className="caption text-muted-foreground">+ Tax</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(service)}
          iconName="Edit2"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDuplicate(service)}
          iconName="Copy"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Duplicate
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
