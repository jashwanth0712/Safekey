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

function clickNewusb(){
    // let usb = document.getElementById('newUsbID');
    // usb.style
    document.getElementById("Carousel").style.display = "none";
    document.getElementById("newUsbID").style.display = "block";
    
}

