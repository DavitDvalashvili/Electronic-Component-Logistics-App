import pool from "../db/database.js";

export const getComponentFilterOptions = (req, res) => {
  const filterBy = req.query.filterBy;
  const validFilters = [
    "name",
    "family",
    "package_type",
    "nominal_value",
    "electrical_supply",
    "suppliers_name",
  ];

  // Check if filterBy is valid
  if (!validFilters.includes(filterBy)) {
    console.error(`Invalid filter option: ${filterBy}`);
    return res.status(400).json({ error: "Invalid filter option" });
  }

  // Query to get distinct filter options
  const q = `SELECT DISTINCT ${filterBy} FROM components`;

  // Execute the query
  pool.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve filter options" });
    }
    if (!data || data.length === 0) {
      console.log(`${filterBy} options not found!`);
      return res.status(404).json({ error: `${filterBy} options not found!` });
    }

    // Send the response with filter options
    return res.status(200).json(data);
  });
};

export const getDeviceFilterOptions = (req, res) => {
  const filterBy = req.query.filterBy;
  const validFilters = ["name", "electrical_supply", "size"];

  // Check if filterBy is valid
  if (!validFilters.includes(filterBy)) {
    console.error(`Invalid filter option: ${filterBy}`);
    return res.status(400).json({ error: "Invalid filter option" });
  }

  // Query to get distinct filter options
  const q = `SELECT DISTINCT ${filterBy} FROM devices`;

  // Execute the query
  pool.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve filter options" });
    }
    if (!data || data.length === 0) {
      console.log(`${filterBy} options not found!`);
      return res.status(404).json({ error: `${filterBy} options not found!` });
    }

    // Send the response with filter options

    return res.status(200).json(data);
  });
};
