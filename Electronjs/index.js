const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');

let mainWindow;

function createWindow() {
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

<<<<<<< HEAD
  mainWindow.loadFile('test.html');
=======
  mainWindow.loadFile('introPage.html');
>>>>>>> 6072f3e5e374dc616365c34a9f2f46183e75b0ad
}

function openFileDialog() {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
      buttonLabel: 'Select Folder',
      title: 'Select a folder',
    })
    .then((result) => {
      if (!result.canceled) {
        const folderPath = result.filePaths[0];
        readFilesFromFolder(folderPath);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function readFilesFromFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    mainWindow.webContents.send('files', files);
  });
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('open-dialog', () => {
    openFileDialog();
  });
});

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
