import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/auth/App.jsx'
import { I18nProvider } from './services/i18n.js';
import './tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>,
)
