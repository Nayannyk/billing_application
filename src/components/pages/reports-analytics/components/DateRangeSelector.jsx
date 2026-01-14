import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const DateRangeSelector = ({ 
  selectedRange, 
  onRangeChange, 
  customStartDate, 
  customEndDate,
  onCustomStartChange,
  onCustomEndChange 
}) => {
  const rangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="space-y-4">
      <Select
        label="Date Range"
        options={rangeOptions}
        value={selectedRange}
        onChange={onRangeChange}
        className="w-full"
      />
      {selectedRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-md">
          <Input
            type="date"
            label="Start Date"
            value={customStartDate}
            onChange={(e) => onCustomStartChange(e?.target?.value)}
            max={customEndDate || new Date()?.toISOString()?.split('T')?.[0]}
          />
          <Input
            type="date"
            label="End Date"
            value={customEndDate}
            onChange={(e) => onCustomEndChange(e?.target?.value)}
            min={customStartDate}
            max={new Date()?.toISOString()?.split('T')?.[0]}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
