import React from "react";

function Button({ children }) {
  return (
    <button className="bg-primary p-1 text-white rounded-md">{children}</button>
  );
}

export default Button;
