import React, { createContext } from "react"



const AuthCTX = createContext();


const AuthCTXProvider: React.FC = ({ children }) => {

    return (
        { children }
    )
}

