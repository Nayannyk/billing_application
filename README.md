# Hairverse Unisex Salon — Billing Application

A web-based billing and management system for **Hairverse Unisex Salon**, Nagpur. Built with React + Vite.

## Features

- **Billing Dashboard** — Metrics overview and recent bills log
- **Create Bill** — Select services, choose/add customers, apply discount, preview bill, print or share via WhatsApp
- **Customer Management** — Add, edit, view customer history and spending
- **Service Catalog** — 35 salon services across 5 categories (Haircuts, Coloring, Treatments, Beauty, Spa Packages)
- **Reports & Analytics** — Sales trends, service performance, customer analytics, peak hours, staff performance
- **Gallery** — Upload, view, and delete salon photos
- **Print Bill** — Generates a clean, bond-paper-style printout (logo, services, totals only)
- **WhatsApp Sharing** — Send invoice directly to customer via WhatsApp

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Tailwind CSS** — Styling
- **React Router v6** — Client-side routing
- **Recharts** — Charts for reports
- **Framer Motion** — Animations
- **Lucide React** — Icons

## Setup

```bash
npm install
npm start
```

Opens at `http://localhost:4028`.

### Build for production

```bash
npm run build
```

Output in `build/` directory.

## Login

Default credentials (demo mode):

| Email | Password | Role |
|-------|----------|------|
| `sudama@hairverse.in` | `Hairverse@2026` | Manager |

## Salon Info

- **Name:** Hairverse Unisex Salon
- **Address:** Near Tuta Bagicha, Sadar Nagpur — 440001
- **Phone:** +91 75593 77506
- **Manager:** Sudama Mankar

## Project Structure

```
src/
├── components/ui/       # Reusable UI components (Button, Input, Select, Header, etc.)
├── context/             # React Context providers (CustomerContext)
├── pages/
│   ├── billing-dashboard/
│   ├── create-bill/
│   ├── customer-management/
│   ├── gallery/
│   ├── login/
│   ├── reports-analytics/
│   └── service-catalog/
├── styles/              # Tailwind CSS with custom theme
└── utils/               # Utility functions
public/assets/images/    # Logo, QR codes, gallery photos
```

## Currency

All pricing in **Indian Rupees (₹)** with `en-IN` locale formatting.

## License

Private — for Hairverse Unisex Salon use.
