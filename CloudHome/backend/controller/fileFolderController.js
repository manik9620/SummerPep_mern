const FileFolderModel = require("../model/fileSchema");

const getFileFolders = async (req, res) => {
  try {
    const { _id } = req.user;
    const { parentId } = req.body;
    const filefolders = await FileFolderModel.find({ userId: _id ,parentId});

    res.status(200).json({
      status: "success",
      data: { filefolders },
    });
  } catch (error) {
    console.error("------------------");
    console.log(error);
    console.error("------------------");
    res.status(500);
    res.json({
      status: "Fail",
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = { getFileFolders };
