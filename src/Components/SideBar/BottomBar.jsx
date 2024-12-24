import React, { useState } from 'react';

//icons
import { VscHome } from "react-icons/vsc";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

import { login, logout } from '../../Store/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../Appwrite/auth"
import uploadPFPService from '../../Appwrite/uploadPFP';

function BottomBar() {
      const [pfp, setPfp] = useState(''); 
        const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
    }

    useEffect(() => {
            const fetchUserData = async () => {
                try {
                  const userData = await authService.getCurrentUser();
          
                  if (userData) {
                    dispatch(login({ userData })); 
          
                    const profilePictureID = userData.prefs?.profilePicture;
                    if (profilePictureID) {
                      const filePreviewUrl = await uploadPFPService.filePreview(profilePictureID);
                      setPfp(filePreviewUrl); 
                    }
                  } else {
                    dispatch(logout());
                  }
                } catch (error) {
                  console.error("Failed to fetch user data:", error);
                }
              };
          
              fetchUserData();
    }, [])


    return (
        <div className="bg-customOrange text-white flex justify-center gap-6 p-2 w-full fixed bottom-0 md:hidden">
            <a href="/" className='hover:bg-white hover:text-orange-400'>
                <VscHome style={{ width: '40px', height: '40px' }} />
            </a>
            <a href="/profile" className='hover:bg-white hover:text-orange-400 text-white'>
            {pfp  ? <img src={pfp} style={{ width: '40px', height: '40px', borderRadius: '50px'}} /> : <RiAccountPinCircleLine style={{ width: '40px', height: '40px' }} />}
            </a>
            <button 
            onClick={logoutHandler}
            className='hover:bg-white hover:text-orange-400 text-white'>
                <IoMdLogOut style={{ width: '40px', height: '40px', marginLeft: '26px' }} />
            </button>
        </div>
    );
}

export default BottomBar;

