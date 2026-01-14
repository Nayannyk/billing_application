import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ServicePerformanceTable = ({ services }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'revenue', direction: 'desc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'desc' ? 'asc' : 'desc'
    });
  };

  const filteredAndSortedServices = services?.filter(service => 
      service?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      service?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      const modifier = sortConfig?.direction === 'asc' ? 1 : -1;
      return aValue > bValue ? modifier : -modifier;
    });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ChevronsUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
        size={14} 
        className="text-primary"
      />
    );
  };

  return (
    <div className="bg-card rounded-lg shadow-warm-sm overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Service Performance
          </h3>
          <div className="w-full md:w-80">
            <Input
              type="search"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm caption font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Service Name
                  <SortIcon columnKey="name" />
                </button>
              </th>
              <th className="px-4 md:px-6 py-3 text-left hidden md:table-cell">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-2 text-sm caption font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Category
                  <SortIcon columnKey="category" />
                </button>
              </th>
              <th className="px-4 md:px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('bookings')}
                  className="flex items-center justify-end gap-2 text-sm caption font-medium text-muted-foreground hover:text-foreground transition-smooth ml-auto"
                >
                  Bookings
                  <SortIcon columnKey="bookings" />
                </button>
              </th>
              <th className="px-4 md:px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('revenue')}
                  className="flex items-center justify-end gap-2 text-sm caption font-medium text-muted-foreground hover:text-foreground transition-smooth ml-auto"
                >
                  Revenue
                  <SortIcon columnKey="revenue" />
                </button>
              </th>
              <th className="px-4 md:px-6 py-3 text-right hidden lg:table-cell">
                <button
                  onClick={() => handleSort('avgPrice')}
                  className="flex items-center justify-end gap-2 text-sm caption font-medium text-muted-foreground hover:text-foreground transition-smooth ml-auto"
                >
                  Avg Price
                  <SortIcon columnKey="avgPrice" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedServices?.map((service) => (
              <tr key={service?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex items-center justify-center w-10 h-10 rounded-md flex-shrink-0"
                      style={{ backgroundColor: `${service?.color}15` }}
                    >
                      <Icon name={service?.icon} size={20} color={service?.color} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-body font-medium text-foreground truncate">
                        {service?.name}
                      </p>
                      <p className="text-xs caption text-muted-foreground md:hidden">
                        {service?.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 hidden md:table-cell">
                  <span className="text-sm font-body text-foreground">{service?.category}</span>
                </td>
                <td className="px-4 md:px-6 py-4 text-right">
                  <span className="text-sm font-body font-medium text-foreground data-text">
                    {service?.bookings}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-right">
                  <span className="text-sm font-body font-semibold text-foreground data-text">
                    ${service?.revenue?.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-right hidden lg:table-cell">
                  <span className="text-sm font-body text-foreground data-text">
                    ${service?.avgPrice?.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredAndSortedServices?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
          <p className="text-sm font-body text-muted-foreground">No services found</p>
        </div>
      )}
    </div>
  );
};

export default ServicePerformanceTable;
