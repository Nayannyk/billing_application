import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = ({ user, onLogout }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/billing-dashboard', icon: 'LayoutDashboard' },
    { label: 'New Bill', path: '/create-bill', icon: 'Plus' },
    { label: 'Customers', path: '/customer-management', icon: 'Users' },
    { label: 'Services', path: '/service-catalog', icon: 'Package' },
    { label: 'Reports', path: '/reports-analytics', icon: 'BarChart3' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleLogout = () => {
    setUserMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-card shadow-warm-md">
      <div className="flex items-center justify-between h-20 px-6">
        <div className="flex items-center gap-8">
          <Link to="/billing-dashboard" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 transition-smooth hover:bg-primary/20">
              <Icon name="Scissors" size={28} color="var(--color-primary)" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              SalonBill Pro
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-md font-body font-medium
                  transition-smooth hover:scale-[1.02] active:scale-[0.98]
                  ${isActive(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-warm-sm'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={20} strokeWidth={2} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-smooth"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-heading font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-body font-medium text-foreground">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs caption text-muted-foreground">
                  {user?.role || 'Staff'}
                </div>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-smooth ${userMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {userMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-[90]" 
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover rounded-md shadow-warm-lg z-[100] animate-slide-down">
                  <div className="p-4 border-b border-border">
                    <div className="text-sm font-body font-medium text-popover-foreground">
                      {user?.name || 'User'}
                    </div>
                    <div className="text-xs caption text-muted-foreground mt-1">
                      {user?.email || 'user@salonbill.com'}
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-left font-body hover:bg-muted transition-smooth"
                    >
                      <Icon name="LogOut" size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-12 h-12 rounded-md bg-muted hover:bg-muted/80 transition-smooth"
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[90] bg-background"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="fixed top-20 left-0 right-0 bottom-0 z-[100] bg-card overflow-y-auto lg:hidden">
            <div className="p-6 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-6 py-4 rounded-md font-body font-medium
                    transition-smooth active:scale-[0.98]
                    ${isActive(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-warm-sm'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={22} strokeWidth={2} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
