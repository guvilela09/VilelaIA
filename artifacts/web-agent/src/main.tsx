import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@vilelaia/api-client-react";

const apiUrl = import.meta.env.VITE_API_URL ?? null;
setBaseUrl(apiUrl);

createRoot(document.getElementById("root")!).render(<App />);
