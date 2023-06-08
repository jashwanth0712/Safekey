// this part is for background image change 
main.style.backgroundImage = "url(./images/bg1.jfif)";

var userBox = document.getElementById("userBox");

var svgCircle = document.getElementById("svgCircle");
var step1 = document.getElementById("step1");
var step2 = document.getElementById("step2");
var step3 = document.getElementById("step3");
var step4 = document.getElementById("step4");
var step5 = document.getElementById("step5");


// this part is for circle covering 
step1.addEventListener('click', ()=>{
    svgCircle.style.strokeDashoffset = "1004";
    main.style.backgroundImage = "url(./images/bg2.jfif)";
    // userBox.style.top = "-350px";
})

step2.addEventListener('click', ()=>{
    svgCircle.style.strokeDashoffset = "748";
    main.style.backgroundImage = "url(./images/bg3.jfif)";
    // userBox.style.top = "-100px";
})

step3.addEventListener('click', ()=>{
    svgCircle.style.strokeDashoffset = "510";
    main.style.backgroundImage = "url(./images/bg4.jfif)";
    // userBox.style.top = "-1250px";
})

step4.addEventListener('click', ()=>{
    svgCircle.style.strokeDashoffset = "247";
    main.style.backgroundImage = "url(./images/bg5.jfif)";
})

step5.addEventListener('click', ()=>{
    svgCircle.style.strokeDashoffset = "0";
    main.style.backgroundImage = "url(./images/bg1.jfif)";
})