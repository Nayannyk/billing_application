import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CustomerAnalytics = ({ data }) => {
  const COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', 'var(--color-success)'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-md shadow-warm-lg p-3">
          <p className="text-sm font-body font-medium text-popover-foreground mb-1">
            {payload?.[0]?.name}
          </p>
          <p className="text-xs caption text-muted-foreground">
            {payload?.[0]?.value} customers ({payload?.[0]?.payload?.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-warm-sm">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Customer Analytics
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full h-64" aria-label="Customer Distribution Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="var(--color-primary)"
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {data?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                />
                <div>
                  <p className="text-sm font-body font-medium text-foreground">{item?.name}</p>
                  <p className="text-xs caption text-muted-foreground">{item?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-body font-semibold text-foreground data-text">
                  {item?.value}
                </p>
                <p className="text-xs caption text-muted-foreground">{item?.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3 p-3 bg-success/10 rounded-md">
          <Icon name="UserCheck" size={24} color="var(--color-success)" strokeWidth={2} />
          <div>
            <p className="text-xs caption text-muted-foreground">Retention Rate</p>
            <p className="text-lg font-heading font-semibold text-foreground data-text">78.5%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-md">
          <Icon name="UserPlus" size={24} color="var(--color-primary)" strokeWidth={2} />
          <div>
            <p className="text-xs caption text-muted-foreground">New Customers</p>
            <p className="text-lg font-heading font-semibold text-foreground data-text">142</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-md">
          <Icon name="Repeat" size={24} color="var(--color-accent)" strokeWidth={2} />
          <div>
            <p className="text-xs caption text-muted-foreground">Avg Visits</p>
            <p className="text-lg font-heading font-semibold text-foreground data-text">3.2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
