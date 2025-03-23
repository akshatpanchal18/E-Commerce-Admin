import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

const AdminProfile = ({ onClose }) => {
  const [isSetting, setIsSetting] = useState(false);

  return (
    <div className="absolute top-22 right-5 mt-2 w-64 bg-white rounded-lg shadow-xl z-10 p-4 max-sm:top-15 max-sm:right-10">
      <h3 className="text-lg font-semibold mb-2">Admin Profile</h3>
      <div className="max-h-60 overflow-y-auto">
        <NavLink
          to="/profile"
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition duration-150"
          onClick={onClose}
        >
          <FaUser />
          <span>View Profile</span>
        </NavLink>

        {/* Uncomment if Settings button is needed */}
        {/* <button
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition duration-150"
          onClick={() => setIsSetting(!isSetting)}
        >
          <FaCog />
          <span>Settings</span>
        </button> */}
      </div>
    </div>
  );
};

export default AdminProfile;
