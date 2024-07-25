const express = require("express");
const uploadFileMulter = require("../config/uploadFileMulter");
const { createFile } = require("../controller/fileController");

const fileRouter = express.Router();

fileRouter.route("/").post(uploadFileMulter.single("file"), createFile);
// fileRouter.delete('/file/:id', deleteFile);

module.exports = fileRouter;
