import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '../api/index';

interface AuthCtx {
  isLoggedIn: boolean;
  logOut: () => void;
  user: any;
  isLoading: boolean;
  logInHandler: (el: any) => void;
}
const AuthContext = React.createContext<AuthCtx>({
  isLoggedIn: false,
  logOut: () => {},
  user: null,
  isLoading: false,
  logInHandler: () => {},
});

interface Child {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: Child) {
  const [isLoggedIn, setLogIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('jwtID');
      if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { data: user } = await api.get('auth/me');
        if (user) {
          setUser(user?.data);
          setLogIn(true);
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);
  const LogOutHandler = () => {
    setLogIn(false);
    setUser(null);
    Cookies.remove('jwtID');
    window.location.reload();
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const logInHandler = (user: any) => {
    setLogIn(true);
    setUser(user);
  };
  useEffect(() => {
    console.log('loading', isLoading);
  }, [isLoading]);
  const contextValue = {
    isLoggedIn,
    logOut: LogOutHandler,
    user,
    isLoading,
    logInHandler,
  };
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export default AuthContext;
