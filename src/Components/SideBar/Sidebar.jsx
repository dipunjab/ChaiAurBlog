import React from 'react';

import { login, logout } from '../../Store/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../Appwrite/auth"

import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import uploadPFPService from '../../Appwrite/uploadPFP';


function Sidebar() {
  const [userName, setUserName] = useState(""); 
  const [pfp, setPfp] = useState("https://via.placeholder.com/50"); // Default profile picture
  const dispatch = useDispatch();

  // Logout Handler
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();

        if (userData) {
          setUserName(userData.name); // Update username in state
          dispatch(login({ userData })); // Dispatch login action

          // Fetch profile picture if available
          const profilePictureID = userData.prefs?.profilePicture;
          if (profilePictureID) {
            const filePreviewUrl = await uploadPFPService.filePreview(profilePictureID);
            setPfp(filePreviewUrl); // Update PFP in state
          }
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <div>
      <div className="bg-customOrange text-white flex flex-col items-start p-4 w-60 h-full fixed left-0 top-0">
        <div className="flex flex-col items-start mb-6 ml-12 mx-6">
          <img
            src={pfp}
            alt="Profile"
            className="rounded-full w-24 h-24"
          />
          <p className="text-left  font-bold">{userName || "Guest"}</p>
        </div>

        <nav className="flex flex-col gap-2 w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-4 rounded bg-white text-orange-400 text-sm font-bold"
                : "py-2 px-4 rounded hover:bg-white hover:text-orange-400 text-sm"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-4 rounded bg-white text-orange-400 text-sm font-bold"
                : "py-2 px-4 rounded hover:bg-white hover:text-orange-400 text-sm"
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-4 rounded bg-white text-orange-400 text-sm font-bold"
                : "py-2 px-4 rounded hover:bg-white hover:text-orange-400 text-sm"
            }
          >
            Settings
          </NavLink>

          <button
            onClick={logoutHandler}
            className="py-2 px-4 rounded hover:bg-white hover:text-orange-400 text-xl font-bold mt-36"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
