import pool from "../db/database.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

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
    const fileName = `/files/dataSheet/${file.filename}`;
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

export const deleteImage = (req, res) => {
  const imageId = req.params.id;

  // First query to get the image URL (or name) based on the ID
  const getImageQuery = `SELECT image_url FROM images WHERE id = ?`;

  // Second query to delete the image from the database
  const deleteImageQuery = `DELETE FROM images WHERE id = ?`;

  // Fetch the image URL (or name) first
  pool.query(getImageQuery, imageId, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to retrieve image" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    let imagePath = results[0].image_url;

    // Ensure imagePath does not start with a slash (optional check)
    if (imagePath.startsWith("/")) {
      imagePath = imagePath.substring(1);
    }

    // Now delete the image from the database
    pool.query(deleteImageQuery, imageId, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete image" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Image not found" });
      }

      // Get the file path of the current module
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      // Correctly join paths, ensuring no double slashes

      const fullImagePath = path.normalize(
        path.join(__dirname, "..", "files", imagePath)
      );

      console.log(fullImagePath);

      //Delete the file using fs.unlink
      fs.unlink(fullImagePath, (err) => {
        if (err) {
          console.error("File deletion error: ", err);
          return res
            .status(500)
            .json({ error: "Failed to delete image from folder" });
        }

        return res.status(200).json({
          message: "Image deleted successfully from database and folder",
        });
      });
    });
  });
};
