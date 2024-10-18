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
  const { images_urls, component_id, device_id } = req.body;

  try {
    const urlArr = images_urls.split(",");
    let insertQuery;
    let queryValues;

    for (const image_url of urlArr) {
      if (component_id) {
        insertQuery = `INSERT INTO images (image_url, component_id) VALUE(?, ?)`;
        queryValues = [image_url, component_id];
      } else if (device_id) {
        insertQuery = `INSERT INTO images (image_url, device_id) VALUE(?, ?)`;
        queryValues = [image_url, device_id];
      }

      await pool.query(insertQuery, queryValues);
    }

    res.status(201).json({ message: "Images added successfully" });
  } catch (error) {
    console.error("Database query error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteImage = async (req, res) => {
  const imageId = req.params.id;

  const q = `DELETE FROM images WHERE id = ?`;

  await pool.query(q, imageId, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to delete image" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    return res.status(200).json({ message: "Image deleted successfully" });
  });
};
