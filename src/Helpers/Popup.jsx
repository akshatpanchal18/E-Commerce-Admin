import React from "react";
import { IoMdClose } from "react-icons/io";

const Popup = ({
  message = "success",
  className = "bg-blue-700 text-white",
  popUpClose,
}) => {
  return (
    <div
      className={`absolute right-20 max-w-[15rem]  w-full p-2 rounded-lg ${className}`}
    >
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">{message}</p>
        <IoMdClose onClick={popUpClose} fontSize={20} />
      </div>
    </div>
  );
};

export default Popup;
