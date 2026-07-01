import React from "react";
import ReactDOM from "react-dom/client";

import { APIProvider } from "@vis.gl/react-google-maps";

import App from "./app/app.jsx";

import { AuthProvider } from "./shared/context/CustomerAuthContext";
import { AdminAuthProvider } from "./shared/context/AdminAuthContext";

import "./index.css";
import "./global.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <APIProvider
      apiKey={
        import.meta.env
          .VITE_GOOGLE_MAPS_API_KEY
      }
    >

      <AuthProvider>

        <AdminAuthProvider>

          <App />

        </AdminAuthProvider>

      </AuthProvider>

    </APIProvider>

  </React.StrictMode>

);