import { PangeaConfig, VaultService, PangeaErrors, Vault } from "pangea-node-sdk";

//below details in organisation
const PANGEA = {
    PANGEA_DOMAIN : "aws.us.pangea.cloud",
    VAULT_AUTH_TOKEN : "pts_t6i6nc6dnvcqswtanszugxzqteyiweju"
}

const config = new PangeaConfig({ domain: PANGEA.PANGEA_DOMAIN });
const vault = new VaultService(PANGEA.VAULT_AUTH_TOKEN, config);

// (async () => {
// const response = await vault.getItem(
//     "pvi_klcq2ckpqm34gkypdnzaqjqmk2d5uszd",
//     {
//       version: 1,
//       version_state: Vault.ItemVersionState.ACTIVE,
//       verbose: true,
//     }
//   );

// //   PangeaResponse {
// //     request_id: 'prq_v5dch3xpm35ukw2ve4ixzqjwbsnjxljq',
// //     request_time: '2023-06-07T15:55:34.511518Z',       
// //     response_time: '2023-06-07T15:55:34.527797Z',      
// //     status: 'Success',
// //     result: {
// //       created_at: '2023-06-07T15:48:46.873143Z',       
// //       current_version: {
// //         created_at: '2023-06-07T15:48:46.873144Z',     
// //         secret: 'myp4ssw0rd',
// //         state: 'active',
// //         version: 1
// //       },
// //       folder: '/secrets/',
// //       id: 'pvi_klcq2ckpqm34gkypdnzaqjqmk2d5uszd',
// //       item_state: 'enabled',
// //       name: 'my-secret',
// //       type: 'secret',
// //       versions: [ [Object] ]
// //     },
// //     ...
// //   }

//   console.log(response);
// })();

(async () => {
    const response = await vault.secretStore(
        "hello key dulicate test",
        "test-hello-key",
        {
          folder: "/secrets",
          metadata: {
            "created_by": "ninn",
            "used_in": "testing"
          },
          tags: ["these_are_tags", "these_are_tags2"],
        //   rotation_frequency: "10d",
        //   rotation_state: Vault.ItemVersionState.DEACTIVATED,
        //   expiration: "2025-01-01T10:00:00Z",
        }
    );
    console.log(response);
    })();
