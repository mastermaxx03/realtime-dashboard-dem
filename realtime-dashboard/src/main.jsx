// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MachineStatusProvider } from "./contexts/MachineStatusContext"; // 1. IMPORT THE PROVIDER
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. WRAP YOUR APP WITH THE PROVIDER */}
      <MachineStatusProvider>
        <App />
      </MachineStatusProvider>
    </BrowserRouter>
  </React.StrictMode>
);
