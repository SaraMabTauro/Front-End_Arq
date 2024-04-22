import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')); // Usa createRoot en lugar de ReactDOM.createRoot

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
