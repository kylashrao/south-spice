import { createRoot } from "react-dom/client";
import App from "./App";
import '@/index.css'; // If using your vite.config path alias

createRoot(document.getElementById("root")!).render(<App />);
