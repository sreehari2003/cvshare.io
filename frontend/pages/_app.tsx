import "../styles/globals.css";
import type { AppProps } from "next/app";

import React, { useEffect } from "react";
import frontEndConfig from "../config/frontend";
import { redirectToAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SuperTokens from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";

if (typeof window !== "undefined") {
  SuperTokens.init(frontEndConfig());
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function doRefresh() {
      if (pageProps.fromSupertokens === "needs-refresh") {
        if (await Session.attemptRefreshingSession()) {
          location.reload();
        } else {
          // user has been logged out
          redirectToAuth();
        }
      }
    }
    doRefresh();
  }, [pageProps.fromSupertokens]);
  if (pageProps.fromSupertokens === "needs-refresh") {
    return null;
  }
  return <Component {...pageProps} />;
}

export default MyApp;
