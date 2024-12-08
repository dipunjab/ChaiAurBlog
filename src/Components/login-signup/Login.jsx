import React, { useState } from 'react'
import PageLayout from './PageLayout'
import chaiJPG from "../../assets/chai.jpg"
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth'
import {login as authLogin} from "../../Store/authSlice"
import { useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"

function Login() {
  const navigate  = useNavigate()
  const dispatch = useDispatch()

  const {register, handleSubmit} = useForm()

  const [error, setError] = useState("")

  const login = async(data)=>{
      setError("")
      try {
         const session =  await authService.login(data)
          if (session) {
              const userData = await authService.getCurrentUser()
              if (userData)  dispatch(authLogin(userData))
              navigate("/")    
          }
      
      } catch (error) {
          setError(error.message)
      }
  }

  return (
    <PageLayout>
      <div className='flex flex-col md:flex-row h-full'>

        <div className='md:w-1/2 mb-1 flex flex-col justify-center items-center'>
          <img src={chaiJPG} alt="Chai-Logo" className='w-32 rounded-lg md:w-2/3 md:h-full'/>
          <p className='sm:text-sm text-xs text-center'>"Brew love, share stories, and connect over every sip of chai."</p>
        </div>

        <div>
          <hr className='border-2 border-customOrange h-full md:mr-11'/>
        </div>

        <div className='md:w-1/2 flex flex-col justify-center p-2'>
          <h1 className="text-lg sm:text-2xl font-bold mb-2 text-center md:text-left">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit(login)}>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              {...register("email",{required: true})}
              type="email"
              id="email"
              className="border p-3 text-sm rounded-xl sm:rounded-sm sm:w-2/3 focus:border-customOrange"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              {...register("password",{required: true})}
              type="password"
              id="password"
              className="border p-3 text-sm rounded-xl sm:rounded-sm sm:w-2/3 focus:border-customOrange"
              placeholder="Enter your password"
              required
            />
            <button type="submit" className="bg-customOrange hover:bg-orange-300 text-white p-3 w-2/4 ml-20 h-12 sm:ml-24 md:ml-2 rounded-full transition duration-300 md:w-3/4">Login</button>
          </form>
          <div className="text-center mt-2 md:text-left">
            <p>Don't have an account? <a href="/signup" className="text-orange-600 font-bold">Sign up</a></p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Login
