import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import folderIcon from "../public/assests/folder.png";
import fileIcon from "../public/assests/word.png";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useUploadFile from "../hooks/useUploadFile";
import { MdKeyboardArrowRight } from "react-icons/md";

const Homepage = () => {
  const [newFolder, setNewFolder] = useState("");
  const createFolderRef = useRef(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const { createFolder } = useCreateFolder();
  const { getFileFolders, fileFolders } = useGetFileFolders();
  const [folderStructure, setFolderStructure] = useState([
    { _id: null, name: "Cloud Home" },
  ]);

  const parentFolder = folderStructure[folderStructure.length - 1];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        createFolderRef.current &&
        !createFolderRef.current.contains(event.target)
      ) {
        setShowCreateFolder(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchFileFolders = async () => {
      await getFileFolders(parentFolder._id);
    };

    fetchFileFolders();
  }, [parentFolder._id]);

  const handleDoubleClick = (elem) => {
    if (elem.type === "folder") {
      setFolderStructure([...folderStructure, elem]);
    } else {
      window.open(elem.link);
    }
  };

  const handleAllowCreateFolder = () => {
    setShowCreateFolder(true);
  };

  const handleCreateFolder = async () => {
    if (newFolder.length > 0) {
      await createFolder({
        name: newFolder,
        parentId: parentFolder._id,
      });
      await getFileFolders(parentFolder._id);
      setShowCreateFolder(false);
      setNewFolder("");
    }
  };

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.filter(
      (elem, idx) => idx <= clickIdx
    );
    setFolderStructure(newFolderStructure);
  };

  const { isUploadAllowed, uploadFile } = useUploadFile();

  const handleFileUpload = async (e) => {
    if (isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({
        file: file[0],
        parentId: parentFolder._id,
      });
      await getFileFolders(parentFolder._id);
    }
  };

  return (
    <div className={`app-container ${showCreateFolder ? "backdrop" : ""}`}>
      <Navbar />
      <div className="homepage-main-container no-select">
        <div className="homepage-left-container">
          <button onClick={handleAllowCreateFolder}>New</button>
          <input type="file" onChange={handleFileUpload} />
        </div>
        <div className="homepage-right-container">
          <ul className="homepage-file-navigation">
            {folderStructure.map((folder, index) => (
              <li key={index} onClick={() => handleBackClick(index)}>
                {folder.name}
                {index !== folderStructure.length - 1 && (
                  <MdKeyboardArrowRight />
                )}
              </li>
            ))}
          </ul>
          <div className="folders-container">
            {fileFolders.length === 0 ? (
              <p className="no-files">No Files or Folders</p>
            ) : (
              fileFolders.map((elem) => (
                <div
                  className="folder"
                  key={elem._id}
                  onDoubleClick={() => handleDoubleClick(elem)}
                >
                  <img
                    src={elem.type === "folder" ? folderIcon : fileIcon}
                    alt={elem.name}
                    className="folder-icon"
                  />
                  <p>{elem.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {showCreateFolder && (
        <div className="create-folder-container" ref={createFolderRef}>
          <h3>New Folder</h3>
          <input
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            placeholder="Folder Name"
          />
          <div className="create-folder-container-buttons">
          <button
            onClick={() => {
              setShowCreateFolder(false);
            }}
          >
            Cancel
          </button>
            <button onClick={handleCreateFolder}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
