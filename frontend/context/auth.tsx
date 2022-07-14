import React, { createContext } from "react"

interface AuthState {
    isAuth: boolean;
}


const AuthCTX = createContext<AuthState>({
    isAuth: false,
});


const AuthCTXProvider: React.FC = (props) => {
    return (
        <>
            <AuthCTX>{props.children}</AuthCTX>

        </>
    )
}

