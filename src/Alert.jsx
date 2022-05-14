import React from "react";
import { useEffect } from "react";

const Alert = ({ msg, type, showAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showAlert, list]);

  return (
    <p
      className={`text-center font-mono font-semibold text-white ${
        type === "success" ? "bg-green-400" : "bg-red-500"
      }`}
    >
      {msg}
    </p>
  );
};

export default Alert;
