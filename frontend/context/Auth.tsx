import React, { useEffect, useState } from "react";
import { api } from "../api/index";
import Cookies from "js-cookie";

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

export const AuthContextProvider = ({ children }: Child) => {
  const [isLoggedIn, setLogIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("jwtID");
      if (token) {
        setLoading(true);
        api.defaults.headers.common["authorization"] = `Bearer ${token}`;
        const { data: user } = await api.get("auth/me");
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
    Cookies.remove("jwtID");
    window.location.reload();
  };
  const logInHandler = (user: any) => {
    setLogIn(true);
    setUser(user);
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    logOut: LogOutHandler,
    user,
    isLoading,
    logInHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
