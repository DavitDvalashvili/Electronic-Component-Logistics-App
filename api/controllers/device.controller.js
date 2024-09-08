import pool from "../db/database.js";

// Get all devices with optional search and pagination
export const getDevices = (req, res) => {
  const { search_term, page, name, electrical_supply, size } = req.query;

  const pageSize = 10;
  let offset = 0;
  let paginationClause = "";

  if (page) {
    const pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ message: "Invalid page number" });
    }
    offset = (pageNumber - 1) * pageSize;
    paginationClause = " LIMIT ? OFFSET ?";
  }

  let q = "SELECT * FROM devices";
  let queryParams = [];
  let conditions = [];

  if (search_term) {
    conditions.push(
      "(name LIKE ? OR purpose LIKE ? OR electrical_supply LIKE ? OR size LIKE ?)"
    );
    const likeTerm = `%${search_term}%`;
    queryParams.push(likeTerm, likeTerm, likeTerm, likeTerm);
  }

  if (name) {
    conditions.push("name LIKE ?");
    queryParams.push(`%${name}%`);
  }

  if (electrical_supply) {
    conditions.push("electrical_supply LIKE ?");
    queryParams.push(`%${electrical_supply}%`);
  }

  if (size) {
    conditions.push("size LIKE ?");
    queryParams.push(`%${size}%`);
  }

  if (conditions.length > 0) {
    q += " WHERE " + conditions.join(" AND ");
  }

  // Add pagination if applicable
  q += paginationClause;
  if (page) {
    queryParams.push(pageSize, offset);
  }

  pool.query(q, queryParams, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    return res.status(200).json(data);
  });
};

// Get a single device by ID
export const getDevice = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM devices WHERE id = ?";

  pool.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Device not found!" });
    }
    return res.status(200).json(data[0]);
  });
};

// Add a new device
export const addDevice = (req, res) => {
  const {
    name,
    purpose,
    electrical_supply,
    size,
    images_urls = ["../../public/image.png"],
  } = req.body;

  // Query to check if a device with the same name already exists
  const checkQuery = `SELECT * FROM devices WHERE name = ?`;

  pool.query(checkQuery, [name], (err, result) => {
    if (err) {
      console.error("Error checking for existing device:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // If a device with the same name already exists, return 409 Conflict
    if (result.length > 0) {
      return res
        .status(409)
        .json({ message: "Device with this name already exists" });
    }

    // If no device with the same name, proceed to insert the new device
    const insertQuery = `
      INSERT INTO devices 
      (name, purpose, electrical_supply, size, images_urls)
      VALUES (?, ?, ?, ?, ?)`;

    const values = [name, purpose, electrical_supply, size, images_urls];

    pool.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting device:", err);
        return res.status(500).json({ message: "Failed to add device" });
      }
      return res
        .status(201)
        .json({ id: result.insertId, message: "Device added successfully" });
    });
  });
};

export const updateDevice = (req, res) => {
  const id = req.params.id;
  const {
    name,
    purpose,
    electrical_supply,
    size,
    available_quantity,
    unit_cost,
    images_urls,
  } = req.body;

  // Query to check if another device with the same name already exists (excluding the current device by id)
  const checkQuery = `SELECT * FROM devices WHERE name = ? AND id != ?`;

  pool.query(checkQuery, [name, id], (err, result) => {
    if (err) {
      console.error("Error checking for existing device name:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // If a device with the same name exists, return 409 Conflict
    if (result.length > 0) {
      return res
        .status(409)
        .json({ message: "Device with this name already exists" });
    }

    // Proceed with the update if no duplicate name is found
    const updateQuery = `
      UPDATE devices
      SET 
        name = ?, 
        purpose = ?, 
        electrical_supply = ?, 
        size = ?,
        available_quantity = ?,
        unit_cost = ?,
        images_urls = ?
      WHERE id = ?`;

    const values = [
      name,
      purpose,
      electrical_supply,
      size,
      available_quantity,
      unit_cost,
      images_urls,
      id,
    ];

    pool.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error updating device:", err);
        return res.status(500).json({ message: "Failed to update device" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Device not found" });
      }

      return res.status(200).json({ message: "Device updated successfully" });
    });
  });
};

// Delete a device by ID
export const deleteDevice = (req, res) => {
  const deviceId = req.params.id;

  const q = `DELETE FROM devices WHERE id = ?`;

  pool.query(q, [deviceId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete device" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Device not found" });
    }

    return res.status(200).json({ message: "Device deleted successfully" });
  });
};
