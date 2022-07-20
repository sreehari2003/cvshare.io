import React, { useEffect, useState } from "react";
import { api } from "../api/index";
import Cookies from "js-cookie";

interface AuthCtx {
    token: string | null;
    isLoggedIn: boolean;
    logOut: () => void;
    user: any;
}
const AuthContext = React.createContext<AuthCtx>({
    token: null,
    isLoggedIn: false,
    logOut: () => { },
    user: null,
});

interface Child {
    children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Child) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('jwtID')
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                const { data: user } = await api.get('auth/user');
                if (user) setUser(user);
            }
            // setLoading(false)
        }
        loadUserFromCookies()
    }, [])
    const userIsLoggedIn = !!token;
    const LogOutHandler = () => {
        setToken(null);
        window.location.reload();
        setUser(null);
    };
    const contextValue = {
        token,
        isLoggedIn: userIsLoggedIn,
        logOut: LogOutHandler,
        user
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};