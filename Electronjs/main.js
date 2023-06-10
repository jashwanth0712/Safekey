const { ipcRenderer } = require('electron');
const fileListDiv = document.getElementById('fileList');
const selectedFilesDiv = document.getElementById('selectedFiles');

let SelectedFolderPath = "";

//this still not working
ipcRenderer.on('selected-folder', (event, folderPath) => {
  // Do something with the selected folder path
  // console.log('Selected folder:', folderPath);
  console.log("here");
  SelectedFolderPath = folderPath;
});

ipcRenderer.on('files', (event, files) => {
  for (const file of files) {
    const selectedFileDiv = document.createElement('div');
    selectedFileDiv.classList.add('selected-file');

 

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'file';
    checkbox.value = file;

 

    const label = document.createElement('label');
    label.textContent = file;

 

    checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        displaySelectedFile(file);
      } else {
        removeSelectedFile(file);
      }
    });

 

    selectedFileDiv.appendChild(checkbox);
    selectedFileDiv.appendChild(label);
    selectedFileDiv.appendChild(document.createElement('br'));

 

    fileListDiv.appendChild(selectedFileDiv);
  }
});

function displaySelectedFile(file) {
  const selectedFileDiv = document.createElement('div');
  selectedFileDiv.textContent = file;

  selectedFilesDiv.appendChild(selectedFileDiv);
}

function removeSelectedFile(file) {
  const selectedFileDivs = selectedFilesDiv.getElementsByTagName('div');
  for (const div of selectedFileDivs) {
    if (div.textContent === file) {
      div.remove();
      break;
    }
  }
}

function GetValues(){
  console.log("here");
  const selectedFileDivs = fileListDiv.getElementsByTagName('div');
  console.log(selectedFileDivs);
  let value="";
  for (const div of selectedFileDivs) {
    const childElements = div.querySelectorAll('input');
    childElements.forEach(childElement => {
      if(childElement.tagName === 'INPUT'){
        value = value+SelectedFolderPath + childElement.value+",";
      }
    });
  }
  console.log(value);
}

function EmptyTheFileList() {
  const selectedFileDivs = selectedFilesDiv.getElementsByTagName('div');
  const fileDivs = fileListDiv.getElementsByTagName('div');
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
  ipcRenderer.send('open-dialog');
}
