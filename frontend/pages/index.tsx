import React from 'react';
import Head from 'next/head';
import Protected from '../layout/Protected';
import MainNav from '../components/Navbar/MainNav';

function Index() {
  return (
    <Protected>
      <MainNav />
      <Head>
        <meta name="description" content="A website to show your cv" />
      </Head>
      <h1>hello</h1>
    </Protected>
  );
}

export default Index;
