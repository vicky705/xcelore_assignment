import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Landing from './Components/Landing/Landing'
import UserManagement from './Components/UserManagement/UserManagement'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {isLogin, isAdmin} = useSelector(state => state.userSlice);

  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
      transition: Bounce/>
      <Navbar />
      <Routes>
       {isLogin && <Route path="/" element={<Landing/>} />}
       {isLogin && <Route path="/home" element={<Landing/>} />}
        {isLogin && isAdmin && <Route path="/usermanagement" element={<UserManagement/>} />}
        {!isLogin && <Route path="/register" element={<Register/>} />}
       {!isLogin && <Route path="/login" element={<Login/>} />}
       <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </>
  )
}

export default App
