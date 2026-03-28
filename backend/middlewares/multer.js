const multer = require("multer");

const storage = multer.memoryStorage();

const singalUpload = multer({ storage }).single("file");

module.exports = { singalUpload };
