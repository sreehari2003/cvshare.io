import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { AuthContextProvider } from "../context/Auth";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AnimatePresence exitBeforeEnter>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AnimatePresence>
    </AuthContextProvider>
  );
}

export default MyApp;
