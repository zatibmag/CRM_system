import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Main } from "./react/main";

document.addEventListener("DOMContentLoaded", () => {
  const reactContainer = document.querySelector(".main");

  if (!reactContainer) {
    throw new Error("No container found");
  }

  const root = ReactDOM.createRoot(reactContainer);
  root.render(<Main />);
});
