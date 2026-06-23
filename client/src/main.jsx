import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './shared/context/CustomerAuthContext';
import { AdminAuthProvider } from './shared/context/AdminAuthContext';

import App from './app/app.jsx';
import './index.css';
import './global.css';

ReactDOM.createRoot(
   document.getElementById('root')
).render(
   <React.StrictMode>

    <AuthProvider>

      <AdminAuthProvider>

        <App />

      </AdminAuthProvider>

    </AuthProvider>

  </React.StrictMode>
);