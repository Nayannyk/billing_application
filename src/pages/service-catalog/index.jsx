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
    name: 'Sarah Johnson',
    email: 'sarah@salonbill.com',
    role: 'Administrator'
  });

  const [categories, setCategories] = useState([
    { id: 1, name: 'Hair Care', description: 'Hair cutting, styling, and treatments', color: '#0F766E' },
    { id: 2, name: 'Nail Services', description: 'Manicure, pedicure, and nail art', color: '#0891B2' },
    { id: 3, name: 'Facial Treatments', description: 'Facial care and skin treatments', color: '#F59E0B' },
    { id: 4, name: 'Spa Services', description: 'Massage and relaxation services', color: '#059669' },
    { id: 5, name: 'Makeup', description: 'Makeup application and styling', color: '#D97706' }
  ]);

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Women\'s Haircut",
      description: 'Professional haircut with styling consultation',
      category: 'Hair Care',
      duration: 45,
      price: 45.00,
      taxApplicable: true,
      active: true
    },
    {
      id: 2,
      name: "Men\'s Haircut",
      description: 'Classic or modern haircut with finishing',
      category: 'Hair Care',
      duration: 30,
      price: 25.00,
      taxApplicable: true,
      active: true
    },
    {
      id: 3,
      name: 'Hair Coloring',
      description: 'Full hair coloring service with premium products',
      category: 'Hair Care',
      duration: 120,
      price: 85.00,
      priceRange: { min: 75.00, max: 120.00 },
      taxApplicable: true,
      active: true
    },
    {
      id: 4,
      name: 'Manicure',
      description: 'Complete nail care with polish application',
      category: 'Nail Services',
      duration: 45,
      price: 30.00,
      taxApplicable: true,
      active: true
    },
    {
      id: 5,
      name: 'Pedicure',
      description: 'Foot care treatment with massage and polish',
      category: 'Nail Services',
      duration: 60,
      price: 40.00,
      taxApplicable: true,
      active: true
    },
    {
      id: 6,
      name: 'Deep Cleansing Facial',
      description: 'Intensive facial treatment for all skin types',
      category: 'Facial Treatments',
      duration: 75,
      price: 65.00,
      taxApplicable: true,
      active: true
    },
    {
      id: 7,
      name: 'Swedish Massage',
      description: 'Relaxing full body massage therapy',
      category: 'Spa Services',
      duration: 90,
      price: 95.00,
      priceRange: { min: 85.00, max: 110.00 },
      taxApplicable: true,
      active: true
    },
    {
      id: 8,
      name: 'Bridal Makeup',
      description: 'Complete bridal makeup with trial session',
      category: 'Makeup',
      duration: 120,
      price: 150.00,
      priceRange: { min: 120.00, max: 200.00 },
      taxApplicable: true,
      active: true
    },
    {
      id: 9,
      name: 'Keratin Treatment',
      description: 'Hair smoothing and straightening treatment',
      category: 'Hair Care',
      duration: 180,
      price: 200.00,
      taxApplicable: true,
      active: false
    }
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
