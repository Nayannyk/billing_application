import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor }) => {
  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-warm-sm hover:shadow-warm-md transition-smooth">
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
      
      {change && (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            isPositive ? 'bg-success/10 text-success' : isNegative ?'bg-error/10 text-error': 'bg-muted text-muted-foreground'
          }`}>
            <Icon 
              name={isPositive ? 'TrendingUp' : isNegative ? 'TrendingDown' : 'Minus'} 
              size={14} 
              strokeWidth={2}
            />
            <span className="text-xs font-body font-medium">{change}</span>
          </div>
          <span className="text-xs caption text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
