import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';

const PageTitle = () => {
  const location = useLocation();

  const pageTitles = {
    '/billing-dashboard': {
      title: 'Billing Dashboard',
      description: 'Overview of daily operations and recent activity',
      icon: 'LayoutDashboard',
    },
    '/create-bill': {
      title: 'Create New Bill',
      description: 'Generate invoice for customer services',
      icon: 'Plus',
    },
    '/customer-management': {
      title: 'Customer Management',
      description: 'Manage customer data and relationship tracking',
      icon: 'Users',
    },
    '/service-catalog': {
      title: 'Service Catalog',
      description: 'Manage pricing and service offerings',
      icon: 'Package',
    },
    '/reports-analytics': {
      title: 'Reports & Analytics',
      description: 'Business intelligence and performance analysis',
      icon: 'BarChart3',
    },
  };

  const currentPage = pageTitles?.[location?.pathname] || {
    title: 'SalonBill Pro',
    description: 'Professional salon billing management',
    icon: 'Scissors',
  };

  const breadcrumbs = [];
  if (location?.pathname !== '/billing-dashboard') {
    breadcrumbs?.push({ label: 'Dashboard', path: '/billing-dashboard' });
    breadcrumbs?.push({ label: currentPage?.title, path: location?.pathname });
  }

  return (
    <div className="bg-background border-b border-border">
      <div className="px-6 py-6">
        {breadcrumbs?.length > 0 && (
          <nav className="flex items-center gap-2 mb-4 caption text-muted-foreground">
            {breadcrumbs?.map((crumb, index) => (
              <React.Fragment key={crumb?.path}>
                {index > 0 && (
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                )}
                {index === breadcrumbs?.length - 1 ? (
                  <span className="text-foreground font-medium">{crumb?.label}</span>
                ) : (
                  <Link
                    to={crumb?.path}
                    className="hover:text-primary transition-smooth"
                  >
                    {crumb?.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-md bg-primary/10">
            <Icon 
              name={currentPage?.icon} 
              size={28} 
              color="var(--color-primary)" 
              strokeWidth={2}
            />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              {currentPage?.title}
            </h1>
            <p className="text-sm caption text-muted-foreground mt-1">
              {currentPage?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
