const { app, BrowserWindow, globalShortcut } = require('electron')

let win;

function createWindow () {
  
  win = new BrowserWindow({
    width: 650,
    height: 850,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  win.loadURL('http://localhost:3000/');
}

function toggleDevTools () {
  win.webContents.toggleDevTools();
}

function setFullScreen () {
  win.maximize()
}

function resize () {
  win.setSize(650, 850)
}

function createShortcuts () {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools);
  globalShortcut.register('CmdOrCtrl+A', setFullScreen); 
  globalShortcut.register('CmdOrCtrl+S', resize); 
}

app.whenReady()
  .then(createWindow)
  .then(createShortcuts)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


