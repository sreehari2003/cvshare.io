import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
const { Google, Github, Apple } = ThirdParty;

export const authBackendConfig = {
  framework: "express",
  supertokens: {
    // These are the connection details of the app you created on supertokens.com
    connectionURI:
      "https://ef25e1a1ebe811eca90da1d3c40e44e7-us-east-1.aws.supertokens.io:3568",
    apiKey: "y7Bt2d6fWOeqWSOJ2qnxK9HI5zPpPy",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: "cvshare",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          Google({
            clientId:
              "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
            clientSecret: "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",
          }),
          Github({
            clientId: "467101b197249757c71f",
            clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
          }),
          Apple({
            clientId: "4398792-io.supertokens.example.service",
            clientSecret: {
              keyId: "7M48Y4RYDL",
              privateKey:
                "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
              teamId: "YWQCXGJRJL",
            },
          }),
          // Facebook({
          //     clientSecret: "FACEBOOK_CLIENT_SECRET",
          //     clientId: "FACEBOOK_CLIENT_ID"
          // })
        ],
      },
    }),
    Session.init(),
    // ...
  ],
};
