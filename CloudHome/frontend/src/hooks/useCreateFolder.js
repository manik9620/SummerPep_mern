import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useCreateFolder = () => {
  const { token } = useSelector((e) => e.auth);

  const createFolder = async ({ name, parentId }) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/v1/folder/create`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            parentId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      console.log(error.message);

      toast.error("Cannot make duplicate folders");
    }
  };

  return { createFolder };
};

export default useCreateFolder;
