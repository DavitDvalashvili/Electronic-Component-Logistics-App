import express from "express";
import cors from "cors";
import component_router from "./routes/component.route.js";
import device_router from "./routes/device.route.js";
import filter_option_router from "./routes/filter.option.route.js";
import component_device_router from "./routes/component.device.route.js";
import upload_router from "./routes/upload.route.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT;

// Resolve __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: ["http://192.168.0.102:8000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT"],
  })
);
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/upload",
  express.static(path.join(__dirname, "../client/public/upload"))
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// express.static("/images", "images")
app.use("/api/components/", component_router);
app.use("/api/devices/", device_router);
app.use("/api/filter-options/", filter_option_router);
app.use("/api/component-device/", component_device_router);
app.use("/api/", upload_router);
