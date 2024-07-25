import {
     useState } from "react";
import { useSelector } from "react-redux";

const useGetFileFolders = () => {
  const { token } = useSelector((e) => e.auth);
  const [fileFolders, setFileFolders] = useState([]);

  const getFileFolders = async (parentId = null) => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file-folder`, {
        method: "post",
        body: JSON.stringify({ parentId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      console.log(data);
      setFileFolders(data.data.filefolders);
    } catch (error) {
      console.log(error);
      console.log("-------------------->");
      alert(error.message);
    }
  };

  return { getFileFolders, fileFolders };
};

export default useGetFileFolders;
