import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import BreadCrumbs from "./BreadCrumbs";
import AdminProfile from "../Helpers/AdminCard";

const Header = () => {
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);

  // Refs for the modal content
  const adminProfileRef = useRef(null);
  const toggleAdminProfileModal = () => {
    setIsOpenAdmin((prev) => !prev);
    if (isOpen) setIsOpen(false);
    if (isSetting) setIssetting(false);
  };

  const handleClickOutside = (event) => {
    if (
      adminProfileRef.current &&
      !adminProfileRef.current.contains(event.target) &&
      isOpenAdmin
    ) {
      setIsOpenAdmin(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenAdmin]);

  return (
    <div>
      <header className="flex justify-between items-center mb-6 max-sm:flex-col-reverse max-sm:w-xl">
        <div className="max-sm:p-8 max-sm:ml-8 max-sm:mb-0">
          <BreadCrumbs />
        </div>

        <div className="flex items-center gap-4 max-sm:w-xl max-sm:ml-28 max-sm:mt-3 max-sm:gap-5">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 max-sm:max-w-28"
          />

          <button
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 p-2 rounded-lg flex font-bold text-sm items-center gap-2"
            onClick={toggleAdminProfileModal}
          >
            <FaUserCircle fontSize={25} />
            <span>Admin</span>
          </button>
        </div>
      </header>
      {isOpenAdmin && (
        <div className="max-sm:z-50" ref={adminProfileRef}>
          <AdminProfile onClose={() => setIsOpenAdmin(false)} />
        </div>
      )}
    </div>
  );
};

export default Header;
