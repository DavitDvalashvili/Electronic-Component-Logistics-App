import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import componentRouter from "./routes/component.route.js";
import filterOptionRouter from "./routes/filter.option.route.js";

// config dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*", // Allows requests from any origin
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use("/api/components/", componentRouter);
app.use("/api/filter-options/", filterOptionRouter);
