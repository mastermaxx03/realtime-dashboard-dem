// src/LoginPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // We will create this file next

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the form from actually submitting
    navigate("/dashboard"); // Navigate to the dashboard page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Dashboard Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" defaultValue="demo@user.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" defaultValue="password" />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
