import React from "react";
import Head from "next/head";
import { IsAuth } from "../hooks/isAuth";

const Index = () => {
  // check auth function
  IsAuth();

  return (
    <>
      <Head>
        <meta name="description" content="A website to show your cv" />
      </Head>
      <h1>GO to "/auth</h1>
    </>
  )
};

export default Index;
