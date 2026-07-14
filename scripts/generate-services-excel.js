const XLSX = require('xlsx');
const path = require('path');

const SERVICES = [
  { id: 1, name: 'Haircut', description: 'Professional haircut for men & women', category: 'Haircuts & Styling', duration: 30, price: 149, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 2, name: 'Beard Trim', description: 'Beard shaping and trimming', category: 'Haircuts & Styling', duration: 20, price: 99, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 3, name: 'Wash & Blow Dry', description: 'Hair wash with blow-dry styling', category: 'Haircuts & Styling', duration: 30, price: 69, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 4, name: 'Haircut + Blow-Dry', description: 'Complete haircut with blow-dry finish', category: 'Haircuts & Styling', duration: 45, price: 299, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 5, name: 'Hair Color', description: 'Full hair coloring service', category: 'Hair Coloring', duration: 60, price: 399, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 6, name: 'Root Touch-up', description: 'Quick root color touch-up', category: 'Hair Coloring', duration: 45, price: 699, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 7, name: 'Global Hair Color (Short)', description: 'Full color for short hair length', category: 'Hair Coloring', duration: 90, price: 899, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 8, name: 'Global Hair Color (Medium)', description: 'Full color for medium hair length', category: 'Hair Coloring', duration: 120, price: 999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 9, name: 'Global Hair Color (Long)', description: 'Full color for long hair length', category: 'Hair Coloring', duration: 150, price: 1249, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 10, name: 'Highlights with Color', description: 'Highlights with color - starting from', category: 'Hair Coloring', duration: 120, price: 1399, active: true, priceRangeMin: 1399, priceRangeMax: 4999 },
  { id: 11, name: 'Hair Smoothing (Normal)', description: 'Smoothing treatment for normal length hair', category: 'Hair Treatments', duration: 120, price: 1999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 12, name: 'Hair Smoothing (Long)', description: 'Smoothing treatment for long hair', category: 'Hair Treatments', duration: 150, price: 2499, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 13, name: 'Hair Smoothing (Very Long)', description: 'Smoothing treatment for very long hair', category: 'Hair Treatments', duration: 180, price: 2999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 14, name: 'Hair Straightening (Normal)', description: 'Straightening for normal length hair', category: 'Hair Treatments', duration: 120, price: 1999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 15, name: 'Hair Straightening (Long)', description: 'Straightening for long hair', category: 'Hair Treatments', duration: 150, price: 2499, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 16, name: 'Hair Straightening (Very Long)', description: 'Straightening for very long hair', category: 'Hair Treatments', duration: 180, price: 2999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 17, name: 'Hair Botox (Normal)', description: 'Hair botox treatment for normal length', category: 'Hair Treatments', duration: 90, price: 1999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 18, name: 'Hair Botox (Long)', description: 'Hair botox treatment for long hair', category: 'Hair Treatments', duration: 120, price: 2999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 19, name: 'Hair Botox (Very Long)', description: 'Hair botox treatment for very long hair', category: 'Hair Treatments', duration: 150, price: 3999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 20, name: 'Keratin Treatment (Normal)', description: 'Keratin smoothing for normal length', category: 'Hair Treatments', duration: 180, price: 4999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 21, name: 'Keratin Treatment (Long)', description: 'Keratin smoothing for long hair', category: 'Hair Treatments', duration: 210, price: 5999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 22, name: 'Keratin Treatment (Very Long)', description: 'Keratin smoothing for very long hair', category: 'Hair Treatments', duration: 240, price: 6999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 23, name: 'Nanoplastia (Normal)', description: 'Nanoplastia for normal length hair', category: 'Hair Treatments', duration: 180, price: 5499, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 24, name: 'Nanoplastia (Long)', description: 'Nanoplastia for long hair', category: 'Hair Treatments', duration: 210, price: 6499, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 25, name: 'Nanoplastia (Very Long)', description: 'Nanoplastia for very long hair', category: 'Hair Treatments', duration: 240, price: 7499, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 26, name: 'Facial', description: 'Professional facial cleansing and treatment', category: 'Beauty Services', duration: 45, price: 699, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 27, name: 'Manicure / Pedicure', description: 'Complete nail care with polish', category: 'Beauty Services', duration: 60, price: 499, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 28, name: 'Threading (Full Face)', description: 'Full face threading', category: 'Beauty Services', duration: 15, price: 49, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 29, name: 'Upper Lips', description: 'Upper lip threading', category: 'Beauty Services', duration: 10, price: 69, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 30, name: 'Waxing + Threading (Hand & Leg)', description: 'Hand and leg waxing with threading', category: 'Beauty Services', duration: 45, price: 299, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 31, name: 'Oil Massage', description: 'Relaxing full body oil massage', category: 'Spa & Packages', duration: 60, price: 1999, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 32, name: 'Hair Extension', description: 'Hair extension application', category: 'Beauty Services', duration: 60, price: 499, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 33, name: 'Hair Patch', description: 'Hair patch application', category: 'Hair Treatments', duration: 120, price: 6000, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 34, name: 'Basic Package', description: 'Haircut + Facial + Hair Spa', category: 'Spa & Packages', duration: 120, price: 1099, active: true, priceRangeMin: '', priceRangeMax: '' },
  { id: 35, name: 'Premium Package', description: 'Haircut + Facial + Hair Spa + Color + Head Massage', category: 'Spa & Packages', duration: 180, price: 1999, active: true, priceRangeMin: '', priceRangeMax: '' }
];

const CATEGORIES = [
  { id: 1, name: 'Haircuts & Styling', description: 'Haircut, beard, blow-dry services', color: '#0F766E' },
  { id: 2, name: 'Hair Coloring', description: 'Color, highlights, root touch-up', color: '#D97706' },
  { id: 3, name: 'Hair Treatments', description: 'Smoothing, straightening, botox, keratin', color: '#0891B2' },
  { id: 4, name: 'Beauty Services', description: 'Facial, manicure, pedicure, waxing', color: '#F59E0B' },
  { id: 5, name: 'Spa & Packages', description: 'Massage, spa packages', color: '#059669' }
];

// Create workbook
const wb = XLSX.utils.book_new();

// Services sheet
const servicesHeaders = ['ID', 'Name', 'Description', 'Category', 'Duration (min)', 'Price (INR)', 'Active', 'Price Range Min', 'Price Range Max'];
const servicesData = SERVICES.map(s => [
  s.id, s.name, s.description, s.category, s.duration, s.price, s.active ? 'Yes' : 'No', s.priceRangeMin, s.priceRangeMax
]);
const servicesSheet = XLSX.utils.aoa_to_sheet([servicesHeaders, ...servicesData]);

// Set column widths
servicesSheet['!cols'] = [
  { wch: 5 },   // ID
  { wch: 35 },  // Name
  { wch: 50 },  // Description
  { wch: 20 },  // Category
  { wch: 15 },  // Duration
  { wch: 12 },  // Price
  { wch: 10 },  // Active
  { wch: 15 },  // Price Range Min
  { wch: 15 },  // Price Range Max
];

XLSX.utils.book_append_sheet(wb, servicesSheet, 'Services');

// Categories sheet
const categoriesHeaders = ['ID', 'Name', 'Description', 'Color'];
const categoriesData = CATEGORIES.map(c => [c.id, c.name, c.description, c.color]);
const categoriesSheet = XLSX.utils.aoa_to_sheet([categoriesHeaders, ...categoriesData]);

categoriesSheet['!cols'] = [
  { wch: 5 },
  { wch: 20 },
  { wch: 50 },
  { wch: 10 },
];

XLSX.utils.book_append_sheet(wb, categoriesSheet, 'Categories');

// Write file to public folder so it can be served by Vite
const outputPath = path.join(__dirname, '..', 'public', 'services.xlsx');
XLSX.writeFile(wb, outputPath);
console.log(`Excel file created at: ${outputPath}`);
