import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Fonts are bundled with the app (no third-party font requests).
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
