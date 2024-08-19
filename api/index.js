import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db/database.js";

// config dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT;

import componentRouter from "./routes/component.route.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use("/api/component", componentRouter);
