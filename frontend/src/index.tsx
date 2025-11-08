/**
 * ReqApp Frontend - Haupteinstiegspunkt
 * Initialisiert die React-Anwendung mit allen Providern
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Root-Element finden
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root-Element nicht gefunden');
}

// React Root erstellen und App rendern
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance-Messung (optional)
// Weitere Informationen: https://bit.ly/CRA-vitals
reportWebVitals();