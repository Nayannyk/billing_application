import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerTable = ({ 
  customers, 
  onEdit, 
  onViewHistory, 
  onCreateBill,
  onRowClick,
  sortConfig,
  onSort 
}) => {
  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ChevronsUpDown';
    return sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 md:px-6">
              <button
                onClick={() => onSort('name')}
                className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-smooth"
              >
                Customer Name
                <Icon name={getSortIcon('name')} size={16} />
              </button>
            </th>
            <th className="text-left py-4 px-4 md:px-6">
              <button
                onClick={() => onSort('phone')}
                className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-smooth"
              >
                Phone
                <Icon name={getSortIcon('phone')} size={16} />
              </button>
            </th>
            <th className="text-left py-4 px-4 md:px-6 hidden lg:table-cell">
              <button
                onClick={() => onSort('email')}
                className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-smooth"
              >
                Email
                <Icon name={getSortIcon('email')} size={16} />
              </button>
            </th>
            <th className="text-left py-4 px-4 md:px-6 hidden md:table-cell">
              <button
                onClick={() => onSort('lastVisit')}
                className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-smooth"
              >
                Last Visit
                <Icon name={getSortIcon('lastVisit')} size={16} />
              </button>
            </th>
            <th className="text-right py-4 px-4 md:px-6 hidden sm:table-cell">
              <button
                onClick={() => onSort('totalSpent')}
                className="flex items-center gap-2 justify-end font-heading font-semibold text-sm text-foreground hover:text-primary transition-smooth"
              >
                Total Spent
                <Icon name={getSortIcon('totalSpent')} size={16} />
              </button>
            </th>
            <th className="text-right py-4 px-4 md:px-6">
              <span className="font-heading font-semibold text-sm text-foreground">
                Actions
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <tr
              key={customer?.id}
              onClick={() => onRowClick(customer)}
              className="border-b border-border hover:bg-muted/50 transition-smooth cursor-pointer"
            >
              <td className="py-4 px-4 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-heading font-semibold flex-shrink-0">
                    {customer?.name?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-body font-medium text-foreground truncate">
                      {customer?.name}
                    </div>
                    <div className="caption text-muted-foreground lg:hidden truncate">
                      {customer?.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 md:px-6">
                <div className="flex items-center gap-2 text-sm font-body text-foreground">
                  <Icon name="Phone" size={14} className="text-muted-foreground flex-shrink-0" />
                  <span className="whitespace-nowrap">{customer?.phone}</span>
                </div>
              </td>
              <td className="py-4 px-4 md:px-6 hidden lg:table-cell">
                <div className="flex items-center gap-2 text-sm font-body text-foreground">
                  <Icon name="Mail" size={14} className="text-muted-foreground flex-shrink-0" />
                  <span className="truncate max-w-[200px]">{customer?.email}</span>
                </div>
              </td>
              <td className="py-4 px-4 md:px-6 hidden md:table-cell">
                <span className="text-sm font-body text-foreground whitespace-nowrap">
                  {formatDate(customer?.lastVisit)}
                </span>
              </td>
              <td className="py-4 px-4 md:px-6 text-right hidden sm:table-cell">
                <span className="text-sm font-body font-semibold text-foreground data-text whitespace-nowrap">
                  {formatCurrency(customer?.totalSpent)}
                </span>
              </td>
              <td className="py-4 px-4 md:px-6">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="Edit"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onEdit(customer);
                    }}
                    className="hidden sm:flex"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="History"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onViewHistory(customer);
                    }}
                    className="hidden md:flex"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="FileText"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onCreateBill(customer);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
