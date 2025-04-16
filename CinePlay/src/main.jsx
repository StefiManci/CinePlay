import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-1jk87eiwxu13lwg6.us.auth0.com"
    clientId="kJMPVsTqigkr1iVWJN8Kvd3W7s56d15y"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation="localstorage"
  useRefreshTokens={true} 
  >
    <App />
  </Auth0Provider>
  </StrictMode>,
)
