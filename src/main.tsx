/**
 * ==========================================================
 * Arquivo: main.tsx
 * Ponto de entrada da aplicação.
 * ==========================================================
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/inter";

import { App } from "./app/App";

import "./ui/styles/globals.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
