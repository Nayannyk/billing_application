import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ServiceModal = ({ isOpen, onClose, onSave, service, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    duration: '',
    price: '',
    priceType: 'fixed',
    priceRangeMin: '',
    priceRangeMax: '',
    taxApplicable: true,
    active: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service?.name || '',
        description: service?.description || '',
        category: service?.category || '',
        duration: service?.duration || '',
        price: service?.price || '',
        priceType: service?.priceRange ? 'range' : 'fixed',
        priceRangeMin: service?.priceRange?.min || '',
        priceRangeMax: service?.priceRange?.max || '',
        taxApplicable: service?.taxApplicable !== false,
        active: service?.active !== false
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        duration: '',
        price: '',
        priceType: 'fixed',
        priceRangeMin: '',
        priceRangeMax: '',
        taxApplicable: true,
        active: true
      });
    }
    setErrors({});
  }, [service, isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) newErrors.name = 'Service name is required';
    if (!formData?.category) newErrors.category = 'Category is required';
    if (!formData?.duration || formData?.duration <= 0) newErrors.duration = 'Valid duration is required';
    
    if (formData?.priceType === 'fixed') {
      if (!formData?.price || formData?.price <= 0) newErrors.price = 'Valid price is required';
    } else {
      if (!formData?.priceRangeMin || formData?.priceRangeMin <= 0) {
        newErrors.priceRangeMin = 'Valid minimum price is required';
      }
      if (!formData?.priceRangeMax || formData?.priceRangeMax <= 0) {
        newErrors.priceRangeMax = 'Valid maximum price is required';
      }
      if (formData?.priceRangeMin && formData?.priceRangeMax && 
          parseFloat(formData?.priceRangeMin) >= parseFloat(formData?.priceRangeMax)) {
        newErrors.priceRangeMax = 'Maximum must be greater than minimum';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validate()) {
      const serviceData = {
        ...formData,
        price: formData?.priceType === 'fixed' ? parseFloat(formData?.price) : parseFloat(formData?.priceRangeMin),
        priceRange: formData?.priceType === 'range' ? {
          min: parseFloat(formData?.priceRangeMin),
          max: parseFloat(formData?.priceRangeMax)
        } : null,
        duration: parseInt(formData?.duration)
      };
      onSave(serviceData);
    }
  };

  if (!isOpen) return null;

  const categoryOptions = categories?.map(cat => ({
    value: cat?.name,
    label: cat?.name
  }));

  const priceTypeOptions = [
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'range', label: 'Price Range' }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[300]" onClick={onClose} />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-4">
        <div className="bg-card rounded-md shadow-warm-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              {service ? 'Edit Service' : 'Add New Service'}
            </h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <Input
              label="Service Name"
              type="text"
              placeholder="e.g., Women's Haircut"
              value={formData?.name}
              onChange={(e) => handleChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />

            <Input
              label="Description"
              type="text"
              placeholder="Brief description of the service"
              value={formData?.description}
              onChange={(e) => handleChange('description', e?.target?.value)}
            />

            <Select
              label="Category"
              placeholder="Select category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleChange('category', value)}
              error={errors?.category}
              required
            />

            <Input
              label="Duration (minutes)"
              type="number"
              placeholder="e.g., 45"
              value={formData?.duration}
              onChange={(e) => handleChange('duration', e?.target?.value)}
              error={errors?.duration}
              required
              min="1"
            />

            <Select
              label="Price Type"
              options={priceTypeOptions}
              value={formData?.priceType}
              onChange={(value) => handleChange('priceType', value)}
            />

            {formData?.priceType === 'fixed' ? (
              <Input
                label="Price (USD)"
                type="number"
                placeholder="e.g., 45.00"
                value={formData?.price}
                onChange={(e) => handleChange('price', e?.target?.value)}
                error={errors?.price}
                required
                min="0"
                step="0.01"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Minimum Price (USD)"
                  type="number"
                  placeholder="e.g., 40.00"
                  value={formData?.priceRangeMin}
                  onChange={(e) => handleChange('priceRangeMin', e?.target?.value)}
                  error={errors?.priceRangeMin}
                  required
                  min="0"
                  step="0.01"
                />
                <Input
                  label="Maximum Price (USD)"
                  type="number"
                  placeholder="e.g., 60.00"
                  value={formData?.priceRangeMax}
                  onChange={(e) => handleChange('priceRangeMax', e?.target?.value)}
                  error={errors?.priceRangeMax}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            <div className="space-y-3">
              <Checkbox
                label="Tax Applicable"
                description="Apply tax to this service"
                checked={formData?.taxApplicable}
                onChange={(e) => handleChange('taxApplicable', e?.target?.checked)}
              />
              <Checkbox
                label="Active Status"
                description="Service is available for billing"
                checked={formData?.active}
                onChange={(e) => handleChange('active', e?.target?.checked)}
              />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                iconName="Save"
                iconPosition="left"
                fullWidth
              >
                {service ? 'Update Service' : 'Add Service'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ServiceModal;
