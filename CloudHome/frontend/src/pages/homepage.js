import React, { useState } from "react";
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";

const homepage = () => {
  const [newFolder, setNewFolder] = useState(null);
  const [showCreateFolder, setshowCreateFolder] = useState(null);

  const { createFolder } = useCreateFolder();

  const handleAllowCreateFolder = () => {
    setshowCreateFolder(true);
  };

  const handleCreateFolder = () => {
    if (newFolder.length > 0) {
      createFolder({ name: newFolder });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="homepage-main-container">
        <h1>Welcome to Cloud Home</h1>
        <button onClick={handleAllowCreateFolder}> Create Folder</button>
        <button>Upload File</button>
        <h4>Cloud Home</h4>

        <div>
          {showCreateFolder && (
            <div className="create-folder-container">
              <input
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
              />
              <button onClick={handleCreateFolder}>Create</button>
              <button
                onClick={() => {
                  setshowCreateFolder(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default homepage;
