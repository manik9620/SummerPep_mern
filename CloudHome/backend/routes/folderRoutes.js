const express = require("express");
const {
  createFolder,
  deleteFolder,
} = require("../controller/folderController");

const folderRouter = express.Router();

folderRouter.post("/create", createFolder);
folderRouter.delete("/delete/:id", deleteFolder);

module.exports = folderRouter;
