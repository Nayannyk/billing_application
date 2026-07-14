# Hairverse Unisex Salon — Billing Application

A web-based billing and management system for **Hairverse Unisex Salon**, Nagpur. Built with React + Vite, with an optional Electron wrapper for a standalone Windows desktop app.

## Features

- **Billing Dashboard** — Live metrics (today's sales, bills, customers), filterable bills table with status badges, bill view modal
- **Create Bill** — Select/add services, choose or add customers inline, apply percentage discounts, live bill preview, save as invoice, print, or share via WhatsApp
- **Customer Management** — Full CRUD, search by name/phone/email, VIP/Regular/Occasional filtering, sortable columns, customer history and spending, bulk actions
- **Service Catalog** — 35 salon services across 5 categories, add/edit/delete services, category management, import/export, bulk enable/disable, card and table views
- **Reports & Analytics** — Sales trend charts, service performance table, customer analytics, peak hours chart, staff performance, date range filtering, CSV/PDF export
- **Gallery** — Upload and view salon photos, full-screen lightbox, delete support
- **Print Bill** — Bond-paper-style printout (salon logo, services table, totals)
- **WhatsApp Sharing** — Generate PDF invoice and send directly to customer via WhatsApp Web
- **Dark Mode** — Full light/dark theme support via CSS custom properties
- **Responsive** — Mobile-friendly with adaptive layouts (cards on mobile, tables on desktop)
- **Login** — Role-based login screen with salon branding

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3.4 with custom design tokens |
| Routing | React Router DOM 6 |
| State Management | React Context API (3 providers) |
| Data Persistence | LocalStorage |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React (via dynamic `AppIcon` wrapper) |
| PDF Generation | jsPDF + html2canvas |
| Form Handling | React Hook Form |
| Date Utilities | date-fns |
| CSS Utilities | clsx, tailwind-merge, class-variance-authority |
| Desktop Wrapper | Electron 43 + electron-builder |

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Create Bill | Default landing page |
| `/create-bill` | Create Bill | Invoice creation with service/customer selection |
| `/billing-dashboard` | Dashboard | Metrics overview and bills log |
| `/customer-management` | Customers | Customer CRUD and history |
| `/service-catalog` | Services | Service and category management |
| `/reports-analytics` | Reports | Charts, analytics, and exports |
| `/login` | Login | Authentication screen |
| `*` | 404 | Page not found |

## Setup

### Prerequisites

- Node.js 16+
- npm

### Install & Run

```bash
git clone https://github.com/Nayannyk/billing_application.git
cd billing_application
npm install
npm start
```

Opens at `http://localhost:4028`.

### Build for Production

```bash
npm run build
```

Output goes to the `build/` directory. To preview the build:

```bash
npm run serve
```

### Create Windows .exe (Standalone Desktop App)

The project includes a pre-configured Electron setup in `electron/main.js` that serves the production build via a local HTTP server (port 4029).

```bash
npm run dist
```

This runs `vite build` then packages into a Windows NSIS installer via `electron-builder`. The installer `.exe` will be in the `dist/` directory.

Alternatively, build and package separately:

```bash
npm run build
npx electron-builder --win
```

> **Note:** The first run may trigger a Windows SmartScreen warning. Click "More info" -> "Run anyway".

## Environment Variables

Create a `.env` file in the project root. The app uses Vite's `VITE_` prefix for env vars:

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL (for future database integration) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `VITE_OPENAI_API_KEY` | OpenAI API key |
| `VITE_GEMINI_API_KEY` | Google Gemini API key |
| `VITE_ANTHROPIC_API_KEY` | Anthropic API key |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics measurement ID |
| `VITE_ADSENSE_ID` | Google AdSense ID |
| `VITE_PERPLEXITY_API_KEY` | Perplexity API key |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

> All API keys are optional. The app functions fully offline using `localStorage` for data persistence.

## Login

Default credentials (demo mode):

| Email | Password | Role |
|---|---|---|
| `sudama@hairverse.in` | `Hairverse@2026` | Manager |

## Project Structure

```
billing_application/
├── electron/
│   └── main.js                      # Electron main process (HTTP server + BrowserWindow)
├── public/
│   ├── assets/images/
│   │   ├── Logo.png                 # Salon logo
│   │   ├── Instagram.png            # Instagram QR/link image
│   │   ├── WhatsApp QR.png          # WhatsApp QR code
│   │   ├── no_image.png             # Placeholder for missing images
│   │   └── gallery/                 # Pre-loaded gallery photos
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── _redirects
├── src/
│   ├── App.jsx                      # Root component (wraps providers + Routes)
│   ├── index.jsx                    # Entry point (renders App)
│   ├── Routes.jsx                   # All route definitions (React Router)
│   │
│   ├── components/
│   │   ├── AppIcon.jsx              # Dynamic Lucide icon wrapper
│   │   ├── AppImage.jsx             # Image with fallback placeholder
│   │   ├── ErrorBoundary.jsx        # Class-based error boundary
│   │   ├── ScrollToTop.jsx          # Scrolls to top on route change
│   │   └── ui/
│   │       ├── ActionButtonZone.jsx # Reusable primary + secondary action buttons
│   │       ├── Button.jsx           # Full-featured button (9 variants, 6 sizes, loading, icons)
│   │       ├── Checkbox.jsx         # Custom checkbox with group support
│   │       ├── Header.jsx           # Global nav header (logo, nav links, user menu)
│   │       ├── Input.jsx            # Text input with label, description, error states
│   │       ├── PageTitle.jsx        # Dynamic page title with breadcrumbs
│   │       └── Select.jsx           # Custom dropdown (single/multi, searchable, clearable)
│   │
│   ├── context/
│   │   ├── BillContext.jsx           # Bills state + addBill (auto-generates INV-YYYY-NNN numbers)
│   │   ├── CustomerContext.jsx       # Customers CRUD (localStorage-backed)
│   │   └── ServiceContext.jsx        # Services + categories state (35 default services, 5 categories)
│   │
│   ├── pages/
│   │   ├── NotFound.jsx             # 404 page
│   │   ├── billing-dashboard/
│   │   │   ├── index.jsx            # Dashboard with live metrics and bills table
│   │   │   └── components/
│   │   │       ├── BillCard.jsx         # Mobile bill card
│   │   │       ├── BillStatusBadge.jsx  # Paid/pending status badge
│   │   │       ├── BillTableRow.jsx     # Desktop table row
│   │   │       ├── BillViewModal.jsx    # Bill detail modal
│   │   │       ├── FilterBar.jsx        # Search + date/status/staff filters
│   │   │       └── MetricsCard.jsx      # KPI metric card
│   │   ├── create-bill/
│   │   │   ├── index.jsx            # Invoice creation page
│   │   │   └── components/
│   │   │       ├── BillPreview.jsx      # Live invoice preview + print template
│   │   │       ├── CustomerSelector.jsx # Search/add customer inline
│   │   │       ├── DiscountModal.jsx    # Discount percentage input modal
│   │   │       ├── ServiceSelector.jsx  # Add services from catalog
│   │   │       └── WhatsAppModal.jsx    # WhatsApp share confirmation
│   │   ├── customer-management/
│   │   │   ├── index.jsx            # Customer CRUD page
│   │   │   └── components/
│   │   │       ├── BulkActionsBar.jsx   # Batch operations toolbar
│   │   │       ├── CustomerCard.jsx     # Mobile customer card
│   │   │       ├── CustomerForm.jsx     # Add/edit customer form
│   │   │       ├── CustomerModal.jsx    # View customer details/history
│   │   │       └── CustomerTable.jsx    # Desktop sortable table
│   │   ├── gallery/
│   │   │   └── index.jsx            # Photo gallery with upload + lightbox
│   │   ├── login/
│   │   │   ├── index.jsx            # Login page
│   │   │   └── components/
│   │   │       ├── BrandHeader.jsx      # Logo + salon name
│   │   │       ├── LoginForm.jsx        # Email/password form
│   │   │       ├── RoleInfoCard.jsx     # Role descriptions
│   │   │       ├── SecurityBadge.jsx    # Security notice
│   │   │       └── WelcomeMessage.jsx   # Welcome text
│   │   ├── reports-analytics/
│   │   │   ├── index.jsx            # Reports and analytics page
│   │   │   └── components/
│   │   │       ├── CustomerAnalytics.jsx    # Customer insights
│   │   │       ├── DateRangeSelector.jsx    # Date range picker
│   │   │       ├── ExportModal.jsx          # CSV/PDF export dialog
│   │   │       ├── MetricCard.jsx           # KPI card
│   │   │       ├── PeakHoursChart.jsx       # Peak hours visualization
│   │   │       ├── SalesChart.jsx           # Sales trend chart (line/bar)
│   │   │       ├── ServicePerformanceTable.jsx # Service metrics table
│   │   │       └── StaffPerformance.jsx     # Staff metrics
│   │   └── service-catalog/
│   │       ├── index.jsx            # Service management page
│   │       └── components/
│   │           ├── BulkActionsBar.jsx   # Batch enable/disable/delete
│   │           ├── CategoryModal.jsx    # Add/edit categories
│   │           ├── ImportModal.jsx      # Import services
│   │           ├── ServiceCard.jsx      # Mobile service card
│   │           ├── ServiceModal.jsx     # Add/edit service modal
│   │           └── ServiceTable.jsx     # Desktop service table
│   │
│   ├── styles/
│   │   ├── index.css                # Base styles (body reset, box-sizing)
│   │   └── tailwind.css             # Tailwind imports + CSS custom properties + print styles
│   │
│   └── utils/
│       └── cn.js                    # clsx + tailwind-merge utility
│
├── build/                           # Vite production output
├── dist/                            # Electron-builder output (Windows installer)
├── images/                          # Source images (logos, gallery originals)
├── .env                             # Environment variables (API keys)
├── index.html                       # Vite HTML entry point
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.mjs
└── jsconfig.json
```

**Total: 62 source files** across components, pages, context, styles, and utils.

## Design System

The app uses a custom design token system defined in `src/styles/tailwind.css`:

- **Fonts:** Outfit (headings), Source Sans 3 (body), Inter (captions), JetBrains Mono (data/numbers)
- **Primary:** Teal (`#0F766E` light / `#14B8A6` dark)
- **Secondary:** Cyan (`#0891B2` light / `#06B6D4` dark)
- **Accent:** Amber (`#F59E0B` light / `#FCD34D` dark)
- **Status colors:** Success (emerald), Warning (amber), Error (red)
- **Shadows:** Custom warm-teal tinted shadows at 4 levels (sm, md, lg, xl)
- **Border radius:** 4 levels (6px, 12px, 18px, 24px)
- **Dark mode:** Full dark theme via `.dark` class toggle

## Salon Info

- **Name:** Hairverse Unisex Salon
- **Address:** Near Tuta Bagicha, Sadar Nagpur — 440001
- **Phone:** +91 75593 77506
- **Manager:** Sudama Mankar

## Currency

All pricing in **Indian Rupees** with `en-IN` locale formatting.

## License

Private — for Hairverse Unisex Salon use.
