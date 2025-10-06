import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

const App = () => {
  return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/login' element = {<LoginPage/>}/>
            <Route path='/signup' element = {<SignupPage/>}/>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <DashboardPage/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
  )
}

export default App;