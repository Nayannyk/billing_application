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
    name: "Sudama Mankar",
    email: "sudama@hairverse.in",
    role: "Senior Hair Stylist"
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


  const [metricsData] = useState([]);
  const [salesChartData] = useState([]);
  const [servicesData] = useState([]);
  const [customerAnalyticsData] = useState([]);
  const [peakHoursData] = useState([]);
  const [staffPerformanceData] = useState([]);


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
