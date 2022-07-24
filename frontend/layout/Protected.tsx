import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/Auth';
import Loading from '../components/Loader';

interface Child {
  children: React.ReactNode;
}

function Protected({ children }: Child) {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.replace('/auth');
    }
  }, [isLoading]);
  if (isLoading) {
    return <Loading />;
  }
  return <>{children}</>;
}

export default Protected;
