import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PageTitle from '../../components/ui/PageTitle';
import ActionButtonZone from '../../components/ui/ActionButtonZone';
import MetricsCard from './components/MetricsCard';
import FilterBar from './components/FilterBar';
import BillTableRow from './components/BillTableRow';
import BillCard from './components/BillCard';
import BillViewModal from './components/BillViewModal';

const BillingDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [staffFilter, setStaffFilter] = useState('all');
  const [selectedBill, setSelectedBill] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const mockUser = {
    name: "Sudama Mankar",
    email: "sudama@hairverse.in",
    role: "Manager"
  };

  const [metricsData] = useState([]);
  const [recentBills] = useState([]);

  const handleCreateBill = () => {
    navigate('/create-bill');
  };

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setViewModalOpen(true);
  };

  const handleEditBill = (bill) => {
    navigate('/create-bill', { state: { editBill: bill } });
  };

  const handleShareBill = (bill) => {
    const message = `Hello ${bill?.customerName},\n\nThank you for visiting Hairverse Unisex Salon!\n\nBill Number: ${bill?.billNumber}\nDate: ${bill?.date}\nTotal Amount: ₹${bill?.amount}\n\nWe look forward to serving you again!`;
    const whatsappUrl = `https://wa.me/${bill?.customerPhone?.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePrintBill = (bill) => {
    window.print();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setDateRange('today');
    setStatusFilter('all');
    setStaffFilter('all');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} onLogout={handleLogout} />
      <main className="pt-20">
        <div className="bg-background border-b border-border">
          <div className="px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <PageTitle />
              <ActionButtonZone
                primaryAction={{
                  label: "Create New Bill",
                  icon: "Plus",
                  onClick: handleCreateBill
                }}
                secondaryActions={[
                  {
                    label: "Export Data",
                    icon: "Download",
                    variant: "outline",
                    onClick: () => console.log('Export data')
                  }
                ]}
              />
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {metricsData?.length === 0
              ? [
                  { title: "Today's Sales", icon: "DollarSign", iconColor: "var(--color-primary)" },
                  { title: "Bills Created", icon: "FileText", iconColor: "var(--color-secondary)" },
                  { title: "Pending Bills", icon: "Clock", iconColor: "var(--color-warning)" },
                  { title: "Active Customers", icon: "Users", iconColor: "var(--color-success)" }
                ]?.map((metric, index) => (
                  <MetricsCard key={index} {...metric} value="—" subtitle="No data yet" />
                ))
              : metricsData?.map((metric, index) => (
                  <MetricsCard key={index} {...metric} />
                ))
            }
          </div>

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            staffFilter={staffFilter}
            onStaffFilterChange={setStaffFilter}
            onClearFilters={handleClearFilters}
          />

          <div className="bg-card rounded-lg shadow-warm-sm border border-border overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-border">
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Recent Bills
              </h2>
              <p className="text-sm caption text-muted-foreground mt-1">
                Latest billing transactions and invoices
              </p>
            </div>

            {recentBills?.length === 0 ? (
              <div className="p-12 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mx-auto mb-4">
                  <Icon name="FileText" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  No bills yet
                </h3>
                <p className="caption text-muted-foreground mb-6">
                  Create your first bill to get started
                </p>
                <ActionButtonZone
                  primaryAction={{
                    label: 'Create New Bill',
                    icon: 'Plus',
                    onClick: handleCreateBill
                  }}
                  className="justify-center"
                />
              </div>
            ) : (
              <>
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Bill Number
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Services
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {recentBills?.map((bill) => (
                        <BillTableRow
                          key={bill?.id}
                          bill={bill}
                          onView={handleViewBill}
                          onEdit={handleEditBill}
                          onShare={handleShareBill}
                          onPrint={handlePrintBill}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="lg:hidden p-4 space-y-4">
                  {recentBills?.map((bill) => (
                    <BillCard
                      key={bill?.id}
                      bill={bill}
                      onView={handleViewBill}
                      onEdit={handleEditBill}
                      onShare={handleShareBill}
                      onPrint={handlePrintBill}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      {viewModalOpen && (
        <BillViewModal
          bill={selectedBill}
          onClose={() => setViewModalOpen(false)}
          onShare={handleShareBill}
          onPrint={handlePrintBill}
        />
      )}
    </div>
  );
};

export default BillingDashboard;
