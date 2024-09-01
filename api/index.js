import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import component_router from "./routes/component.route.js";
import device_router from "./routes/device.route.js";
import filter_option_router from "./routes/filter.option.route.js";
import component_device_router from "./routes/component.device.route.js";
import multer from "multer";

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

///imgage uploading

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload"); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filenames
  },
});

// Configure multer to handle multiple file uploads
const upload = multer({ storage: storage });

app.post("/api/upload", upload.array("files", 10), (req, res) => {
  const files = req.files; // Access the array of files
  if (files && files.length > 0) {
    // Map through the files to get their filenames
    const fileNames = files.map((file) => `/upload/${file.filename}`);
    res.status(200).json({ filenames: `${fileNames}` });
  } else {
    res.status(400).json({ error: "File upload failed" });
  }
});

//image uploading

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// express.static("/images", "images")
app.use("/api/components/", component_router);
app.use("/api/devices/", device_router);
app.use("/api/filter-options/", filter_option_router);
app.use("/api/component-device/", component_device_router);
