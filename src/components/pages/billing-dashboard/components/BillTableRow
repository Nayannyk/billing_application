import React from 'react';

import Button from '../../../components/ui/Button';
import BillStatusBadge from './BillStatusBadge';

const BillTableRow = ({ bill, onView, onEdit, onShare, onPrint }) => {
  return (
    <tr className="border-b border-border hover:bg-muted/50 transition-smooth">
      <td className="px-4 md:px-6 py-4">
        <div className="font-medium text-foreground">{bill?.billNumber}</div>
        <div className="text-xs caption text-muted-foreground mt-1">{bill?.date}</div>
      </td>
      <td className="px-4 md:px-6 py-4">
        <div className="font-medium text-foreground">{bill?.customerName}</div>
        <div className="text-xs caption text-muted-foreground mt-1">{bill?.customerPhone}</div>
      </td>
      <td className="px-4 md:px-6 py-4 hidden lg:table-cell">
        <div className="text-sm text-foreground">{bill?.services}</div>
      </td>
      <td className="px-4 md:px-6 py-4">
        <div className="font-semibold text-foreground data-text">${bill?.amount}</div>
      </td>
      <td className="px-4 md:px-6 py-4 hidden md:table-cell">
        <BillStatusBadge status={bill?.status} />
      </td>
      <td className="px-4 md:px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            iconName="Eye"
            onClick={() => onView(bill)}
            className="hover:bg-primary/10 hover:text-primary"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="Edit"
            onClick={() => onEdit(bill)}
            className="hover:bg-secondary/10 hover:text-secondary"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="MessageCircle"
            onClick={() => onShare(bill)}
            className="hover:bg-success/10 hover:text-success"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="Printer"
            onClick={() => onPrint(bill)}
            className="hidden sm:flex hover:bg-accent/10 hover:text-accent"
          />
        </div>
      </td>
    </tr>
  );
};

export default BillTableRow;
