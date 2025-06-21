// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeProvider } from './components/DarkModeContext'; // Import the provider
import './index.css';
import {Analytics} from "@vercel/analytics/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
      <Analytics />
    </DarkModeProvider>
  </React.StrictMode>
);