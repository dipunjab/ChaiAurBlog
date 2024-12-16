import React from 'react';

import { login, logout } from '../../Store/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../Appwrite/auth"

import { NavLink } from 'react-router-dom';

function Sidebar() {

  const dispatch = useDispatch()

  const logoutHandler = ()=>{
    authService.logout()
    .then(()=>{
        dispatch(logout())
    })
}

  useEffect(()=>{
    authService.getCurrentUser()
              .then((userData)=>{
                if (userData) {
                  dispatch(login({userData}))
                }else{
                  dispatch(logout())
                }
              })
  },[])


  return (
    <div>
      <div className="bg-customOrange text-white flex flex-col items-start p-4 w-60 h-full fixed left-0 top-0">

        <div className="flex flex-col items-start mb-6 ml-12 mx-6">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="rounded-full w-24 h-24"
          />
          <p className="text-left ml-4 font-bold">ChaiCode</p>
        </div>

        <nav className="flex flex-col gap-2 w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-4 rounded bg-white text-orange-400 text-sm font-bold"
                : "py-2 px-4 rounded hover:bg-white hover:text-orange-400 text-sm"
            }          >
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
            }          >
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
