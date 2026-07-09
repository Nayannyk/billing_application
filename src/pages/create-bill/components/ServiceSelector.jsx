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
    { id: 1, name: 'Haircut', category: 'haircut', price: 149, duration: '30 min' },
    { id: 2, name: 'Beard Trim', category: 'haircut', price: 99, duration: '20 min' },
    { id: 3, name: 'Wash & Blow Dry', category: 'haircut', price: 69, duration: '30 min' },
    { id: 4, name: 'Haircut + Blow-Dry', category: 'haircut', price: 299, duration: '45 min' },
    { id: 5, name: 'Hair Color', category: 'coloring', price: 399, duration: '60 min' },
    { id: 6, name: 'Root Touch-up', category: 'coloring', price: 699, duration: '45 min' },
    { id: 7, name: 'Global Hair Color (Short)', category: 'coloring', price: 899, duration: '90 min' },
    { id: 8, name: 'Global Hair Color (Medium)', category: 'coloring', price: 999, duration: '2 hours' },
    { id: 9, name: 'Global Hair Color (Long)', category: 'coloring', price: 1249, duration: '2.5 hours' },
    { id: 10, name: 'Highlights with Color', category: 'coloring', price: 1399, duration: '2 hours' },
    { id: 11, name: 'Facial', category: 'facial', price: 699, duration: '45 min' },
    { id: 12, name: 'Manicure / Pedicure', category: 'nails', price: 499, duration: '60 min' },
    { id: 13, name: 'Threading (Full Face)', category: 'waxing', price: 49, duration: '15 min' },
    { id: 14, name: 'Upper Lips', category: 'waxing', price: 69, duration: '10 min' },
    { id: 15, name: 'Waxing + Threading (Hand & Leg)', category: 'waxing', price: 299, duration: '45 min' },
    { id: 16, name: 'Oil Massage', category: 'treatment', price: 1999, duration: '60 min' },
    { id: 17, name: 'Basic Package', category: 'treatment', price: 1099, duration: '2 hours' },
    { id: 18, name: 'Premium Package', category: 'treatment', price: 1999, duration: '3 hours' },
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'haircut', label: 'Haircuts & Styling' },
    { value: 'coloring', label: 'Hair Coloring' },
    { value: 'facial', label: 'Facials' },
    { value: 'nails', label: 'Nail Services' },
    { value: 'waxing', label: 'Waxing & Threading' },
    { value: 'treatment', label: 'Spa & Packages' },
  ];

  const filteredServices = services?.filter(service => {
    const matchesCategory = !selectedCategory || service?.category === selectedCategory;
    const matchesSearch = !searchTerm || service?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const serviceOptions = filteredServices?.map(service => ({
    value: service?.id?.toString(),
    label: `${service?.name} - ₹${service?.price}`,
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
