// import {GetUserPendrives, GetFileLocations, InsertNewPendrive, DeletePendrive, UpdatePendriveLocations, UpdatePendriveKey} from "./pangeaVaults.js";

const { GetUserPendrives, GetFileLocations, InsertNewPendrive, UpdatePendriveLocations, UpdatePendriveKey } = require("./pangeaVaults.js");

// InsertNewPendrive("sairushik1903@gmail.com", "initialKey3", "intialFileLocations").then(result => {
//     console.log(result);
// });

// GetUserPendrives("pui_qfwvkt2foxyia4ofjlkw4o3ei5374qlo").then(result => {
//     console.log(result);
// });

// GetFileLocations("pui_qfwvkt2foxyia4ofjlkw4o3ei5374qlo", "initialKey").then(result => {
//     console.log(result);
// });

// DeletePendrive("pui_qfwvkt2foxyia4ofjlkw4o3ei5374qlo", "initialKey").then(result =>{
//     console.log(result);
// });

// UpdatePendriveLocations("pui_qfwvkt2foxyia4ofjlkw4o3ei5374qlo", "initialKey","newLocations").then(result =>{
//     console.log(result);
// });

// UpdatePendriveKey("pui_qfwvkt2foxyia4ofjlkw4o3ei5374qlo", "newKey").then(result =>{
//     console.log(result);
// });

/*--------------------------Auth API's------------------------*/
// const RANDOM_VALUE = new Date().getTime().toString();
// const USER_EMAIL = `user.email+test${RANDOM_VALUE}@pangea.cloud`;
// const PASSWORD_INITIAL = "My1s+Password";

// const { SignUp, SignIn } = require('./pangeaAuthN.js');

// // SignUp(USER_EMAIL, PASSWORD_INITIAL).then(result => {
// //     console.log(result);
// // });

// SignIn("sairushik1903@gmail.com", "Rushik@1903").then(result => {
//     console.log(result);
// });