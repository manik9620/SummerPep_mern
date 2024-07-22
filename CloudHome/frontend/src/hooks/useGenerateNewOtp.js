import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useGenerateNewOtp = () => {
  const { token } = useSelector((e) => e.auth);

  const generateNewOtp = async () => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/v1/otp/generate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (data.status === "success") {
        toast.success(data.message);
      } 
      else if(data.status === "already_sent"){
        toast.warning(data.message);

      }
      else {
        toast.success(data.message);
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  return { generateNewOtp };
};

export default useGenerateNewOtp;
