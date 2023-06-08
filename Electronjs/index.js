const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");
const { spawn } = require("child_process");
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

  mainWindow.loadFile("introPage.html");
}

function readPathFromFile() {
  try {
    const pathData = fs.readFileSync("path.txt", "utf-8");
    return pathData.trim(); // Trim any whitespace or newline characters
  } catch (error) {
    console.error("Error reading path from file:", error);
    return null;
  }
}

function writePathToFile(path) {
  try {
    fs.writeFileSync("path.txt", path);
  } catch (error) {
    console.error("Error writing path to file:", error);
  }
}

// Get the path from the file
const path = readPathFromFile();

// If the path is not available, set a default value
if (!path) {
  const defaultPath = "c:/Users/jashw/OneDrive/Desktop/Pangea/Safekey/scripts/malware.py";
  writePathToFile(defaultPath);
}

// Spawn the Python process and communicate with it
const pythonProcess = spawn("python", [path]);

// Listen for data from the Python process
pythonProcess.stdout.on("data", (data) => {
  // Data received from the Python process
  console.log("Received data from Python:", data.toString());

  // Send the data to the renderer process (HTML)
  console.log("pythonData", data.toString());
});

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
