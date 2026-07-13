import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useServices } from '../../../context/ServiceContext';

const ServiceSelector = ({ onAddService }) => {
  const { services, categories } = useServices();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const activeServices = services?.filter(s => s?.active);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat?.name, label: cat?.name }))
  ];

  const filteredServices = activeServices?.filter(service => {
    const matchesCategory = !selectedCategory || service?.category === selectedCategory;
    const matchesSearch = !searchTerm || service?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const serviceOptions = filteredServices?.map(service => ({
    value: service?.id?.toString(),
    label: `${service?.name} - ₹${service?.price}`,
    description: `Duration: ${service?.duration} min`,
  }));

  const handleAddService = () => {
    if (!selectedService) return;

    const service = activeServices?.find(s => s?.id?.toString() === selectedService);
    if (service) {
      onAddService({
        ...service,
        quantity: parseInt(quantity),
        total: service?.price * parseInt(quantity),
      });
      setSelectedService('');
      setQuantity(1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
          <Icon name="Plus" size={20} color="var(--color-primary)" strokeWidth={2} />
        </div>
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Add Services
        </h2>
      </div>
      <div className="space-y-4">
        <Input
          type="search"
          label="Search Services"
          placeholder="Search by service name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />

        <Select
          label="Filter by Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Select category"
        />

        <Select
          label="Select Service"
          description="Choose a service to add to the bill"
          options={serviceOptions}
          value={selectedService}
          onChange={setSelectedService}
          placeholder="Choose service..."
          searchable
          required
        />

        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Icon name="Minus" size={18} />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e?.target?.value) || 1)))}
              className="w-20 text-center"
              min="1"
              max="99"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              disabled={quantity >= 99}
            >
              <Icon name="Plus" size={18} />
            </Button>
          </div>
        </div>

        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddService}
          disabled={!selectedService}
          fullWidth
          className="mt-6"
        >
          Add to Bill
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelector;
