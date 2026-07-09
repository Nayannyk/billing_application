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

### Create Windows .exe (standalone desktop app)

Uses [Electron](https://www.electronjs.org/) to wrap the web app into a native Windows executable.

#### 1. Install dependencies

```bash
npm install --save-dev electron electron-builder
```

#### 2. Create `electron/main.js`

```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, '..', 'public', 'favicon.ico'),
    webPreferences: { nodeIntegration: false }
  });
  mainWindow.loadFile(path.join(__dirname, '..', 'build', 'index.html'));
  mainWindow.setMenuBarVisibility(false);
});
```

#### 3. Add to `package.json`

```json
"main": "electron/main.js",
"build": {
  "appId": "com.hairverse.billing",
  "productName": "Hairverse Billing",
  "directories": { "output": "dist" },
  "files": [ "build/**/*", "electron/**/*", "package.json" ],
  "win": { "target": "nsis", "icon": "public/favicon.ico" }
}
```

#### 4. Build and package

```bash
npm run build
npx electron-builder --win
```

The installer `.exe` will be in `dist/`. Run the installer — no browser needed.

> **Note:** The first run may trigger a Windows SmartScreen warning. Click "More info" → "Run anyway".

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
