import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { appLogout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(appLogout());
  };
  return (
    <div className="navbar-container">
      <div className="navbar-left-item">
        <h2>Cloud Home</h2>
      </div>
      <div className="navbar-left-item">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
