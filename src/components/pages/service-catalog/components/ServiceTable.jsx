import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceTable = ({ 
  services, 
  onEdit, 
  onDuplicate, 
  onToggleStatus,
  onBulkSelect,
  selectedServices 
}) => {
  const isSelected = (serviceId) => selectedServices?.includes(serviceId);
  const allSelected = services?.length > 0 && selectedServices?.length === services?.length;

  const handleSelectAll = () => {
    if (allSelected) {
      onBulkSelect([]);
    } else {
      onBulkSelect(services?.map(s => s?.id));
    }
  };

  const handleSelectService = (serviceId) => {
    if (isSelected(serviceId)) {
      onBulkSelect(selectedServices?.filter(id => id !== serviceId));
    } else {
      onBulkSelect([...selectedServices, serviceId]);
    }
  };

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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-4 w-12">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
              />
            </th>
            <th className="text-left p-4 font-heading font-semibold text-foreground">
              Service Name
            </th>
            <th className="text-left p-4 font-heading font-semibold text-foreground">
              Category
            </th>
            <th className="text-left p-4 font-heading font-semibold text-foreground">
              Duration
            </th>
            <th className="text-left p-4 font-heading font-semibold text-foreground">
              Price
            </th>
            <th className="text-left p-4 font-heading font-semibold text-foreground">
              Status
            </th>
            <th className="text-right p-4 font-heading font-semibold text-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {services?.map((service) => (
            <tr 
              key={service?.id}
              className="border-b border-border hover:bg-muted/50 transition-smooth"
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={isSelected(service?.id)}
                  onChange={() => handleSelectService(service?.id)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                />
              </td>
              <td className="p-4">
                <div className="font-body font-medium text-foreground">
                  {service?.name}
                </div>
                {service?.description && (
                  <div className="caption text-muted-foreground mt-1 line-clamp-1">
                    {service?.description}
                  </div>
                )}
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-md caption font-medium ${getCategoryColor(service?.category)}`}>
                  {service?.category}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2 text-foreground">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="font-body">{service?.duration} min</span>
                </div>
              </td>
              <td className="p-4">
                <div className="font-body font-semibold text-foreground data-text">
                  ${service?.price?.toFixed(2)}
                </div>
                {service?.priceRange && (
                  <div className="caption text-muted-foreground mt-1">
                    ${service?.priceRange?.min} - ${service?.priceRange?.max}
                  </div>
                )}
              </td>
              <td className="p-4">
                <button
                  onClick={() => onToggleStatus(service?.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-md caption font-medium transition-smooth ${
                    service?.active 
                      ? 'bg-success/10 text-success hover:bg-success/20' :'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${service?.active ? 'bg-success' : 'bg-muted-foreground'}`} />
                  {service?.active ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(service)}
                    iconName="Edit2"
                    iconSize={18}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDuplicate(service)}
                    iconName="Copy"
                    iconSize={18}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
