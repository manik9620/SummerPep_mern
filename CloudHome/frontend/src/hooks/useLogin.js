// import { useNavigate } from "react-router-dom";  
import { useDispatch } from "react-redux";
import { appLogin } from "../store/slices/authSlice";

const useLogin = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        // navigate("/");
        dispatch(appLogin(data));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Signup error: " + err.message);
    }
  };
  return { login };
};

export default useLogin;
