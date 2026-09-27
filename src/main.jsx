import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/auth/App.jsx'
import { LanguageProvider } from './components/LanguageContext.jsx';
import './tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
