import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ServiceCatalog from './pages/service-catalog';
import CreateBill from './pages/create-bill';
import Login from './pages/login';
import CustomerManagement from './pages/customer-management';
import BillingDashboard from './pages/billing-dashboard';
import ReportsAnalytics from './pages/reports-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CreateBill />} />
        <Route path="/service-catalog" element={<ServiceCatalog />} />
        <Route path="/create-bill" element={<CreateBill />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="/billing-dashboard" element={<BillingDashboard />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
