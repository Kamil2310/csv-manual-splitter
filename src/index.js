import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { SorterProvider } from "./contexts/SorterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SorterProvider>
      <App />
    </SorterProvider>
  </React.StrictMode>
);
