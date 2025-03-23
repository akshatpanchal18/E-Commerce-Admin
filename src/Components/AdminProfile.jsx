import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaInfoCircle,
  FaEnvelope,
  FaBell,
  FaProjectDiagram,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import Switch from "../Helpers/Switch";

const Profile = () => {
  const [activeButton, setActiveButton] = useState("Info");

  const notifications = [
    { id: 1, type: "message", description: "You have received a new message." },
    { id: 2, type: "promotion", description: "You are subscribed." },
    { id: 3, type: "update", description: "Monthly updates are now available" },
  ];

  const getIconByType = (type) => {
    switch (type) {
      case "message":
        return <FaEnvelope className="text-blue-500" />;
      case "newsletter":
        return <FaBell className="text-green-500" />;
      case "update":
        return <FaProjectDiagram className="text-purple-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div className="max-sm:flex-col max-sm:max-w-98">
      <div className="relative mt-8 ml-12 h-72 w-6xl overflow-hidden rounded-xl max-sm:max-w-full max-sm:ml-0 bg-[url('https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vNzcxMTNiOWYtZmVhYi00OTU4LWJlZjItYzQ1YjE3ZTcxYWRkLmpwZWc.webp')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75"></div>
      </div>

      <div className="relative flex left-25 w-5xl flex-col bg-clip-border rounded-2xl bg-white text-gray-700 shadow-md mx-3 -mt-16 mb-6 max-sm:mx-0 max-sm:left-5 max-sm:max-w-xs">
        <div className="flex items-center justify-between p-4 max-sm:flex-col">
          <div className="p-6 flex items-center gap-6">
            <img
              src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
              alt="Admin"
              className="h-20 w-20 object-cover rounded-xl border-2 border-white shadow-md transform hover:scale-155 transition-transform duration-200"
            />
            <div>
              <h4 className="text-lg font-semibold">Jane Doe</h4>
              <p className="text-sm text-gray-500">EchoBazar</p>
              <p className="text-sm text-gray-500">MD-CEO</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-gray-100 rounded-2xl max-sm:max-w-2xs max-sm:gap-1">
            {["Info", "Message", "Settings"].map((button) => (
              <button
                key={button}
                onClick={() => setActiveButton(button)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg max-sm:px-2 max-sm:py-1 ${
                  activeButton === button
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {button === "Info" && <FaInfoCircle />}
                {button === "Message" && <MdMessage />}
                {button === "Settings" && <IoMdSettings />}
                {button}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 grid grid-cols-3 gap-6 max-sm:flex max-sm:flex-col-reverse">
          {/* Platform Settings */}
          <div className="flex flex-col gap-4 w-64 max-sm:w-full">
            <h2 className="text-lg font-bold">Platform Settings</h2>
            <p className="uppercase text-gray-400 font-bold text-sm mb-3">
              Account
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-lg mb-2">
                <Switch />
                <span>Get Alert on New Message</span>
              </div>
              <div className="flex items-center gap-3 text-lg mb-2">
                <Switch />
                <span>Subscribe to Newsletter</span>
              </div>
              <div className="flex items-center gap-3 text-lg mb-2">
                <Switch />
                <span>Monthly Project Updates</span>
              </div>
            </div>
          </div>

          {/* Application Settings */}
          <div className="flex flex-col gap-4 w-64 max-sm:w-full">
            <h2 className="text-lg font-bold">Application</h2>
            <p className="uppercase text-gray-400 font-bold text-sm mb-3">
              Customize
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-lg mb-2">
                <Switch />
                <span>Get Alert on New Message</span>
              </div>
              <div className="flex items-center gap-3 text-lg mb-2">
                <Switch />
                <span>Subscribe to Newsletter</span>
              </div>
              <div className="flex items-center gap-3 text-lg mb-2">
                <Switch />
                <span>Monthly Project Updates</span>
              </div>
            </div>
          </div>

          {/* Dynamic Section */}
          <div className="flex flex-col gap-4 w-68 max-sm:w-full max-sm:h-auto bg-gray-100 p-2 h-max scroll-m-0 rounded-2xl overflow-y-auto">
            {activeButton === "Settings" ? (
              <div>
                <h2 className="text-lg font-bold">Default Settings</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-lg mb-2">
                    <Switch />
                    <span>Get Alert on New Message</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg mb-2">
                    <Switch />
                    <span>Subscribe to Newsletter</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg mb-2">
                    <Switch />
                    <span>Monthly Project Updates</span>
                  </div>
                </div>
              </div>
            ) : activeButton === "Message" ? (
              <>
                <h2 className="text-lg font-bold">Messages</h2>
                <div className="flex flex-col gap-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center gap-4 p-2 w-full rounded-lg shadow-md"
                    >
                      <div className="text-lg">
                        {getIconByType(notification.type)}
                      </div>
                      <p className="text-gray-600">
                        {notification.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold">Info</h2>
                <p className="uppercase text-gray-400 font-bold text-sm">
                  Profile
                </p>
                <div>
                  <p className="mb-2">
                    <strong>Name:</strong> Jane Doe
                  </p>
                  <p className="mb-2">
                    <strong>Email:</strong> janedoe@echobazar.com
                  </p>
                  <p className="mb-2">
                    <strong>Mobile:</strong> +044 234 6789
                  </p>
                  <p className="mb-2">
                    <strong>Location:</strong> 1234 Elm Street, Los Angeles, CA
                    90001, USA
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
