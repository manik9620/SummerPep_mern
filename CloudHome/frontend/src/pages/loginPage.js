import React from "react";

const loginPage = () => {
  const loginPageStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    margin: "auto",
    padding: "24px",
  };

  return (
    <div style={loginPageStyles}>
      <h1>Log In</h1>
      <input type="text" />
      <input type="password" />
      <button>Login</button>
    </div>
  );
};

export default loginPage;
