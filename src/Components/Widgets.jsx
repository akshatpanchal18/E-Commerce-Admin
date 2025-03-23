import React from "react";
import {
  FaChartLine,
  FaMoneyBillTransfer,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa6";

function Widgets() {
  const states = [
    {
      title: "Today's Orders",
      value: "$53k",
      change: "+55%",
      word: "than last month",
      type: "money",
    },
    {
      title: "Today's Users",
      value: "2,300",
      change: "+3%",
      word: "than yesterday",
      type: "users",
    },
    {
      title: "New users",
      value: "3,462",
      change: "-2% ",
      word: "than yesterday",
      type: "clients",
    },
    {
      title: "Sales",
      value: "$103,430",
      change: "+5%",
      word: "than yesterday",
      type: "sales",
    },
  ];
  const getIconByType = (type) => {
    switch (type) {
      case "money":
        return <FaMoneyBillTransfer className="text-blue-500" />;
      case "users":
        return <FaUsers className="text-cyan-500" />;
      case "clients":
        return <FaUserPlus className="text-purple-500" />;
      default:
        return <FaChartLine className="text-red-500" />; // Default icon
    }
  };
  return (
    <section className="grid grid-cols-1 max-sm:grid-cols-2 max-sm:p-4 lg:grid-cols-4 gap-4 max-sm:gap-4 mb-6 max-sm:max-w-full">
      {states.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2 transform hover:scale-105 transition-transform duration-200"
        >
          <h2 className="text-gray-500 text-xs sm:text-sm">{stat.title}</h2>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-4">
            {getIconByType(stat.type)}
            {stat.value}
          </p>
          <p className="text-xs sm:text-sm text-gray-700 flex items-center gap-2">
            <strong
              className={`text-xl font-medium ${
                stat.change.includes("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change}
            </strong>
            {stat.word}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Widgets;
