import multer from "multer";

// Configuration for image uploads
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadImage = multer({ storage: imageStorage }).array("files", 10);

// Configuration for PDF uploads
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files/dataSheet");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadPDF = multer({ storage: pdfStorage }).single("file");
