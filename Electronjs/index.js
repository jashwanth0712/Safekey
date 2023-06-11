const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");

const electron = require("electron");

// Enable live reload for Electron too
require("electron-reload")(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`),
});

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

  mainWindow.loadFile("sidebar.html");
}

function openFileDialog() {
  dialog
    .showOpenDialog({
      properties: ["openDirectory"],
      buttonLabel: "Select Folder",
      title: "Select a folder",
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

    mainWindow.webContents.send("files", files);
  });
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("open-dialog", () => {
    openFileDialog();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
