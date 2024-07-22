import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import useGenerateNewOtp from "../hooks/useGenerateNewOtp";
import useVerifyOtp from "../hooks/useVerifyotp";
import { toast } from "react-toastify";

const OtpPage = () => {
  const { email } = useSelector((e) => e.auth);
  const [otp, setOtp] = useState();
  const { generateNewOtp } = useGenerateNewOtp();
  const { verifyOtp } = useVerifyOtp();

  const handleSubmit = async () => {
    if (otp.length < 4) {
      toast.error("Invalid OTP")
    } else {
      const num = parseInt(otp);
      if (num >= 1000 && num <= 9999) {
        const result = await verifyOtp( otp);
        if (result && result.status === "success") {
          toast.success("OTP verified successfully")
        } else {
          toast.error("OTP verification failed")
        }
      } else {
        toast.error("Invalid OTP. OTP must be Number");
      }
    }
  };
  useEffect(() => {
    generateNewOtp();
  }, []);

  return (
    <>
      <Navbar />
      <div className="otp-page-container">
        <p>Email : {email}</p>
        <div className="otp-input-container">
          <input
            maxLength={4}
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="otp-column c1" />
          <div className="otp-column c2" />
          <div className="otp-column c3" />
          <div className="otp-column c4" />
        </div>
        <button onClick={handleSubmit} >
          Verify
        </button>
        {/* {error && <p>{error}</p>} */}
      </div>
    </>
  );
};

export default OtpPage;
