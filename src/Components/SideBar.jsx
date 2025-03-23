import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaHistory,
  FaHome,
  FaListAlt,
  FaUserCircle,
} from "react-icons/fa";
import { SiAuth0 } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { TiThLarge } from "react-icons/ti";
import { BiSolidBellRing } from "react-icons/bi";
import { RiChatPrivateFill } from "react-icons/ri";
import { MdAddBusiness, MdLogout } from "react-icons/md";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCartFlatbed } from "react-icons/fa6";

const SideBar = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("isAuth"); // Check for string equality
    if (authToken) {
      setIsLoggedIn(true);
    } // Set based on either context or local storage
  }, [logout]);
  const handlelogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/signup");
  };
  return (
    <div className="relative">
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="fixed top-3 left-2 z-2000 bg-gray-800 text-white p-2 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* {isOpen ? <IoMdClose color="white" /> : <FiMenu color="white" />} */}
        {isOpen ? (
          <IoMdClose fontSize={25} color="white" />
        ) : (
          // <TiThLargeOutline fontSize={25} color="white" />
          <TiThLarge fontSize={25} color="white" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={` mt-5 max-sm:mt-0 fixed top-0 left-0 h-screen bg-gray-100 text-gray-800 rounded-r-2xl shadow-lg w-64 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Main Navigation */}
        <div className="p-4">
          {/* <h2 className="text-lg font-semibold mb-4">Admin Navigation</h2> */}
          <NavLink to="/profile">
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src="https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg"
                alt="Logo"
                className="w-20 h-20 mb-4 rounded-2xl transform hover:scale-120 transition-transform duration-200"
              />
              <h2 className=" flex items-center gap-3 text-2xl font-semibold">
                <FaUserCircle fontSize={30} className="text-blue-500" />
                Admin
              </h2>
            </div>
          </NavLink>

          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md mb-3 ${
                isActive ? "bg-gray-800 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <div className="flex items-center gap-2 text-xl">
              <FaHome fontSize={25} /> Dashboard
            </div>
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/all-products"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md mb-3 ${
                isActive ? "bg-gray-800 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <div className="flex items-center gap-2 text-xl">
              <FaCartFlatbed fontSize={25} /> All Products
            </div>
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/add-product"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md mb-3 ${
                isActive ? "bg-gray-800 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <div className="flex items-center gap-2 text-xl">
              {/* <MdAddBusiness fontSize={25} /> Add Product */}
              <IoMdAddCircle fontSize={25} /> Add Product
            </div>
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md mb-3 ${
                isActive ? "bg-gray-800 text-white " : "hover:bg-gray-300"
              }`
            }
          >
            <div className="flex items-center gap-2 text-xl">
              {/* <FaTable fontSize={25} /> Users */}
              <FaBox fontSize={25} /> Orders
            </div>
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/history"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md mb-3 ${
                isActive ? "bg-gray-800 text-white " : "hover:bg-gray-300"
              }`
            }
          >
            <div className="flex items-center gap-2 text-xl">
              {/* <MdChat fontSize={25} /> Chat */}
              <FaHistory fontSize={25} /> History
            </div>
          </NavLink>
          {/* <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/notification"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md mb-3 ${
                isActive ? "bg-gray-800 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <div className="flex items-center gap-2 text-xl">
              <BiSolidBellRing fontSize={25} /> Notification{" "}
            </div>
          </NavLink> */}
        </div>

        {/* Auth Pages */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Auth Pages</h2>
          {isLoggedIn ? (
            <button
              onClick={handlelogout}
              className="flex items-center gap-2 text-xl px-4 py-2 rounded-md hover:bg-gray-300"
            >
              <MdLogout fontSize={30} />
              Logout
            </button>
          ) : (
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md mb-3 ${
                  isActive ? "bg-gray-800 text-white" : "hover:bg-gray-300"
                }`
              }
            >
              <div className="flex items-center gap-2 text-xl">
                <SiAuth0 fontSize={25} /> Sign Up
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
