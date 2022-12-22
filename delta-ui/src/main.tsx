import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import { routes } from "./routes";

const rotas = routes.map((rota, key) => (
  <Route path={rota.path} key={key} element={<rota.element></rota.element>}>
    {rota.children
      ? rota.children.map((children, key) => (
          <Route
            key={key}
            path={children.path}
            element={<children.element></children.element>}
          ></Route>
        ))
      : ""}
  </Route>
));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>{rotas.map((element) => element)}</Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
