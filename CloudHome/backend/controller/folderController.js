const FileFolderModel = require("../model/fileSchema");

const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const { _id } = req.user;

    console.log("name--------->",name);
    console.log("_id--------->",_id)

    const isFileNameExists = await FileFolderModel.findOne({
      name,
      userId: _id,
    });

    if (isFileNameExists) {
      res.status(400);
      res.json({
        status: "Fail",
        message: "Folder name already exists",
      });
      return;
    }

    const newFolder = await FileFolderModel.create({
      name,
      userId: _id,
      type: "folder",
    });

res.status(201);
res.json({status:"success", message:"Folder Created"})

  } catch (error) {
    console.error("------------------");
    console.log(error);
    console.error("------------------");
    res.status(500).json({ status: "Fail", message: "Internal Server Error" });
  }
};

module.exports = { createFolder };
