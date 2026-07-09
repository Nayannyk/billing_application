import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PageTitle from '../../components/ui/PageTitle';
import ActionButtonZone from '../../components/ui/ActionButtonZone';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import CustomerTable from './components/CustomerTable';
import CustomerCard from './components/CustomerCard';
import CustomerModal from './components/CustomerModal';
import CustomerForm from './components/CustomerForm';
import BulkActionsBar from './components/BulkActionsBar';
import { useCustomers } from '../../context/CustomerContext';

const CustomerManagement = () => {
  const navigate = useNavigate();
  const { customers, setCustomers, addCustomer, updateCustomer } = useCustomers();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('all');

  const mockUser = {
    name: 'Sudama Mankar',
    email: 'sudama@hairverse.in',
    role: 'Manager'
  };

  const filterOptions = [
    { value: 'all', label: 'All Customers' },
    { value: 'vip', label: 'VIP Customers' },
    { value: 'regular', label: 'Regular Customers' },
    { value: 'occasional', label: 'Occasional Visitors' }
  ];

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers?.filter(customer => {
      const matchesSearch = 
        customer?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        customer?.phone?.includes(searchQuery) ||
        customer?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      const matchesFilter = 
        filterStatus === 'all' ||
        (filterStatus === 'vip' && customer?.visitFrequency?.includes('VIP')) ||
        (filterStatus === 'regular' && customer?.visitFrequency?.includes('Regular')) ||
        (filterStatus === 'occasional' && customer?.visitFrequency === 'Occasional');

      return matchesSearch && matchesFilter;
    });

    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'lastVisit') {
        aValue = new Date(aValue)?.getTime();
        bValue = new Date(bValue)?.getTime();
      } else if (sortConfig?.key === 'totalSpent') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [customers, searchQuery, sortConfig, filterStatus]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowCustomerForm(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowCustomerForm(true);
  };

  const handleSaveCustomer = (customerData) => {
    if (editingCustomer) {
      updateCustomer(customerData);
    } else {
      addCustomer(customerData);
    }
    setShowCustomerForm(false);
    setEditingCustomer(null);
  };

  const handleViewHistory = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCreateBill = (customer) => {
    navigate('/create-bill', { state: { customer } });
  };

  const handleExportCustomers = () => {
    console.log('Exporting customers:', selectedCustomers);
  };

  const handleSendPromo = () => {
    console.log('Sending promo to:', selectedCustomers);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} onLogout={handleLogout} />
      <div className="pt-20">
        <PageTitle />

        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex-1 max-w-2xl">
              <Input
                type="search"
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-3">
              <Select
                options={filterOptions}
                value={filterStatus}
                onChange={setFilterStatus}
                className="w-48"
              />
              <ActionButtonZone
                primaryAction={{
                  label: 'Add Customer',
                  icon: 'UserPlus',
                  onClick: handleAddCustomer
                }}
              />
            </div>
          </div>

          <div className="bg-card rounded-md border border-border shadow-warm-sm mb-6">
            <div className="p-4 md:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Users" size={24} className="text-primary" />
                  <div>
                    <h2 className="font-heading font-semibold text-foreground">
                      Customer Database
                    </h2>
                    <p className="caption text-muted-foreground mt-1">
                      {filteredAndSortedCustomers?.length} {filteredAndSortedCustomers?.length === 1 ? 'customer' : 'customers'} found
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <CustomerTable
                customers={filteredAndSortedCustomers}
                onEdit={handleEditCustomer}
                onViewHistory={handleViewHistory}
                onCreateBill={handleCreateBill}
                onRowClick={setSelectedCustomer}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>

            <div className="lg:hidden p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAndSortedCustomers?.map(customer => (
                  <CustomerCard
                    key={customer?.id}
                    customer={customer}
                    onEdit={handleEditCustomer}
                    onViewHistory={handleViewHistory}
                    onCreateBill={handleCreateBill}
                    onClick={setSelectedCustomer}
                  />
                ))}
              </div>
            </div>

            {filteredAndSortedCustomers?.length === 0 && (
              <div className="p-12 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  No customers found
                </h3>
                <p className="caption text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onEdit={handleEditCustomer}
          onCreateBill={handleCreateBill}
        />
      )}
      {showCustomerForm && (
        <CustomerForm
          customer={editingCustomer}
          onClose={() => {
            setShowCustomerForm(false);
            setEditingCustomer(null);
          }}
          onSave={handleSaveCustomer}
        />
      )}
      <BulkActionsBar
        selectedCount={selectedCustomers?.length}
        onExport={handleExportCustomers}
        onSendPromo={handleSendPromo}
        onClearSelection={() => setSelectedCustomers([])}
      />
    </div>
  );
};

export default CustomerManagement;
