import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import PageTitle from '../../components/ui/PageTitle';
import ActionButtonZone from '../../components/ui/ActionButtonZone';
import Select from '../../components/ui/Select';
import MetricCard from './components/MetricCard';
import DateRangeSelector from './components/DateRangeSelector';
import SalesChart from './components/SalesChart';
import ServicePerformanceTable from './components/ServicePerformanceTable';
import CustomerAnalytics from './components/CustomerAnalytics';
import PeakHoursChart from './components/PeakHoursChart';
import StaffPerformance from './components/StaffPerformance';
import ExportModal from './components/ExportModal';

const ReportsAnalytics = () => {
  const [selectedRange, setSelectedRange] = useState('last30days');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [reportType, setReportType] = useState('overview');
  const [chartType, setChartType] = useState('line');
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const mockUser = {
    name: "Sarah Johnson",
    email: "sarah.johnson@salonbill.com",
    role: "Salon Manager"
  };

  const reportTypeOptions = [
  { value: 'overview', label: 'Business Overview' },
  { value: 'sales', label: 'Sales Analysis' },
  { value: 'services', label: 'Service Performance' },
  { value: 'customers', label: 'Customer Analytics' },
  { value: 'staff', label: 'Staff Performance' }];


  const chartTypeOptions = [
  { value: 'line', label: 'Line Chart' },
  { value: 'bar', label: 'Bar Chart' }];


  const metricsData = [
  {
    title: "Total Revenue",
    value: "$48,562",
    change: "+12.5%",
    changeType: "positive",
    icon: "DollarSign",
    iconColor: "var(--color-success)"
  },
  {
    title: "Total Transactions",
    value: "1,247",
    change: "+8.3%",
    changeType: "positive",
    icon: "Receipt",
    iconColor: "var(--color-primary)"
  },
  {
    title: "Average Bill Value",
    value: "$38.95",
    change: "+3.2%",
    changeType: "positive",
    icon: "TrendingUp",
    iconColor: "var(--color-secondary)"
  },
  {
    title: "Active Customers",
    value: "892",
    change: "-2.1%",
    changeType: "negative",
    icon: "Users",
    iconColor: "var(--color-accent)"
  }];


  const salesChartData = [
  { date: "Jan 1", revenue: 3200, transactions: 85 },
  { date: "Jan 8", revenue: 3800, transactions: 92 },
  { date: "Jan 15", revenue: 4100, transactions: 98 },
  { date: "Jan 22", revenue: 3900, transactions: 88 },
  { date: "Jan 29", revenue: 4500, transactions: 105 },
  { date: "Feb 5", revenue: 4200, transactions: 95 },
  { date: "Feb 12", revenue: 4800, transactions: 110 }];


  const servicesData = [
  {
    id: 1,
    name: "Women\'s Haircut & Style",
    category: "Hair Services",
    bookings: 342,
    revenue: 17100,
    avgPrice: 50.00,
    icon: "Scissors",
    color: "var(--color-primary)"
  },
  {
    id: 2,
    name: "Hair Coloring",
    category: "Hair Services",
    bookings: 156,
    revenue: 14040,
    avgPrice: 90.00,
    icon: "Palette",
    color: "var(--color-secondary)"
  },
  {
    id: 3,
    name: "Manicure & Pedicure",
    category: "Nail Services",
    bookings: 289,
    revenue: 10115,
    avgPrice: 35.00,
    icon: "Hand",
    color: "var(--color-accent)"
  },
  {
    id: 4,
    name: "Facial Treatment",
    category: "Skin Care",
    bookings: 124,
    revenue: 8680,
    avgPrice: 70.00,
    icon: "Sparkles",
    color: "var(--color-success)"
  },
  {
    id: 5,
    name: "Men\'s Haircut",
    category: "Hair Services",
    bookings: 198,
    revenue: 5940,
    avgPrice: 30.00,
    icon: "Scissors",
    color: "var(--color-primary)"
  },
  {
    id: 6,
    name: "Hair Treatment",
    category: "Hair Services",
    bookings: 87,
    revenue: 5220,
    avgPrice: 60.00,
    icon: "Droplet",
    color: "var(--color-secondary)"
  }];


  const customerAnalyticsData = [
  {
    name: "New Customers",
    value: 142,
    percentage: 28,
    description: "First-time visitors this period"
  },
  {
    name: "Returning Customers",
    value: 356,
    percentage: 40,
    description: "2-5 previous visits"
  },
  {
    name: "Regular Customers",
    value: 267,
    percentage: 22,
    description: "6-10 previous visits"
  },
  {
    name: "VIP Customers",
    value: 127,
    percentage: 10,
    description: "10+ previous visits"
  }];


  const peakHoursData = [
  { hour: "9 AM", bookings: 12 },
  { hour: "10 AM", bookings: 28 },
  { hour: "11 AM", bookings: 35 },
  { hour: "12 PM", bookings: 42 },
  { hour: "1 PM", bookings: 38 },
  { hour: "2 PM", bookings: 45 },
  { hour: "3 PM", bookings: 52 },
  { hour: "4 PM", bookings: 48 },
  { hour: "5 PM", bookings: 41 },
  { hour: "6 PM", bookings: 32 }];


  const staffPerformanceData = [
  {
    id: 1,
    name: "Emily Rodriguez",
    role: "Senior Stylist",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a73b5e15-1763293788587.png",
    avatarAlt: "Professional headshot of Hispanic woman with long brown hair in black blazer smiling warmly",
    servicesCompleted: 156,
    revenue: 12480,
    rating: 4.9,
    avgServiceTime: "45m",
    topPerformer: true
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Hair Colorist",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b96df5c7-1763298849215.png",
    avatarAlt: "Professional headshot of Asian man with short black hair in navy suit with confident expression",
    servicesCompleted: 98,
    revenue: 8820,
    rating: 4.8,
    avgServiceTime: "90m",
    topPerformer: false
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Nail Technician",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1278c0bdc-1763293497942.png",
    avatarAlt: "Professional headshot of African American woman with curly hair in white blouse with friendly smile",
    servicesCompleted: 142,
    revenue: 4970,
    rating: 4.7,
    avgServiceTime: "60m",
    topPerformer: false
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Barber",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_197f1fa7d-1763300617923.png",
    avatarAlt: "Professional headshot of Caucasian man with short blonde hair in gray suit with professional demeanor",
    servicesCompleted: 187,
    revenue: 5610,
    rating: 4.6,
    avgServiceTime: "30m",
    topPerformer: false
  }];


  const handleExport = (exportConfig) => {
    console.log('Exporting report with config:', exportConfig);
    alert(`Report exported successfully as ${exportConfig?.format?.toUpperCase()}!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} />
      <div className="pt-20">
        <PageTitle />
        
        <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 bg-card rounded-lg p-4 md:p-6 shadow-warm-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <DateRangeSelector
                selectedRange={selectedRange}
                onRangeChange={setSelectedRange}
                customStartDate={customStartDate}
                customEndDate={customEndDate}
                onCustomStartChange={setCustomStartDate}
                onCustomEndChange={setCustomEndDate} />

              
              <Select
                label="Report Type"
                options={reportTypeOptions}
                value={reportType}
                onChange={setReportType} />

            </div>

            <ActionButtonZone
              primaryAction={{
                label: "Export Report",
                icon: "Download",
                onClick: () => setExportModalOpen(true)
              }}
              secondaryActions={[
              {
                label: "Print",
                icon: "Printer",
                variant: "outline",
                onClick: () => window.print()
              }]
              } />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {metricsData?.map((metric, index) =>
            <MetricCard key={index} {...metric} />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Sales Trends
                </h3>
                <Select
                  options={chartTypeOptions}
                  value={chartType}
                  onChange={setChartType}
                  className="w-40" />

              </div>
              <SalesChart
                data={salesChartData}
                chartType={chartType}
                title="Revenue & Transactions" />

            </div>

            <div>
              <PeakHoursChart data={peakHoursData} />
            </div>
          </div>

          <ServicePerformanceTable services={servicesData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomerAnalytics data={customerAnalyticsData} />
            <StaffPerformance staffData={staffPerformanceData} />
          </div>
        </div>
      </div>
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onExport={handleExport} />

    </div>);

};

export default ReportsAnalytics;
