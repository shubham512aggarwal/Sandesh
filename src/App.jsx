import React from 'react'
import './App.css'
import { Route, Navigate, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RequireAuth from './components/auth/RequireAuth'
import ChatPage from './pages/ChatPage'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/chat' element={<RequireAuth><ChatPage/></RequireAuth>} />
      <Route path='*' element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
