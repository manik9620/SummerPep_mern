import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

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
    <div style={loginPageStyles}>
      <h1>Sign Up</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
};

export default signupPage;
