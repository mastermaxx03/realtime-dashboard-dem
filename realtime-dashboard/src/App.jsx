// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
// Make sure this path is correct for your project structure
import RealtimeLayoutPage2 from "./views/realtime-layout2";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<RealtimeLayoutPage2 />} />
    </Routes>
  );
}

export default App;
