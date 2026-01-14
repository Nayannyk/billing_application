import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  dateRange, 
  onDateRangeChange,
  statusFilter,
  onStatusFilterChange,
  staffFilter,
  onStaffFilterChange,
  onClearFilters
}) => {
  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const staffOptions = [
    { value: 'all', label: 'All Staff' },
    { value: 'sarah', label: 'Sarah Johnson' },
    { value: 'michael', label: 'Michael Chen' },
    { value: 'emily', label: 'Emily Rodriguez' },
    { value: 'david', label: 'David Kim' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-warm-sm border border-border mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search bills or customers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />

        <Select
          placeholder="Select date range"
          options={dateRangeOptions}
          value={dateRange}
          onChange={onDateRangeChange}
        />

        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusFilterChange}
        />

        <Select
          placeholder="Filter by staff"
          options={staffOptions}
          value={staffFilter}
          onChange={onStaffFilterChange}
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <p className="text-sm caption text-muted-foreground">
          Showing filtered results
        </p>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
