import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#0F766E'
  });

  const [errors, setErrors] = useState({});

  const colorOptions = [
    { value: '#0F766E', label: 'Teal', class: 'bg-primary' },
    { value: '#0891B2', label: 'Cyan', class: 'bg-secondary' },
    { value: '#F59E0B', label: 'Amber', class: 'bg-accent' },
    { value: '#059669', label: 'Emerald', class: 'bg-success' },
    { value: '#D97706', label: 'Orange', class: 'bg-warning' }
  ];

  useEffect(() => {
    if (category) {
      setFormData({
        name: category?.name || '',
        description: category?.description || '',
        color: category?.color || '#0F766E'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: '#0F766E'
      });
    }
    setErrors({});
  }, [category, isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) newErrors.name = 'Category name is required';
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[300]" onClick={onClose} />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-4">
        <div className="bg-card rounded-md shadow-warm-xl w-full max-w-md">
          <div className="border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              {category ? 'Edit Category' : 'Add New Category'}
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
              label="Category Name"
              type="text"
              placeholder="e.g., Hair Care"
              value={formData?.name}
              onChange={(e) => handleChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />

            <Input
              label="Description"
              type="text"
              placeholder="Brief description of the category"
              value={formData?.description}
              onChange={(e) => handleChange('description', e?.target?.value)}
            />

            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-3">
                Category Color
              </label>
              <div className="grid grid-cols-5 gap-3">
                {colorOptions?.map((option) => (
                  <button
                    key={option?.value}
                    type="button"
                    onClick={() => handleChange('color', option?.value)}
                    className={`
                      relative w-full aspect-square rounded-md transition-smooth
                      ${option?.class}
                      ${formData?.color === option?.value ? 'ring-2 ring-offset-2 ring-primary' : 'hover:scale-110'}
                    `}
                  >
                    {formData?.color === option?.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Check" size={20} color="white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
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
                {category ? 'Update Category' : 'Add Category'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
