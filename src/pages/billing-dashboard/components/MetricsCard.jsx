import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, iconColor }) => {
  const isPositiveTrend = trend === 'up';
  
  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-warm-sm hover:shadow-warm-md transition-smooth border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm caption text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground data-text">
            {value}
          </h3>
        </div>
        <div 
          className="flex items-center justify-center w-12 h-12 rounded-md"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon name={icon} size={24} color={iconColor} strokeWidth={2} />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            isPositiveTrend ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <Icon 
              name={isPositiveTrend ? 'TrendingUp' : 'TrendingDown'} 
              size={14} 
              strokeWidth={2}
            />
            <span className="text-xs font-medium data-text">{trendValue}</span>
          </div>
        )}
        <p className="text-xs caption text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

export default MetricsCard;
