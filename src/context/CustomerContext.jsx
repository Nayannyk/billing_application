import React, { createContext, useContext, useState, useCallback } from 'react';

const CustomerContext = createContext(null);

export const useCustomers = () => {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error('useCustomers must be used within CustomerProvider');
  return ctx;
};

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  const addCustomer = useCallback((customer) => {
    const newCustomer = {
      ...customer,
      id: customer.id || Date.now(),
      lastVisit: customer.lastVisit || new Date().toISOString(),
      totalSpent: customer.totalSpent || 0,
      visitFrequency: customer.visitFrequency || 'New Customer',
      serviceHistory: customer.serviceHistory || []
    };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  }, []);

  const updateCustomer = useCallback((customerData) => {
    setCustomers(prev => prev.map(c => c.id === customerData.id ? { ...c, ...customerData } : c));
  }, []);

  const deleteCustomer = useCallback((id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  }, []);

  return (
    <CustomerContext.Provider value={{ customers, setCustomers, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
