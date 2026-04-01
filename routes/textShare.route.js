const {uploadText,getText} = require('../controllers/textShare.controller');
const express = require('express');

const router = express.Router();
router.post("/upload-text", uploadText);
router.get("/get-text/:pasteId", getText);
module.exports = router;