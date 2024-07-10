import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="457050949387-k23ft8nrfg5vd0g8ktlh3d69r6ok086i.apps.googleusercontent.com">
        <App />
        <ToastContainer
          progressClassName="toastProgress"
          bodyClassName="toastBody"
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce>
        </ToastContainer>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


