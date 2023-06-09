const { ipcRenderer } = require('electron');
const selectedFilesDiv = document.getElementById('selectedFiles');

ipcRenderer.on('files', (event, files) => {
  const fileListDiv = document.getElementById('fileList');

 

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
  const selectedFileDivs = selectedFilesDiv.getElementsByTagName('div');
  let value="";
  for (const parentDiv of selectedFileDivs) {
    // const parentDiv = document.getElementById('parent-div');
    const childElements = parentDiv.querySelectorAll('div'); // Selecting all <div> child elements

    // Accessing individual child elements
    childElements.forEach(childElement => {
      // Do something with each child element
      console.log(childElement);
      if(childElement.tagName === 'input'){
        value = value+childElement.value;
      }
    });
  }
}

function openDialog() {
  ipcRenderer.send('open-dialog');
}