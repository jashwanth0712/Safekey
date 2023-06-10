// import {GetUserPendrives, GetFileLocations, InsertNewPendrive, DeletePendrive, UpdatePendriveLocations, UpdatePendriveKey} from "./pangeaVaults.js";

const { GetUserPendrives, GetFileLocations, InsertNewPendrive, UpdatePendriveLocations, UpdatePendriveKey } = require("./pangeaVaults.js");

// InsertNewPendrive("pui_qfwvkt2foxyia4ofjlkw4o3ei5374qlo", "initialKey3", "intialFileLocations").then(result => {
//     console.log(result);
// });

// GetUserPendrives("pui_qfwvkt2foxyia4ofjlkw4o3ei5374qlo").then(result => {
//     console.log(result);
// });

GetFileLocations("sairushik1903@gmail.com", ).then(result => {
    console.log(result);
});

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
// const RANDOM_VALUE = new Date().getTime().toString();
// const USER_EMAIL = `user.email+test${RANDOM_VALUE}@pangea.cloud`;
// const PASSWORD_INITIAL = "My1s+Password";

// const { SignUp, SignIn } = require('./pangeaAuthN.js');

// SignUp(USER_EMAIL, PASSWORD_INITIAL).then(result => {
//     console.log(result);
// });

// SignIn(USER_EMAIL, PASSWORD_INITIAL).then(result => {
//     console.log(result);
// });