import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Worker } from "@react-pdf-viewer/core";

createRoot(document.getElementById("root")!).render(
  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    <App />
  </Worker>
);
