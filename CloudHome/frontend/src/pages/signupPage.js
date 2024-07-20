import React, { useState } from "react";
import useSignup from "../hooks/useSignup";
import { Link } from "react-router-dom";


const signupPage = () => {
  const loginPageStyles = {
    border:"1px solid slategray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    margin: "auto",
    padding: "24px",
    width:"25%"
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useSignup();

  const handleSubmit = () => {
    const validation = true;
    if (validation) {
      signup({ email, password });
    } else {
      alert("validation failed");
    }
  };

  return (
    <div className="signup-page-container">
      <h1>Sign Up</h1>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter you email..."
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter you password..."
      />
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
};

export default signupPage;
