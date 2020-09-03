import React, { useState } from "react";

const Modal = ({ item }) => {
  const [visible, Setvisible] = useState(true);
  const handleAction = () => {
    if (item.action.url) return;

    Setvisible(false);
  };
  return (
    <div className="modal" style={{ display: visible ? "flex" : "none" }}>
      <div className="modal-card">
        <h1>{item.message}</h1>
        <a href={item.action.url || "#"} onClick={handleAction}>
          {item.action.text || "close"}
        </a>
      </div>
    </div>
  );
};

export default Modal;
