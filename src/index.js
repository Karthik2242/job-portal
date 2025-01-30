import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import { ApplicationProvider } from "./utils/ApplicationContext"; // Ensure this file exists

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApplicationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApplicationProvider>
    </Provider>
  </React.StrictMode>
);
