import { useSelector } from "react-redux";
import { useState } from "react";

const useUploadFile = () => {
  const { token } = useSelector((e) => e.auth);
  const [isUploadAllowed, setIsUploadAllowed] = useState(true);

  const uploadFile = async ({ file, parentId }) => {
    try {
      setIsUploadAllowed(false);
      let formData = new FormData();
      formData.append("file", file);
      formData.append("parentId", parentId);

      const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log("------------->", res);
    } catch (error) {
      alert(error);
    } finally {
      setIsUploadAllowed(true);
    }
  };
  return { uploadFile, isUploadAllowed };
};

export default useUploadFile;
