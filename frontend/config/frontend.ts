import ThirdParty, {
  Github,
  Google,
  Facebook,
  Apple,
} from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";

function frontend() {
  return {
    appInfo: {
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
            Github.init(),
            Google.init(),
            Facebook.init(),
            Apple.init(),
          ],
        },
      }),
      Session.init(),
    ],
  };
}

export default frontend;
