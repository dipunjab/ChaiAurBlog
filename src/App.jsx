import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect } from 'react'
import authService from "./Appwrite/auth"
import { login, logout } from './Store/authSlice'

function App() {

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
    <>
      <div>
        <h1>hey</h1>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </>
  )
}

export default App