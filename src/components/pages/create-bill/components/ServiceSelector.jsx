import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServiceSelector = ({ onAddService, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    { id: 1, name: 'Haircut - Men', category: 'haircut', price: 25.00, duration: '30 min' },
    { id: 2, name: 'Haircut - Women', category: 'haircut', price: 45.00, duration: '45 min' },
    { id: 3, name: 'Hair Coloring - Full', category: 'coloring', price: 120.00, duration: '2 hours' },
    { id: 4, name: 'Hair Coloring - Highlights', category: 'coloring', price: 85.00, duration: '90 min' },
    { id: 5, name: 'Keratin Treatment', category: 'treatment', price: 150.00, duration: '2.5 hours' },
    { id: 6, name: 'Deep Conditioning', category: 'treatment', price: 35.00, duration: '30 min' },
    { id: 7, name: 'Blow Dry & Style', category: 'styling', price: 30.00, duration: '30 min' },
    { id: 8, name: 'Updo Styling', category: 'styling', price: 65.00, duration: '60 min' },
    { id: 9, name: 'Manicure - Classic', category: 'nails', price: 20.00, duration: '30 min' },
    { id: 10, name: 'Manicure - Gel', category: 'nails', price: 35.00, duration: '45 min' },
    { id: 11, name: 'Pedicure - Classic', category: 'nails', price: 30.00, duration: '45 min' },
    { id: 12, name: 'Pedicure - Spa', category: 'nails', price: 50.00, duration: '60 min' },
    { id: 13, name: 'Facial - Basic', category: 'facial', price: 55.00, duration: '45 min' },
    { id: 14, name: 'Facial - Anti-Aging', category: 'facial', price: 95.00, duration: '75 min' },
    { id: 15, name: 'Eyebrow Threading', category: 'waxing', price: 12.00, duration: '15 min' },
    { id: 16, name: 'Full Body Waxing', category: 'waxing', price: 120.00, duration: '90 min' },
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'haircut', label: 'Haircuts' },
    { value: 'coloring', label: 'Hair Coloring' },
    { value: 'treatment', label: 'Hair Treatments' },
    { value: 'styling', label: 'Styling' },
    { value: 'nails', label: 'Nail Services' },
    { value: 'facial', label: 'Facials' },
    { value: 'waxing', label: 'Waxing & Threading' },
  ];

  const filteredServices = services?.filter(service => {
    const matchesCategory = !selectedCategory || service?.category === selectedCategory;
    const matchesSearch = !searchTerm || service?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const serviceOptions = filteredServices?.map(service => ({
    value: service?.id?.toString(),
    label: `${service?.name} - $${service?.price?.toFixed(2)}`,
    description: `Duration: ${service?.duration}`,
  }));

  const handleAddService = () => {
    if (!selectedService) return;

    const service = services?.find(s => s?.id?.toString() === selectedService);
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
