let usernameEle = document.getElementById("USERNAME");
let passwordEle = document.getElementById("PASSWORD");

const pkg2 = require("./pangeaAuthN.js");
const { SignUp, SignIn } = pkg2;

let btn = document.getElementById("submit");
// abc@abc.com
// Abc@1234
async function Login() {
  try {
    SignIn(usernameEle.value, passwordEle.value).then((result) => {
      console.log(result);
      localStorage.setItem("email", usernameEle.value);
      window.location.href = "sidebar.html";
    });
  } catch (error) {
    console.error(error);
  }
}
