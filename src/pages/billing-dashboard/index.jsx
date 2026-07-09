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
    name: "Sarah Johnson",
    email: "sarah.johnson@salonbill.com",
    role: "Manager"
  };

  const metricsData = [
    {
      title: "Today\'s Sales",
      value: "$2,847.50",
      subtitle: "vs yesterday",
      icon: "DollarSign",
      trend: "up",
      trendValue: "+12.5%",
      iconColor: "var(--color-primary)"
    },
    {
      title: "Bills Created",
      value: "24",
      subtitle: "today",
      icon: "FileText",
      trend: "up",
      trendValue: "+8",
      iconColor: "var(--color-secondary)"
    },
    {
      title: "Pending Bills",
      value: "3",
      subtitle: "awaiting payment",
      icon: "Clock",
      trend: "down",
      trendValue: "-2",
      iconColor: "var(--color-warning)"
    },
    {
      title: "Active Customers",
      value: "18",
      subtitle: "served today",
      icon: "Users",
      trend: "up",
      trendValue: "+5",
      iconColor: "var(--color-success)"
    }
  ];

  const recentBills = [
    {
      id: 1,
      billNumber: "INV-2026-001",
      customerName: "Jessica Martinez",
      customerPhone: "+1 (555) 123-4567",
      services: "Haircut & Styling, Hair Coloring",
      amount: "165.00",
      date: "Jan 14, 2026 - 2:30 PM",
      status: "paid"
    },
    {
      id: 2,
      billNumber: "INV-2026-002",
      customerName: "Emily Thompson",
      customerPhone: "+1 (555) 234-5678",
      services: "Manicure, Pedicure, Facial Treatment",
      amount: "145.00",
      date: "Jan 14, 2026 - 1:15 PM",
      status: "paid"
    },
    {
      id: 3,
      billNumber: "INV-2026-003",
      customerName: "Michael Rodriguez",
      customerPhone: "+1 (555) 345-6789",
      services: "Men's Haircut, Beard Trim",
      amount: "55.00",
      date: "Jan 14, 2026 - 12:45 PM",
      status: "pending"
    },
    {
      id: 4,
      billNumber: "INV-2026-004",
      customerName: "Sarah Williams",
      customerPhone: "+1 (555) 456-7890",
      services: "Hair Spa Treatment, Deep Conditioning",
      amount: "125.00",
      date: "Jan 14, 2026 - 11:30 AM",
      status: "paid"
    },
    {
      id: 5,
      billNumber: "INV-2026-005",
      customerName: "David Chen",
      customerPhone: "+1 (555) 567-8901",
      services: "Haircut, Hair Styling",
      amount: "65.00",
      date: "Jan 14, 2026 - 10:00 AM",
      status: "paid"
    },
    {
      id: 6,
      billNumber: "INV-2026-006",
      customerName: "Amanda Foster",
      customerPhone: "+1 (555) 678-9012",
      services: "Bridal Makeup, Hair Styling",
      amount: "285.00",
      date: "Jan 14, 2026 - 9:15 AM",
      status: "pending"
    },
    {
      id: 7,
      billNumber: "INV-2026-007",
      customerName: "Robert Kim",
      customerPhone: "+1 (555) 789-0123",
      services: "Men's Haircut, Shave",
      amount: "45.00",
      date: "Jan 13, 2026 - 5:45 PM",
      status: "paid"
    },
    {
      id: 8,
      billNumber: "INV-2026-008",
      customerName: "Lisa Anderson",
      customerPhone: "+1 (555) 890-1234",
      services: "Hair Coloring, Highlights, Styling",
      amount: "195.00",
      date: "Jan 13, 2026 - 4:30 PM",
      status: "cancelled"
    }
  ];

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
    const message = `Hello ${bill?.customerName},\n\nThank you for visiting SalonBill Pro!\n\nBill Number: ${bill?.billNumber}\nDate: ${bill?.date}\nTotal Amount: $${bill?.amount}\n\nWe look forward to serving you again!`;
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
            {metricsData?.map((metric, index) => (
              <MetricsCard key={index} {...metric} />
            ))}
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
