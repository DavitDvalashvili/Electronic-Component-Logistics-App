// controllers/upload.controller.js
export const uploadFiles = (req, res) => {
  const files = req.files;
  if (files && files.length > 0) {
    const fileNames = files.map((file) => `/upload/${file.filename}`);
    res.status(200).json({ filenames: fileNames });
  } else {
    res.status(400).json({ error: "No files uploaded" });
  }
};
