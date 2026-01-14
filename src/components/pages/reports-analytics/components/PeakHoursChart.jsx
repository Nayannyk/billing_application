import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PeakHoursChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-md shadow-warm-lg p-3">
          <p className="text-sm font-body font-medium text-popover-foreground mb-1">{label}</p>
          <p className="text-xs caption text-muted-foreground">
            Bookings: <span className="font-medium text-foreground data-text">{payload?.[0]?.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-warm-sm">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Peak Hours Analysis
      </h3>
      <div className="w-full h-64 md:h-80" aria-label="Peak Hours Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="hour" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="bookings" 
              fill="var(--color-secondary)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeakHoursChart;
