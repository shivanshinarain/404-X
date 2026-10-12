import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ClientPortal from './pages/ClientPortal.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import About404OX from './pages/About404OX.jsx'
import { SoundProvider } from './context/SoundContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SoundProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about-404ox" element={<About404OX />} />
            <Route path="/what-is-404ox" element={<About404OX />} />
            <Route path="/portal/*" element={<ClientPortal />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </SoundProvider>
    </BrowserRouter>
  </StrictMode>,
)
