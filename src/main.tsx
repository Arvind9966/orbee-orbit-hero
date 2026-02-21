import { createRoot } from "react-dom/client";
import '@fontsource/google-sans-flex/400.css';
import '@fontsource/google-sans-flex/500.css';
import '@fontsource/google-sans-flex/700.css';
import '@fontsource/google-sans-flex/800.css';
import '@fontsource/google-sans-flex/900.css';
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
