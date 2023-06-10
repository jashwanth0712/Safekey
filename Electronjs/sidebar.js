window.onload = function(){
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search")

    closeBtn.addEventListener("click",function(){
        sidebar.classList.toggle("open")
        menuBtnChange()
    })

    // searchBtn.addEventListener("click",function(){
    //     sidebar.classList.toggle("open")
    //     menuBtnChange()
    // })

    function menuBtnChange(){
        if(sidebar.classList.contains("open")){
            closeBtn.classList.replace("bx-menu","bx-menu-alt-right")
        }else{
            closeBtn.classList.replace("bx-menu-alt-right","bx-menu")
        }
    }
    document.getElementById("emailArea").textContent = localStorage.getItem("email");
}

function allInvisible(){
    document.getElementById("Carousel").style.display = "none";
    document.getElementById("configureUsb").style.display = "none";
    document.getElementById("deleteUsb").style.display = "none";
}

function clickNewusb(){
    allInvisible();
    document.getElementById("configureUsb").style.display = "block";
    
}

async function deleteUsb(){
    document.getElementById("usbDisplayer").innerHTML = '';
    console.log("deleting");
    allInvisible();
    document.getElementById("deleteUsb").style.display = "block";
    let response=""
    await GetUserPendrives(localStorage.getItem("USER_ID")).then(result => {
        response = result;
    });
    console.log(response);
    let fileListDiv = document.getElementById("usbDisplayer");
    for(let i=0;i<response.count;i++){
        const selectedFileDiv = document.createElement("div");
        selectedFileDiv.classList.add("selected-file");
        const checkbox = document.createElement('input');
        checkbox.className = 'custom-checkbox'
        checkbox.type = 'checkbox';
        checkbox.name = response.items[i].name;
        checkbox.value = response.items[i].name;

        const label = document.createElement('label');
        label.textContent = response.items[i].name;
        label.className = 'custom-label';

        selectedFileDiv.appendChild(checkbox);
        selectedFileDiv.appendChild(label);
        selectedFileDiv.appendChild(document.createElement("br"));

        fileListDiv.appendChild(selectedFileDiv);
    }
}

async function OnClickDeleteUsb(){

    const { GetUserPendrives, GetFileLocations, InsertNewPendrive, DeletePendrive, UpdatePendriveLocations, UpdatePendriveKey } = require("./pangeaVaults.js");


    let usbDisplayer = document.getElementById("usbDisplayer");
    const childDivs = usbDisplayer.querySelectorAll('div');

    console.log(childDivs);
    childDivs.forEach(async childDiv => {
        const childInput = childDiv.querySelectorAll('input')
        console.log(childInput[0]);
        console.log(childInput[0].checked);
        if(childInput[0].checked){
            await DeletePendrive(localStorage.getItem("USER_ID"), childInput[0].value).then(result =>{
                console.log(result);
            });
        }
    })
    setTimeout(() => {
        deleteUsb();
      }, 2000);    
}