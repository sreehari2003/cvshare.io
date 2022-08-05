import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import Protected from '../layout/Protected';
import MainNav from '../components/Navbar/MainNav';

function Index() {
  return (
    <Protected>
      <>
        <MainNav />
        <Head>
          <meta name="description" content="A website to show your cv" />
        </Head>
        <h1>hello</h1>
        <Link href="/profile">
          <Button>Navigate</Button>
        </Link>
      </>
    </Protected>
  );
}

export default Index;
