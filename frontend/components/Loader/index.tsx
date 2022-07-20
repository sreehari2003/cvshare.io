import React from 'react'
import { Bars } from "react-loader-spinner";

function Loader() {
    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <Bars height="150" width="150" color="white" ariaLabel="loading-indicator" />
        </div>
    )
}

export default Loader