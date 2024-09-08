import pool from "../db/database.js";

export const getDevices = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const query = `
      SELECT d.name AS device_name, 
             SUM(dc.quantity_per_device) AS component_count_per_device, 
             c.available_quantity AS component_available_quantity
      FROM devices d
      JOIN device_components dc ON d.id = dc.device_id
      JOIN components c ON dc.component_id = c.id
      WHERE dc.component_id = ?
      GROUP BY d.name, c.available_quantity
    `;

  try {
    pool.query(query, [id], (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ message: "Server error" });
      }

      return res.status(200).json(results);
    });
  } catch (error) {
    console.error("Unhandled error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getComponents = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Device ID is required" });
  }

  const query = `
    SELECT dc.id AS device_component_id,
           c.name AS component_name, 
           SUM(dc.quantity_per_device) AS component_count_per_device, 
           c.available_quantity AS component_available_quantity
    FROM device_components dc
    JOIN components c ON c.id = dc.component_id
    WHERE dc.device_id = ?
    GROUP BY dc.id, c.name, c.available_quantity
  `;

  try {
    db.query(query, [id], (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ message: "Server error" });
      }

      return res.status(200).json(results);
    });
  } catch (error) {
    console.error("Unhandled error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getComponentNames = (req, res) => {
  const q = "SELECT name FROM components";

  pool.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching component names:", err);
      return res.status(500).json({ message: "Server error" });
    }

    // Return an array of component names
    const names = data.map((component) => component.name);
    return res.status(200).json(names);
  });
};

export const addComponentDevice = async (req, res) => {
  const { component_id, quantity_per_device, device_id } = req.body;

  try {
    // Check if the device exists
    const deviceQuery = "SELECT id FROM devices WHERE id = ?";
    const device = await db.query(deviceQuery, [device_id]);

    if (device.length === 0) {
      return res.status(400).json({ message: "Device not found" });
    }

    // Check if the component exists
    const componentQuery = "SELECT id FROM components WHERE id = ?";
    const component = await db.query(componentQuery, [component_id]);

    if (!component || component.length === 0) {
      return res.status(400).json({ message: "Component not found" });
    }

    // If no conflict, insert into device_components
    const insertQuery = `
      INSERT INTO device_components (device_id, component_id, quantity_per_device)
      VALUES (?, ?, ?)
    `;
    await db.query(insertQuery, [device_id, component_id, quantity_per_device]);

    return res.status(201).json({
      component_id,
      device_id,
      quantity_per_device,
    });
  } catch (error) {
    console.error("Database query error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const DeleteComponentDevice = async (req, res) => {
  const { id } = req.params;

  const q = `DELETE FROM device_components WHERE id = ?`;

  pool.query(q, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Failed to delete device-component" });
    }
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "device-component not found" });
    }
    return res
      .status(200)
      .json({ message: "device-component deleted successfully" });
  });
};
