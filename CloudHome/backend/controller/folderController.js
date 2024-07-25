const FileFolderModel = require("../model/fileSchema");
// const cloudinary = require("../config/cloudinary");
// const fsPromises = require("fs/promises");

const createFolder = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const { _id } = req.user;

    const isFileNameExists = await FileFolderModel.findOne({
      name,
      userId: _id,
      parentId,
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
      parentId,
    });

    res.status(201);
    res.json({ status: "success", message: "Folder Created" });
  } catch (error) {
    console.error("------------------");
    console.log(error);
    console.error("------------------");
    res.status(500).json({ status: "Fail", message: "Internal Server Error" });
  }
};



const deleteFile = async (fileId) => {
  try {
    const file = await FileFolderModel.findById(fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // // Delete from Cloudinary if needed
    // if (file.metaData.cloudinary && file.metaData.cloudinary.public_id) {
    //   await cloudinary.uploader.destroy(file.metaData.cloudinary.public_id);
    // }

    // // Delete from local storage if needed
    // if (file.metaData.multer && file.metaData.multer.path) {
    //   await fsPromises.rm(file.metaData.multer.path);
    // }

    // Delete file document from MongoDB
    await FileFolderModel.findByIdAndDelete(fileId);
  } catch (err) {
    console.error("Error deleting file:", err);
    throw err;
  }
};

// const deleteFolderById = async (folderId) => {
//   try {
//     const folder = await FileFolderModel.findById(folderId);
//     if (!folder) {
//       throw new Error("Folder not found");
//     }

//     // Find all items (files and subfolders) in the folder
//     const items = await FileFolderModel.find({ parentId: folderId });

//     // Delete all items recursively
//     for (const item of items) {
//       if (item.type === "folder") {
//         await deleteFolderById(item._id);
//       } else {
//         await deleteFile(item._id);
//       }
//     }

//     // Delete the folder document
//   } catch (err) {
//     console.error("Error deleting folder by ID:", err);
//     throw err;
//   }
// };

const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    console.log("hello ")
    console.log("folderId---------:",folderId)
    const folder = await FileFolderModel.findById(folderId);
    console.log(folder)
    if (!folder) {
      return res.status(404).json({
        status: "fail",
        message: "Folder not found",
      });
    }
    
    await FileFolderModel.findByIdAndDelete(folderId);
    
    res.status(200).json({
      status: "success",
      message: "Folder deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting folder:", err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

module.exports = { createFolder, deleteFolder };
