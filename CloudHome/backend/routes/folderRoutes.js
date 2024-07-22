const express=require("express");
const { createFolder } = require("../controller/folderController");

const folderRouter=express.Router();

folderRouter.post("/create",createFolder);



module.exports=folderRouter;