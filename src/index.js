import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import EmpleadosOficio from "./components/EmpleadosOficio";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <EmpleadosOficio />
  </div>
);

reportWebVitals();
