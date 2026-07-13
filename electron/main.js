const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 4029;
const BUILD_DIR = path.join(__dirname, '..', 'build');

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.map': 'application/json',
  '.webp': 'image/webp',
};

function serveFile(req, res) {
  let p = url.parse(req.url).pathname;
  if (p === '/' || p === '') p = '/index.html';
  const filePath = path.join(BUILD_DIR, p);

  if (!filePath.startsWith(BUILD_DIR)) {
    res.writeHead(403); return res.end();
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(BUILD_DIR, 'index.html'), (err2, data2) => {
        if (err2) { res.writeHead(500); return res.end(); }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data2);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

let server;
let mainWindow;

app.whenReady().then(() => {
  server = http.createServer(serveFile);

  server.on('error', (err) => {
    console.error('Server error:', err.message);
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Retrying in 1 second...`);
      setTimeout(() => {
        server.close();
        server.listen(PORT);
      }, 1000);
    }
  });

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

    mainWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      webPreferences: { nodeIntegration: false, contextIsolation: true }
    });

    mainWindow.loadURL(`http://localhost:${PORT}/`);
    mainWindow.setMenuBarVisibility(false);

    mainWindow.webContents.on('console-message', (event, level, message) => {
      console.log(`[${level}] ${message}`);
    });
    mainWindow.webContents.on('did-fail-load', (_, code, desc, url) => {
      console.error('FAIL:', url, code, desc);
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  });
});

app.on('will-quit', () => {
  if (server) {
    server.close();
  }
});
