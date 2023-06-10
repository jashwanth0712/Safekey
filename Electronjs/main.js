const { ipcRenderer } = require("electron");
const fileListDiv = document.getElementById("fileList");
const selectedFilesDiv = document.getElementById("selectedFiles");
const electron = require("electron");

// Enable live reload for Electron too
require("electron-reload")(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`),
});

let SelectedFolderPath = "";

//this still not working
ipcRenderer.on("selected-folder", (event, folderPath) => {
  // Do something with the selected folder path
  // console.log('Selected folder:', folderPath);
  console.log("here");
  SelectedFolderPath = folderPath;
});

ipcRenderer.on("files", (event, files) => {
  for (const file of files) {
    const selectedFileDiv = document.createElement("div");
    selectedFileDiv.classList.add("selected-file");


 

    const checkbox = document.createElement('input');
    checkbox.className = 'custom-checkbox'
    checkbox.type = 'checkbox';
    checkbox.name = 'file';

    const label = document.createElement("label");
    label.textContent = file;
    label.className = 'custom-label';

    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        displaySelectedFile(file);
      } else {
        removeSelectedFile(file);
      }
    });

    selectedFileDiv.appendChild(checkbox);
    selectedFileDiv.appendChild(label);
    selectedFileDiv.appendChild(document.createElement("br"));

    fileListDiv.appendChild(selectedFileDiv);
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

function EmptyTheFileList() {
  const selectedFileDivs = selectedFilesDiv.getElementsByTagName("div");
  const fileDivs = fileListDiv.getElementsByTagName("div");
  console.log(selectedFileDivs);
  console.log(fileDivs);
  for (const div of selectedFileDivs) {
    console.log(div.textContent);
    div.remove();
  }
  for (const div of fileDivs) {
    console.log("here");
    console.log(div);
    console.log(div.textContent);
    div.remove();
  }
}

function openDialog() {
  console.log("clicked slect folder");
  EmptyTheFileList();
  ipcRenderer.send("open-dialog");
}

/*--------using apis on buttons--------*/

const {
  GetUserPendrives,
  GetFileLocations,
  InsertNewPendrive,
  UpdatePendriveLocations,
  UpdatePendriveKey,
} = require("./pangeaVaults.js");

function RunInsertNewPendrive() {
  const {
    GetUserPendrives,
    GetFileLocations,
    InsertNewPendrive,
    UpdatePendriveLocations,
    UpdatePendriveKey,
  } = require("./pangeaVaults.js");
  const selectedFileDivs = selectedFilesDiv.getElementsByTagName("div");
  let value = "";
  for (const childElement of selectedFileDivs) {
    value = value + SelectedFolderPath + childElement.textContent + ",";
  }
  let pendriveDropdown = document.getElementById("SelectedUsb");
  if(pendriveDropdown.value === 'None'){
    try {
      InsertNewPendrive(localStorage.getItem("USER_ID", newKey, value)).then(result => {
          console.log(result);
      });
      //insertion complete
    } catch (error) {
      console.error(error);
    }
    return ;
  }
  try {
    UpdatePendriveLocations(
      localStorage.getItem("email"),
      pendriveDropdown.value,
      value
    ).then((result) => {
      console.log(result);
    });
  } catch (error) {
    console.error(error);
  }
}
