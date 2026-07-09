const { app, BrowserWindow } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('allow-file-access-from-files');

let mainWindow;

app.whenReady().then(() => {
  const indexPath = path.join(__dirname, '..', 'build', 'index.html');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  mainWindow.loadFile(indexPath);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.openDevTools();

  mainWindow.webContents.on('console-message', (event, level, message) => {
    console.log(`[${level}] ${message}`);
  });
  mainWindow.webContents.on('did-fail-load', (_, code, desc, url) => {
    console.error('FAIL:', url, code, desc);
  });
});
