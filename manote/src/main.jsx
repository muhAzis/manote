import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import './styles/main.css';
import './modules/authInterceptor';
import SettingsContextProvider from './contexts/SettingsContext';
import ConfirmationContextProvider from './contexts/ConfrrmationContext';
import AuthContextProvider from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="main-container">
    <Router>
      <AuthContextProvider>
        <SettingsContextProvider>
          <ConfirmationContextProvider>
            <CookiesProvider>
              <App />
            </CookiesProvider>
          </ConfirmationContextProvider>
        </SettingsContextProvider>
      </AuthContextProvider>
    </Router>
  </div>
);
