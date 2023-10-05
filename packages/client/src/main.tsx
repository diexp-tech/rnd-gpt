import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <App />
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
