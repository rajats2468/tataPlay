import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './LoginScreen/Login'
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from './LoginScreen/Signup'
import LandingPage from './LoginScreen/LandingPage';
import 'react-toastify/dist/ReactToastify.css'
import RefreshHandler from './RefreshHandler'

function App() {
  const[isAuthenticated,setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element}) => {
    return isAuthenticated?element:<Navigate to={"/login"}/>
  }

  return (
  
      <div className='App'>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Navigate to={"/login"} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<PrivateRoute element={<LandingPage/>}/>} />
        </Routes>
      </div>
  
  )
}

export default App
