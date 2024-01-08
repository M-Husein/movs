import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";
import "./style/style.scss";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
  </React.StrictMode>
);
