import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/Auth';
import Loading from '../components/Loader';

interface Child {
  children: React.ReactNode;
}

function Protected({ children }: Child): JSX.Element {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default Protected;
