import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useDeleteFolder = () => {
  const { token } = useSelector((state) => state.auth);

  const deleteFolder = async (folderId) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/v1/folder/delete/${folderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete folder");
      }

      toast.success("Folder deleted successfully");
    } catch (error) {
      alert(error.message || "An unexpected error occurred");
      console.error("Failed to delete folder:", error);
      return false;
    }
  };

  return { deleteFolder };
};

export default useDeleteFolder;
