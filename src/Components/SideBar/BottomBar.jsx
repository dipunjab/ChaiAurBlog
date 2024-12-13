import React from 'react';

//icons
import { VscHome } from "react-icons/vsc";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

import { login, logout } from '../../Store/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../Appwrite/auth"



function BottomBar() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
    }

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }))
                } else {
                    dispatch(logout())
                }
            })
    }, [])


    return (
        <div className="bg-customOrange text-white flex justify-center gap-6 p-2 w-full fixed bottom-0 md:hidden">
            <a href="/home">
                <VscHome style={{ width: '40px', height: '40px' }} />
            </a>
            <a href="/profile" className="text-orange-400">
                <RiAccountPinCircleLine style={{ width: '40px', height: '40px', color: 'white' }} />
            </a>
            <a href="#" className="text-orange-400">
                <IoSettingsOutline style={{ width: '40px', height: '40px', color: 'white' }} />
            </a>
            <button 
            onClick={logoutHandler}
             className="text-orange-400">
                <IoMdLogOut style={{ width: '40px', height: '40px', color: 'white', marginLeft: '26px' }} />
            </button>
        </div>
    );
}

export default BottomBar;

