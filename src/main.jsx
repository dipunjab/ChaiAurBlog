import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login, Signup, AuthLayout } from "./Components/index.js"
import { Provider } from 'react-redux'
import store from "./Store/Store.js"
import Home from './Components/Home.jsx'
import Profile from './Components/Profile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout>
        <App />
      </AuthLayout>
    ),
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/profile',
        element: <Profile/>
      }
    ]
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
