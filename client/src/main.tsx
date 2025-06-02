import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom fonts
const fontLinks = `
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
`;

// Insert font links into the head
document.head.insertAdjacentHTML('beforeend', fontLinks);

// Set document title
document.title = "MXRaceHub - Supercross & Motocross Racing";

createRoot(document.getElementById("root")!).render(<App />);
