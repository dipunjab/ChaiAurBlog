import React from 'react'
import Sidebar from "./Sidebar"
import BottomBar from "./BottomBar"

function Bar() {
    return (
        <>
            <div className="hidden md:block">
                <Sidebar />
            </div>
            <div className=" block md:hidden">
                <BottomBar />
            </div>
        </>
    )
}

export default Bar

