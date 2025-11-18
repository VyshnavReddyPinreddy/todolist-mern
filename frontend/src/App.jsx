import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import ProtectedRoute from "./components/ProtectedRoute";
import ReverseProtectedRoute from './components/ReverseProtectedRoute';

const App = () => {
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        pauseOnHover
        theme='colored'
      />
      
      <Routes>
        <Route path='/' element=
          {
            <ReverseProtectedRoute>
              <Login/>
            </ReverseProtectedRoute>
          }
        />

        <Route path='/register' element=
          {
            <ReverseProtectedRoute>
              <Register/>
            </ReverseProtectedRoute>
          }
        />
        
        <Route path='/verify-email' element=
          {
            <ReverseProtectedRoute>
              <VerifyEmail/>
            </ReverseProtectedRoute>
          }
        />

        <Route path='/forgot-password' element=
          {
            <ReverseProtectedRoute>
              <ForgotPassword/>
            </ReverseProtectedRoute>
          }
        />

        <Route path='/reset-password' element=
          {
            <ReverseProtectedRoute>
              <ResetPassword/>
            </ReverseProtectedRoute>
          }
        />

        <Route path='/dashboard' element=
          {
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App