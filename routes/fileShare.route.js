const express = require('express');
const {PutObjectUrl, getObjectUrl} = require('../controllers/fileShare.controller');

const Filerouter = express.Router();

Filerouter.post("/upload-file", PutObjectUrl);
Filerouter.get("/get-file/:fileKey", getObjectUrl);

module.exports = Filerouter;