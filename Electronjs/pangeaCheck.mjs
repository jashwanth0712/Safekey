// import {GetUserPendrives, GetFileLocations, InsertNewPendrive, DeletePendrive, UpdatePendriveLocations, UpdatePendriveKey} from "./pangeaVaults.js";

import pkg from './pangeaVaults.mjs';
const { GetUserPendrives, GetFileLocations, InsertNewPendrive, UpdatePendriveLocations, UpdatePendriveKey } = pkg;

// InsertNewPendrive("pui_qfwvkt2foxyia4ofjlkw4o3ei5374qlo", "initialKey3", "intialFileLocations").then(result => {
//     console.log(result);
// });

// GetUserPendrives("pui_qfwvkt2foxyia4ofjlkw4o3ei5374qlo").then(result => {
//     console.log(result);
// });

// GetFileLocations("pvi_gjx2dhqvyrcymrewzt4k3k7ys6rmud7n").then(result => {
//     console.log(result);
// });

// DeletePendrive("pvi_nmi7lwoloplvs6ytsva3qox37ehcboaw").then(result =>{
//     console.log(result);
// });

// UpdatePendriveLocations("pvi_gjx2dhqvyrcymrewzt4k3k7ys6rmud7n", "newLocations").then(result =>{
//     console.log(result);
// });

// UpdatePendriveKey("pvi_gjx2dhqvyrcymrewzt4k3k7ys6rmud7n", "newKey").then(result =>{
//     console.log(result);
// });

/*--------------------------Auth API's------------------------*/
const RANDOM_VALUE = new Date().getTime().toString();
const USER_EMAIL = `user.email+test${RANDOM_VALUE}@pangea.cloud`;
const PASSWORD_INITIAL = "My1s+Password";

import pkg2 from "./pangeaAuthN.mjs";
const { SignUp, SignIn } = pkg2;

SignUp(USER_EMAIL, PASSWORD_INITIAL).then(result => {
    console.log(result);
});
SignIn(USER_EMAIL, PASSWORD_INITIAL).then(result => {
    console.log(result);
});