import React, { createContext, useContext, useState, useEffect } from 'react';

const SERVICES_KEY = 'hairverse_services';
const CATEGORIES_KEY = 'hairverse_categories';

const ServiceContext = createContext(null);

export const useServices = () => {
  const ctx = useContext(ServiceContext);
  if (!ctx) throw new Error('useServices must be used within ServiceProvider');
  return ctx;
};

const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Haircuts & Styling', description: 'Haircut, beard, blow-dry services', color: '#0F766E' },
  { id: 2, name: 'Hair Coloring', description: 'Color, highlights, root touch-up', color: '#D97706' },
  { id: 3, name: 'Hair Treatments', description: 'Smoothing, straightening, botox, keratin', color: '#0891B2' },
  { id: 4, name: 'Beauty Services', description: 'Facial, manicure, pedicure, waxing', color: '#F59E0B' },
  { id: 5, name: 'Spa & Packages', description: 'Massage, spa packages', color: '#059669' }
];

const DEFAULT_SERVICES = [
  { id: 1, name: 'Haircut', description: 'Professional haircut for men & women', category: 'Haircuts & Styling', duration: 30, price: 149, active: true },
  { id: 2, name: 'Beard Trim', description: 'Beard shaping and trimming', category: 'Haircuts & Styling', duration: 20, price: 99, active: true },
  { id: 3, name: 'Wash & Blow Dry', description: 'Hair wash with blow-dry styling', category: 'Haircuts & Styling', duration: 30, price: 69, active: true },
  { id: 4, name: 'Haircut + Blow-Dry', description: 'Complete haircut with blow-dry finish', category: 'Haircuts & Styling', duration: 45, price: 299, active: true },
  { id: 5, name: 'Hair Color', description: 'Full hair coloring service', category: 'Hair Coloring', duration: 60, price: 399, active: true },
  { id: 6, name: 'Root Touch-up', description: 'Quick root color touch-up', category: 'Hair Coloring', duration: 45, price: 699, active: true },
  { id: 7, name: 'Global Hair Color (Short)', description: 'Full color for short hair length', category: 'Hair Coloring', duration: 90, price: 899, active: true },
  { id: 8, name: 'Global Hair Color (Medium)', description: 'Full color for medium hair length', category: 'Hair Coloring', duration: 120, price: 999, active: true },
  { id: 9, name: 'Global Hair Color (Long)', description: 'Full color for long hair length', category: 'Hair Coloring', duration: 150, price: 1249, active: true },
  { id: 10, name: 'Highlights with Color', description: 'Highlights with color - starting from', category: 'Hair Coloring', duration: 120, price: 1399, priceRange: { min: 1399, max: 4999 }, active: true },
  { id: 11, name: 'Hair Smoothing (Normal)', description: 'Smoothing treatment for normal length hair', category: 'Hair Treatments', duration: 120, price: 1999, active: true },
  { id: 12, name: 'Hair Smoothing (Long)', description: 'Smoothing treatment for long hair', category: 'Hair Treatments', duration: 150, price: 2499, active: true },
  { id: 13, name: 'Hair Smoothing (Very Long)', description: 'Smoothing treatment for very long hair', category: 'Hair Treatments', duration: 180, price: 2999, active: true },
  { id: 14, name: 'Hair Straightening (Normal)', description: 'Straightening for normal length hair', category: 'Hair Treatments', duration: 120, price: 1999, active: true },
  { id: 15, name: 'Hair Straightening (Long)', description: 'Straightening for long hair', category: 'Hair Treatments', duration: 150, price: 2499, active: true },
  { id: 16, name: 'Hair Straightening (Very Long)', description: 'Straightening for very long hair', category: 'Hair Treatments', duration: 180, price: 2999, active: true },
  { id: 17, name: 'Hair Botox (Normal)', description: 'Hair botox treatment for normal length', category: 'Hair Treatments', duration: 90, price: 1999, active: true },
  { id: 18, name: 'Hair Botox (Long)', description: 'Hair botox treatment for long hair', category: 'Hair Treatments', duration: 120, price: 2999, active: true },
  { id: 19, name: 'Hair Botox (Very Long)', description: 'Hair botox treatment for very long hair', category: 'Hair Treatments', duration: 150, price: 3999, active: true },
  { id: 20, name: 'Keratin Treatment (Normal)', description: 'Keratin smoothing for normal length', category: 'Hair Treatments', duration: 180, price: 4999, active: true },
  { id: 21, name: 'Keratin Treatment (Long)', description: 'Keratin smoothing for long hair', category: 'Hair Treatments', duration: 210, price: 5999, active: true },
  { id: 22, name: 'Keratin Treatment (Very Long)', description: 'Keratin smoothing for very long hair', category: 'Hair Treatments', duration: 240, price: 6999, active: true },
  { id: 23, name: 'Nanoplastia (Normal)', description: 'Nanoplastia for normal length hair', category: 'Hair Treatments', duration: 180, price: 5499, active: true },
  { id: 24, name: 'Nanoplastia (Long)', description: 'Nanoplastia for long hair', category: 'Hair Treatments', duration: 210, price: 6499, active: true },
  { id: 25, name: 'Nanoplastia (Very Long)', description: 'Nanoplastia for very long hair', category: 'Hair Treatments', duration: 240, price: 7499, active: true },
  { id: 26, name: 'Facial', description: 'Professional facial cleansing and treatment', category: 'Beauty Services', duration: 45, price: 699, active: true },
  { id: 27, name: 'Manicure / Pedicure', description: 'Complete nail care with polish', category: 'Beauty Services', duration: 60, price: 499, active: true },
  { id: 28, name: 'Threading (Full Face)', description: 'Full face threading', category: 'Beauty Services', duration: 15, price: 49, active: true },
  { id: 29, name: 'Upper Lips', description: 'Upper lip threading', category: 'Beauty Services', duration: 10, price: 69, active: true },
  { id: 30, name: 'Waxing + Threading (Hand & Leg)', description: 'Hand and leg waxing with threading', category: 'Beauty Services', duration: 45, price: 299, active: true },
  { id: 31, name: 'Oil Massage', description: 'Relaxing full body oil massage', category: 'Spa & Packages', duration: 60, price: 1999, active: true },
  { id: 32, name: 'Hair Extension', description: 'Hair extension application', category: 'Beauty Services', duration: 60, price: 499, active: true },
  { id: 33, name: 'Hair Patch', description: 'Hair patch application', category: 'Hair Treatments', duration: 120, price: 6000, active: true },
  { id: 34, name: 'Basic Package', description: 'Haircut + Facial + Hair Spa', category: 'Spa & Packages', duration: 120, price: 1099, active: true },
  { id: 35, name: 'Premium Package', description: 'Haircut + Facial + Hair Spa + Color + Head Massage', category: 'Spa & Packages', duration: 180, price: 1999, active: true }
];

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
};

const saveToStorage = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
};

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState(() => loadFromStorage(SERVICES_KEY, DEFAULT_SERVICES));
  const [categories, setCategories] = useState(() => loadFromStorage(CATEGORIES_KEY, DEFAULT_CATEGORIES));

  useEffect(() => { saveToStorage(SERVICES_KEY, services); }, [services]);
  useEffect(() => { saveToStorage(CATEGORIES_KEY, categories); }, [categories]);

  return (
    <ServiceContext.Provider value={{ services, setServices, categories, setCategories }}>
      {children}
    </ServiceContext.Provider>
  );
};
