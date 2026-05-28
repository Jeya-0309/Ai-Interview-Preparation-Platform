import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { Provider } from "react-redux";

import { store } from "./app/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Provider store={store}>
      
        <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
  }}
/>
      <App />
    </Provider>

  </React.StrictMode>
);