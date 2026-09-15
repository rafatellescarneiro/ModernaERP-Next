/**
 * ==========================================================
 * Arquivo: main.tsx
 *
 * Ponto de entrada da aplicação.
 * ==========================================================
 */

import React from "react";
import {
  BrowserRouter
} from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./ui/styles/globals.css";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
).render(
  <React.StrictMode>

    <BrowserRouter>

      <App />

    </BrowserRouter>

  </React.StrictMode>,
);
