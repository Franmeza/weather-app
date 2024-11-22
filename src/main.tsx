import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WeatherContextProvider from "./contexts/WeatherContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherContextProvider>
      <App />
    </WeatherContextProvider>
  </StrictMode>
);
