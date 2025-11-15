import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';


import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./context/ThemeContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
