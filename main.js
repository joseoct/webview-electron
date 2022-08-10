const { app, BrowserWindow, globalShortcut } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 650,
    height: 850,
    frame: true,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL('http://localhost:3000/');
}

function toggleDevTools() {
  win.webContents.toggleDevTools();
}

function setFullScreen() {
  if (win.isMaximized()) {
    win.restore();
  } else {
    win.maximize();
  }
}

function minimize() {
  win.minimize();
}

function reloadPage() {
  win.reload();
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools);
  globalShortcut.register('Alt+A', setFullScreen);
  globalShortcut.register('Alt+S', minimize);
  globalShortcut.register('F5', reloadPage);
}

app.whenReady().then(createWindow).then(createShortcuts);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
