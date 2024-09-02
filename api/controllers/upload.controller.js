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
