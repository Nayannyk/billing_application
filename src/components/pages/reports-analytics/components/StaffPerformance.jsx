import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StaffPerformance = ({ staffData }) => {
  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-warm-sm">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Staff Performance
      </h3>
      <div className="space-y-4">
        {staffData?.map((staff) => (
          <div key={staff?.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-md hover:bg-muted/50 transition-smooth">
            <Image
              src={staff?.avatar}
              alt={staff?.avatarAlt}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-body font-medium text-foreground truncate">
                  {staff?.name}
                </p>
                {staff?.topPerformer && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-accent/10 rounded-md flex-shrink-0">
                    <Icon name="Award" size={12} color="var(--color-accent)" strokeWidth={2} />
                    <span className="text-xs caption font-medium text-accent">Top</span>
                  </div>
                )}
              </div>
              <p className="text-xs caption text-muted-foreground mb-2">{staff?.role}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <div>
                  <p className="text-xs caption text-muted-foreground">Services</p>
                  <p className="text-sm font-body font-semibold text-foreground data-text">
                    {staff?.servicesCompleted}
                  </p>
                </div>
                <div>
                  <p className="text-xs caption text-muted-foreground">Revenue</p>
                  <p className="text-sm font-body font-semibold text-foreground data-text">
                    ${staff?.revenue?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs caption text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} color="var(--color-accent)" fill="var(--color-accent)" />
                    <p className="text-sm font-body font-semibold text-foreground data-text">
                      {staff?.rating}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs caption text-muted-foreground">Avg Time</p>
                  <p className="text-sm font-body font-semibold text-foreground data-text">
                    {staff?.avgServiceTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPerformance;
