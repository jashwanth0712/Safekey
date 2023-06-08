const { ipcRenderer } = require("electron");
const selectedFilesDiv = document.getElementById("selectedFiles");

const electron = require("electron");

// Enable live reload for Electron too
require("electron-reload")(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`),
});

ipcRenderer.on("files", (event, files) => {
  const fileListDiv = document.getElementById("fileList");

  for (const file of files) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "file";
    checkbox.value = file;

    const label = document.createElement("label");
    label.textContent = file;

    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        displaySelectedFile(file);
      } else {
        removeSelectedFile(file);
      }
    });

    fileListDiv.appendChild(checkbox);
    fileListDiv.appendChild(label);
    fileListDiv.appendChild(document.createElement("br"));
  }
});

function displaySelectedFile(file) {
  const selectedFileDiv = document.createElement("div");
  selectedFileDiv.textContent = file;

  selectedFilesDiv.appendChild(selectedFileDiv);
}

function removeSelectedFile(file) {
  const selectedFileDivs = selectedFilesDiv.getElementsByTagName("div");
  for (const div of selectedFileDivs) {
    if (div.textContent === file) {
      div.remove();
      break;
    }
  }
}

function openDialog() {
  ipcRenderer.send("open-dialog");
}
