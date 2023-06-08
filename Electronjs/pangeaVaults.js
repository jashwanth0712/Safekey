import { PangeaConfig, VaultService, PangeaErrors, Vault } from "pangea-node-sdk";

const PANGEA = {
  PANGEA_DOMAIN: "aws.us.pangea.cloud",
  VAULT_AUTH_TOKEN: "pts_t6i6nc6dnvcqswtanszugxzqteyiweju"
}

const config = new PangeaConfig({ domain: PANGEA.PANGEA_DOMAIN });
const vault = new VaultService(PANGEA.VAULT_AUTH_TOKEN, config);

// // getItem
// (async () => {
//   const response = await vault.getItem(
//     "pvi_3oubdppqootac7uhtfy57znsb4xc342y",
//     {
//       version: 1,
//       version_state: Vault.ItemVersionState.ACTIVE,
//       verbose: true,
//     }
//   );

//   console.log(response.result.current_version);
// })();

// // secretStore
// (async () => {
//   const response = await vault.secretStore(
//     "hello key dulicate test",
//     "test-3",
//     {
//       folder: "/asdfghjk",
//       metadata: {
//         "created_by": "ninn",
//         "used_in": "testing"
//       },
//       tags: ["these_are_tags", "these_are_tags2"],
//       //   rotation_frequency: "10d",
//       //   rotation_state: Vault.ItemVersionState.DEACTIVATED,
//       //   expiration: "2025-01-01T10:00:00Z",
//     }
//   );
//   console.log(response);
// })();

// // list
// const response = await vault.list(
//   {
//     filter: {
//       folder: "/secrets",
//       // type: "asymmetric_key",
//       // name__contains: "test",
//       // metadata_key1: "value1",
//       // created_at__lt: "2023-12-12T00:00:00Z",
//     },
//     // last: "WyIvdGVzdF8yMDdfc3ltbWV0cmljLyJd",
//     // order: Vault.ItemOrder.ASC,
//     // order_by: Vault.ItemOrderby.NAME,
//     size: 20,
//   }
// );
// console.log(response.result);




function CreateFolderForNewUser(USER_ID) {
  let folderName = "/" + USER_ID;
  console.log(folderName);
  (async () => {
    try {
      const response = await vault.secretStore(
        "intiation",
        "intiation key",
        {
          folder: folderName,
          // metadata: {
          //   "created_by": "ninn",
          //   "used_in": "testing"
          // },
          // tags: ["these_are_tags", "these_are_tags2"],
          //   rotation_frequency: "10d",
          //   rotation_state: Vault.ItemVersionState.DEACTIVATED,
          //   expiration: "2025-01-01T10:00:00Z",
        }
      );
      console.log("hereeeeee");
      console.log(response.result);
      return "success";
    } catch (err) {
      return "error";
    }
  })();
}

function GetUserKeys(USER_ID) {
  (async () => {
    const response = await vault.list(
      {
        filter: {
          folder: "/" + USER_ID,
          // type: "asymmetric_key",
          // name__contains: "test",
          // metadata_key1: "value1",
          // created_at__lt: "2023-12-12T00:00:00Z",
        },
        // last: "WyIvdGVzdF8yMDdfc3ltbWV0cmljLyJd",
        // order: Vault.ItemOrder.ASC,
        // order_by: Vault.ItemOrderby.NAME,
        size: 20,
      }
    );
    console.log(response.result);
    console.log(response.result.items[0]);
    return response.result;
  })();
}

function GetValuesOfKey(VAULT_ID) {
  (async () => {
    const response = await vault.getItem(
      VAULT_ID,
      {
        version: 1,
        version_state: Vault.ItemVersionState.ACTIVE,
        verbose: true,
      }
    );

    console.log(response.result.current_version);
    return response.result.current_version;
  })();
}

function InsertNewKeyValue(USER_ID, key, value) {
  let folderName = "/" + USER_ID;
  console.log(folderName);
  (async () => {
    const response = await vault.secretStore(
      value,
      key,
      {
        folder: folderName,
        // metadata: {
        //   "created_by": "ninn",
        //   "used_in": "testing"
        // },
        // tags: ["these_are_tags", "these_are_tags2"],
        //   rotation_frequency: "10d",
        //   rotation_state: Vault.ItemVersionState.DEACTIVATED,
        //   expiration: "2025-01-01T10:00:00Z",
      }
    );
    console.log("inserted succesfully!");
    console.log(response);
    console.log(folderName);
  })();
}

export { CreateFolderForNewUser, GetUserKeys, GetValuesOfKey, InsertNewKeyValue };