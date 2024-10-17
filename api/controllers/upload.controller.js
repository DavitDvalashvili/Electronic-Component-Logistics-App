import pool from "../db/database.js";

export const uploadImage = (req, res) => {
  const files = req.files;
  if (files && files.length > 0) {
    const fileNames = files.map((file) => `/images/${file.filename}`);
    res.status(200).json({ filenames: fileNames });
  } else {
    res.status(400).json({ error: "No files uploaded" });
  }
};

export const uploadPDF = (req, res) => {
  const file = req.file;
  if (file) {
    const fileName = `/dataSheet/${file.filename}`;
    res.status(200).json({ filename: fileName });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
};

export const addImages = async (req, res) => {
  const { image_url, component_id, device_id } = req.body;

  try {
    let insertQuery;
    let queryValues;

    if (component_id) {
      insertQuery = `INSERT INTO images (image_url, component_id) VALUE(?, ?)`;
      queryValues = [image_url, component_id];
    } else if (device_id) {
      insertQuery = `INSERT INTO images (image_url, device_id) VALUE(?, ?)`;
      queryValues = [image_url, device_id];
    }

    await pool.query(insertQuery, queryValues);

    res.status(201).json({ message: "Images added successfully" });
  } catch (error) {
    console.error("Database query error", error);
    res.status(500).json({ message: "Server Error" });
  }
};
