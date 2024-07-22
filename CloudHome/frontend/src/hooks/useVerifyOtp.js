// import { useState } from "react";

const useVerifyOtp = () => {
  const verifyOtp = async (otp) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/otp/verify-otp`,
        {
          method: "POST",
          body: JSON.stringify({ otp }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      alert(data.message);
      return data;
    } catch (err) {
      alert(err.message);
      return null;
    }
  };

  return {
    verifyOtp,
    // loading,
    // error
  };
};

export default useVerifyOtp;
