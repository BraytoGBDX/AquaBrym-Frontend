import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/session/Login';
import Home from '../pages/home/Dashboard'; 
import AdminDashboard from '../pages/admin/Dashboard'; 
import UserDashboard from '../pages/user/Dashboard'; 

function AppRoutes() {
  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <Routes>
      {/* Ruta raíz: redirección según token */}
      <Route
        path="/"
        element={
          token?.tipo === "admin" ? (
            <Navigate to="/admin" />
          ) : token?.tipo === "user" ? (
            <Navigate to="/user" />
          ) : (
            <Home />
          )
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
    </Routes>
  );
}

export default AppRoutes;
