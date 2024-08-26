import db from "../db/database.js";

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
