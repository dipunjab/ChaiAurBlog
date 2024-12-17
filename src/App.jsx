import { Outlet } from 'react-router-dom'
import './App.css'
import authService from './Appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './Store/authSlice';
import { useEffect, useState } from 'react';
import Bar from './Components/SideBar/Bar';
import Title from './Components/Title';


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])



  return (
    <div className="md:grid md:grid-cols-[240px_1fr] h-screen">
      <Bar />
      <div>
        <Title/>
        {!loading ? <Outlet /> : "...Loading"}
      </div>

    </div>
  )
}

export default App