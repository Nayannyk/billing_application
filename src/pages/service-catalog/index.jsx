import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import PageTitle from '../../components/ui/PageTitle';
import ActionButtonZone from '../../components/ui/ActionButtonZone';
import Icon from '../../components/AppIcon';
import Select from '../../components/ui/Select';
import ServiceTable from './components/ServiceTable';
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';
import CategoryModal from './components/CategoryModal';
import BulkActionsBar from './components/BulkActionsBar';
import ImportModal from './components/ImportModal';

const ServiceCatalog = () => {
  const [user] = useState({
    name: 'Sudama Mankar',
    email: 'sudama@hairverse.in',
    role: 'Administrator'
  });

  const [categories, setCategories] = useState([
    { id: 1, name: 'Haircuts & Styling', description: 'Haircut, beard, blow-dry services', color: '#0F766E' },
    { id: 2, name: 'Hair Coloring', description: 'Color, highlights, root touch-up', color: '#D97706' },
    { id: 3, name: 'Hair Treatments', description: 'Smoothing, straightening, botox, keratin', color: '#0891B2' },
    { id: 4, name: 'Beauty Services', description: 'Facial, manicure, pedicure, waxing', color: '#F59E0B' },
    { id: 5, name: 'Spa & Packages', description: 'Massage, spa packages', color: '#059669' }
  ]);

  const [services, setServices] = useState([
    { id: 1, name: 'Haircut', description: 'Professional haircut for men & women', category: 'Haircuts & Styling', duration: 30, price: 149, taxApplicable: true, active: true },
    { id: 2, name: 'Beard Trim', description: 'Beard shaping and trimming', category: 'Haircuts & Styling', duration: 20, price: 99, taxApplicable: true, active: true },
    { id: 3, name: 'Wash & Blow Dry', description: 'Hair wash with blow-dry styling', category: 'Haircuts & Styling', duration: 30, price: 69, taxApplicable: true, active: true },
    { id: 4, name: 'Haircut + Blow-Dry', description: 'Complete haircut with blow-dry finish', category: 'Haircuts & Styling', duration: 45, price: 299, taxApplicable: true, active: true },
    { id: 5, name: 'Hair Color', description: 'Full hair coloring service', category: 'Hair Coloring', duration: 60, price: 399, taxApplicable: true, active: true },
    { id: 6, name: 'Root Touch-up', description: 'Quick root color touch-up', category: 'Hair Coloring', duration: 45, price: 699, taxApplicable: true, active: true },
    { id: 7, name: 'Global Hair Color (Short)', description: 'Full color for short hair length', category: 'Hair Coloring', duration: 90, price: 899, taxApplicable: true, active: true },
    { id: 8, name: 'Global Hair Color (Medium)', description: 'Full color for medium hair length', category: 'Hair Coloring', duration: 120, price: 999, taxApplicable: true, active: true },
    { id: 9, name: 'Global Hair Color (Long)', description: 'Full color for long hair length', category: 'Hair Coloring', duration: 150, price: 1249, taxApplicable: true, active: true },
    { id: 10, name: 'Highlights with Color', description: 'Highlights with color - starting from', category: 'Hair Coloring', duration: 120, price: 1399, priceRange: { min: 1399, max: 4999 }, taxApplicable: true, active: true },
    { id: 11, name: 'Hair Smoothing (Normal)', description: 'Smoothing treatment for normal length hair', category: 'Hair Treatments', duration: 120, price: 1999, taxApplicable: true, active: true },
    { id: 12, name: 'Hair Smoothing (Long)', description: 'Smoothing treatment for long hair', category: 'Hair Treatments', duration: 150, price: 2499, taxApplicable: true, active: true },
    { id: 13, name: 'Hair Smoothing (Very Long)', description: 'Smoothing treatment for very long hair', category: 'Hair Treatments', duration: 180, price: 2999, taxApplicable: true, active: true },
    { id: 14, name: 'Hair Straightening (Normal)', description: 'Straightening for normal length hair', category: 'Hair Treatments', duration: 120, price: 1999, taxApplicable: true, active: true },
    { id: 15, name: 'Hair Straightening (Long)', description: 'Straightening for long hair', category: 'Hair Treatments', duration: 150, price: 2499, taxApplicable: true, active: true },
    { id: 16, name: 'Hair Straightening (Very Long)', description: 'Straightening for very long hair', category: 'Hair Treatments', duration: 180, price: 2999, taxApplicable: true, active: true },
    { id: 17, name: 'Hair Botox (Normal)', description: 'Hair botox treatment for normal length', category: 'Hair Treatments', duration: 90, price: 1999, taxApplicable: true, active: true },
    { id: 18, name: 'Hair Botox (Long)', description: 'Hair botox treatment for long hair', category: 'Hair Treatments', duration: 120, price: 2999, taxApplicable: true, active: true },
    { id: 19, name: 'Hair Botox (Very Long)', description: 'Hair botox treatment for very long hair', category: 'Hair Treatments', duration: 150, price: 3999, taxApplicable: true, active: true },
    { id: 20, name: 'Keratin Treatment (Normal)', description: 'Keratin smoothing for normal length', category: 'Hair Treatments', duration: 180, price: 4999, taxApplicable: true, active: true },
    { id: 21, name: 'Keratin Treatment (Long)', description: 'Keratin smoothing for long hair', category: 'Hair Treatments', duration: 210, price: 5999, taxApplicable: true, active: true },
    { id: 22, name: 'Keratin Treatment (Very Long)', description: 'Keratin smoothing for very long hair', category: 'Hair Treatments', duration: 240, price: 6999, taxApplicable: true, active: true },
    { id: 23, name: 'Nanoplastia (Normal)', description: 'Nanoplastia for normal length hair', category: 'Hair Treatments', duration: 180, price: 5499, taxApplicable: true, active: true },
    { id: 24, name: 'Nanoplastia (Long)', description: 'Nanoplastia for long hair', category: 'Hair Treatments', duration: 210, price: 6499, taxApplicable: true, active: true },
    { id: 25, name: 'Nanoplastia (Very Long)', description: 'Nanoplastia for very long hair', category: 'Hair Treatments', duration: 240, price: 7499, taxApplicable: true, active: true },
    { id: 26, name: 'Facial', description: 'Professional facial cleansing and treatment', category: 'Beauty Services', duration: 45, price: 699, taxApplicable: true, active: true },
    { id: 27, name: 'Manicure / Pedicure', description: 'Complete nail care with polish', category: 'Beauty Services', duration: 60, price: 499, taxApplicable: true, active: true },
    { id: 28, name: 'Threading (Full Face)', description: 'Full face threading', category: 'Beauty Services', duration: 15, price: 49, taxApplicable: true, active: true },
    { id: 29, name: 'Upper Lips', description: 'Upper lip threading', category: 'Beauty Services', duration: 10, price: 69, taxApplicable: true, active: true },
    { id: 30, name: 'Waxing + Threading (Hand & Leg)', description: 'Hand and leg waxing with threading', category: 'Beauty Services', duration: 45, price: 299, taxApplicable: true, active: true },
    { id: 31, name: 'Oil Massage', description: 'Relaxing full body oil massage', category: 'Spa & Packages', duration: 60, price: 1999, taxApplicable: true, active: true },
    { id: 32, name: 'Hair Extension', description: 'Hair extension application', category: 'Beauty Services', duration: 60, price: 499, taxApplicable: true, active: true },
    { id: 33, name: 'Hair Patch', description: 'Hair patch application', category: 'Hair Treatments', duration: 120, price: 6000, taxApplicable: true, active: true },
    { id: 34, name: 'Basic Package', description: 'Haircut + Facial + Hair Spa', category: 'Spa & Packages', duration: 120, price: 1099, taxApplicable: true, active: true },
    { id: 35, name: 'Premium Package', description: 'Haircut + Facial + Hair Spa + Color + Head Massage', category: 'Spa & Packages', duration: 180, price: 1999, taxApplicable: true, active: true }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const filteredServices = services?.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service?.category === selectedCategory;
    const matchesSearch = service?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         service?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddService = () => {
    setEditingService(null);
    setServiceModalOpen(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceModalOpen(true);
  };

  const handleDuplicateService = (service) => {
    const newService = {
      ...service,
      id: Math.max(...services?.map(s => s?.id)) + 1,
      name: `${service?.name} (Copy)`
    };
    setServices([...services, newService]);
  };

  const handleToggleStatus = (serviceId) => {
    setServices(services?.map(service =>
      service?.id === serviceId ? { ...service, active: !service?.active } : service
    ));
  };

  const handleSaveService = (serviceData) => {
    if (editingService) {
      setServices(services?.map(service =>
        service?.id === editingService?.id ? { ...service, ...serviceData } : service
      ));
    } else {
      const newService = {
        ...serviceData,
        id: Math.max(...services?.map(s => s?.id)) + 1
      };
      setServices([...services, newService]);
    }
    setServiceModalOpen(false);
    setEditingService(null);
  };

  const handleSaveCategory = (categoryData) => {
    if (editingCategory) {
      setCategories(categories?.map(cat =>
        cat?.id === editingCategory?.id ? { ...cat, ...categoryData } : cat
      ));
    } else {
      const newCategory = {
        ...categoryData,
        id: Math.max(...categories?.map(c => c?.id)) + 1
      };
      setCategories([...categories, newCategory]);
    }
    setCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleImportServices = (importedServices) => {
    const newServices = importedServices?.map((service, index) => ({
      ...service,
      id: Math.max(...services?.map(s => s?.id)) + index + 1,
      taxApplicable: true,
      active: true
    }));
    setServices([...services, ...newServices]);
  };

  const handleBulkActivate = () => {
    setServices(services?.map(service =>
      selectedServices?.includes(service?.id) ? { ...service, active: true } : service
    ));
    setSelectedServices([]);
  };

  const handleBulkDeactivate = () => {
    setServices(services?.map(service =>
      selectedServices?.includes(service?.id) ? { ...service, active: false } : service
    ));
    setSelectedServices([]);
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat?.name, label: cat?.name }))
  ];

  const stats = {
    total: services?.length,
    active: services?.filter(s => s?.active)?.length,
    categories: categories?.length,
    avgPrice: (services?.reduce((sum, s) => sum + s?.price, 0) / services?.length)?.toFixed(2)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={() => console.log('Logout')} />
      <div className="pt-20">
        <PageTitle />

        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-card rounded-md border border-border p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10">
                  <Icon name="Package" size={24} color="var(--color-primary)" />
                </div>
                <span className="caption text-muted-foreground">Total</span>
              </div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-foreground data-text">
                {stats?.total}
              </div>
              <div className="caption text-muted-foreground mt-1">Services</div>
            </div>

            <div className="bg-card rounded-md border border-border p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-success/10">
                  <Icon name="CheckCircle" size={24} color="var(--color-success)" />
                </div>
                <span className="caption text-muted-foreground">Status</span>
              </div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-foreground data-text">
                {stats?.active}
              </div>
              <div className="caption text-muted-foreground mt-1">Active Services</div>
            </div>

            <div className="bg-card rounded-md border border-border p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-secondary/10">
                  <Icon name="FolderOpen" size={24} color="var(--color-secondary)" />
                </div>
                <span className="caption text-muted-foreground">Groups</span>
              </div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-foreground data-text">
                {stats?.categories}
              </div>
              <div className="caption text-muted-foreground mt-1">Categories</div>
            </div>

            <div className="bg-card rounded-md border border-border p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-accent/10">
                  <Icon name="DollarSign" size={24} color="var(--color-accent)" />
                </div>
                <span className="caption text-muted-foreground">Average</span>
              </div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-foreground data-text">
                ${stats?.avgPrice}
              </div>
              <div className="caption text-muted-foreground mt-1">Price per Service</div>
            </div>
          </div>

          <div className="bg-card rounded-md border border-border shadow-warm-sm">
            <div className="p-4 md:p-6 border-b border-border">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={20} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Select
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    placeholder="Filter by category"
                    className="w-full sm:w-48"
                  />

                  <div className="flex items-center gap-2 bg-muted rounded-md p-1">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`flex items-center justify-center w-9 h-9 rounded transition-smooth ${
                        viewMode === 'table' ? 'bg-background shadow-warm-sm' : 'hover:bg-background/50'
                      }`}
                    >
                      <Icon name="List" size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center justify-center w-9 h-9 rounded transition-smooth ${
                        viewMode === 'grid' ? 'bg-background shadow-warm-sm' : 'hover:bg-background/50'
                      }`}
                    >
                      <Icon name="Grid" size={18} />
                    </button>
                  </div>

                  <ActionButtonZone
                    primaryAction={{
                      label: 'Add Service',
                      icon: 'Plus',
                      onClick: handleAddService
                    }}
                    secondaryActions={[
                      {
                        label: 'Import',
                        icon: 'Upload',
                        variant: 'outline',
                        onClick: () => setImportModalOpen(true)
                      },
                      {
                        label: 'Categories',
                        icon: 'FolderOpen',
                        variant: 'outline',
                        onClick: () => {
                          setEditingCategory(null);
                          setCategoryModalOpen(true);
                        }
                      }
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {filteredServices?.length === 0 ? (
                <div className="text-center py-12 md:py-16">
                  <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-md bg-muted mx-auto mb-4">
                    <Icon name="Package" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                    No services found
                  </h3>
                  <p className="caption text-muted-foreground mb-6">
                    {searchQuery || selectedCategory !== 'all' ?'Try adjusting your filters' :'Get started by adding your first service'}
                  </p>
                  {!searchQuery && selectedCategory === 'all' && (
                    <ActionButtonZone
                      primaryAction={{
                        label: 'Add Service',
                        icon: 'Plus',
                        onClick: handleAddService
                      }}
                      className="justify-center"
                    />
                  )}
                </div>
              ) : viewMode === 'table' ? (
                <ServiceTable
                  services={filteredServices}
                  onEdit={handleEditService}
                  onDuplicate={handleDuplicateService}
                  onToggleStatus={handleToggleStatus}
                  onBulkSelect={setSelectedServices}
                  selectedServices={selectedServices}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredServices?.map(service => (
                    <ServiceCard
                      key={service?.id}
                      service={service}
                      onEdit={handleEditService}
                      onDuplicate={handleDuplicateService}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ServiceModal
        isOpen={serviceModalOpen}
        onClose={() => {
          setServiceModalOpen(false);
          setEditingService(null);
        }}
        onSave={handleSaveService}
        service={editingService}
        categories={categories}
      />
      <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() => {
          setCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
      <ImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImport={handleImportServices}
      />
      <BulkActionsBar
        selectedCount={selectedServices?.length}
        onClearSelection={() => setSelectedServices([])}
        onBulkEdit={() => console.log('Bulk edit')}
        onBulkActivate={handleBulkActivate}
        onBulkDeactivate={handleBulkDeactivate}
      />
    </div>
  );
};

export default ServiceCatalog;
