import React from "react";
import "./ConfirmDialog.css";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="confirm-dialog-buttons">
          <button onClick={onCancel} className="cancel-button">Cancel</button>
          <button onClick={onConfirm} className="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
