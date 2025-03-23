import React, { useState } from "react";

function Switch() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`relative inline-flex items-center h-5 w-10 rounded-full cursor-pointer ${
        isOn ? "bg-zinc-500" : "bg-gray-300"
      }`}
      onClick={handleToggle}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      ></span>
    </div>
  );
}

export default Switch;
