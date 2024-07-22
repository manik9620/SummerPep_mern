import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { appLogout } from "../../store/slices/authSlice";
import navicon from "../../public/assests/cloud-computing.png"

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(appLogout());
  };
  return (
    <div className="navbar-container">
      <div className="navbar-left-item">
        <img src={navicon} alt="navicon" className="navicon" />
        <h2>Cloud Home</h2>
      </div>
      <div className="navbar-left-item">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
