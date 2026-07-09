import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'hairverse_bills';
const COUNTER_KEY = 'hairverse_bill_counter';

const BillContext = createContext(null);

export const useBills = () => {
  const ctx = useContext(BillContext);
  if (!ctx) throw new Error('useBills must be used within BillProvider');
  return ctx;
};

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveToStorage = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
};

const nextBillNumber = () => {
  const year = new Date().getFullYear();
  const key = `${COUNTER_KEY}_${year}`;
  let count = 1;
  try {
    const raw = localStorage.getItem(key);
    count = raw ? parseInt(raw, 10) + 1 : 1;
  } catch { count = 1; }
  try { localStorage.setItem(key, String(count)); } catch {}
  return `INV-${year}-${String(count).padStart(3, '0')}`;
};

export const BillProvider = ({ children }) => {
  const [bills, setBills] = useState(loadFromStorage);

  useEffect(() => { saveToStorage(bills); }, [bills]);

  const addBill = useCallback((billData) => {
    const bill = {
      id: Date.now(),
      billNumber: nextBillNumber(),
      customerName: billData.customer?.name || 'Walk-in',
      customerPhone: billData.customer?.phone || '',
      services: billData.services?.map(s => s.name).join(', ') || '',
      amount: billData.total?.toFixed(2),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      status: 'paid',
      items: billData.services || [],
      subtotal: billData.subtotal,
      discount: billData.discount,
      total: billData.total,
      customer: billData.customer
    };
    setBills(prev => [bill, ...prev]);
    return bill;
  }, []);

  return (
    <BillContext.Provider value={{ bills, addBill }}>
      {children}
    </BillContext.Provider>
  );
};
