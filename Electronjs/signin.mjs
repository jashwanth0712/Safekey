import pkg2 from "./pangeaAuthN.mjs";
const { SignIn } = pkg2;

document.getElementById("signInButton").addEventListener("click", () => {
    const email = "sairushik1903@gmail.com";
    const password = "Rushik@1903";

    SignIn(email, password).then(result => {
        console.log(result);
        // Handle the sign-in result here
    }).catch(error => {
        console.error(error);
        // Handle sign-in errors here
    });
});
