import {
    PangeaConfig,
    AuthNService,
    PangeaErrors,
    AuthN,
  } from "pangea-node-sdk";

import CreateFolderForNewUser from "./pangeaVaults.js";

const PANGEA = {
    PANGEA_DOMAIN : "aws.us.pangea.cloud",
    VAULT_AUTH_TOKEN : "pts_t6i6nc6dnvcqswtanszugxzqteyiweju"
}

const token = PANGEA.VAULT_AUTH_TOKEN;
const config = new PangeaConfig({ domain: PANGEA.PANGEA_DOMAIN });
const authn = new AuthNService(token, config);

const RANDOM_VALUE = new Date().getTime().toString();
const USER_EMAIL = `user.email+test${RANDOM_VALUE}@pangea.cloud`;
const PASSWORD_INITIAL = "My1s+Password";
const PROFILE_INITIAL = { name: "User name", country: "Argentina" };

(async () => {
    try {
      // Create
      console.log("Creating user...");
      const createResp = await authn.user.create(
        USER_EMAIL,
        PASSWORD_INITIAL,
        AuthN.IDProvider.PASSWORD,
        { profile: PROFILE_INITIAL }
      );
      console.log("Create user success. Result: ", createResp.result.id);
      let USER_ID = createResp.result.id;
      if(createResp.body.status === "Success"){
        try{
            CreateFolderForNewUser(USER_ID);
        }catch(err){
            console.log(err);
        }
      }
    } catch (err) {
      if (err instanceof PangeaErrors.APIError) {
        console.log("Something went wrong...");
        console.log(err.toString());
      } else {
        throw err;
      }
    }
  })();