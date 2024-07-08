import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { App } from "./react/App";

document.addEventListener("DOMContentLoaded", () => {
  const reactContainer = document.querySelector(".main");

  if (!reactContainer) {
    throw new Error("No container found");
  }

  const root = ReactDOM.createRoot(reactContainer);
  root.render(<App />);
});
