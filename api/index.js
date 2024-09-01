import express from "express";
import cors from "cors";
import component_router from "./routes/component.route.js";
import device_router from "./routes/device.route.js";
import filter_option_router from "./routes/filter.option.route.js";
import component_device_router from "./routes/component.device.route.js";
import upload_router from "./routes/upload.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
