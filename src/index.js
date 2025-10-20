import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Cursos from "./components/ejemplocomunicacion/Cursos";
import Router from "./Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
     <Router />
);

reportWebVitals();
