import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // ✅ Styles should be imported before components
import App from "./App.jsx"; // ✅ Main app component

import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    if (confirm("New version available. Refresh now?")) {
      location.reload();
    }
  },
  onOfflineReady() {
    // This function still runs but won't log in the console.
  },
});

// Render the React App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
