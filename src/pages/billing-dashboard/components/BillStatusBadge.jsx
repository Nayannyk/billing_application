import React from 'react';

const BillStatusBadge = ({ status }) => {
  const statusConfig = {
    paid: {
      label: 'Paid',
      className: 'bg-success/10 text-success border-success/20'
    },
    pending: {
      label: 'Pending',
      className: 'bg-warning/10 text-warning border-warning/20'
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-error/10 text-error border-error/20'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.pending;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${config?.className}`}>
      {config?.label}
    </span>
  );
};

export default BillStatusBadge;
