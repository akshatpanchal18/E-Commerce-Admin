import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { FaTriangleExclamation } from "react-icons/fa6";
import { io } from "socket.io-client";
import { useOrderAdmin } from "../Context/OrderContext";
import Popup from "../Helpers/Popup";
import { Amount } from "../Helpers/helper";

function OrderDetails() {
  const { getOrders, updateStatus } = useOrderAdmin();
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const socket = io("https://e-commerce-server-b1yi.onrender.com", {
      transports: ["polling"],
    });

    socket.on("newOrder", (newOrder) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    });

    getOrders().then((res) => {
      if (res.success) {
        setOrders(res.orders);
        setStatus(res.orders.map((order) => order.orderStatus));
      }
    });

    return () => {
      socket.off("newOrder");
      socket.disconnect();
    };
  }, []);

  const handleClearOrders = () => {
    setOrders([]);
    localStorage.removeItem("orders");
  };

  const handleStatusChange = async (index, orderId, event) => {
    const newStatus = [...status];
    newStatus[index] = event.target.value;
    setStatus(newStatus);

    const payload = { order_id: orderId, status: event.target.value };

    updateStatus(payload).then((res) => {
      if (res.success) {
        getOrders();
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg">
      <>
        {orders.length === 0 ? (
          <div className="text-center text-2xl font-semibold text-red-600">
            No Orders !!!!
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Pending Orders ({orders.length})
              </h1>
              <button
                onClick={handleClearOrders}
                className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition"
              >
                Clear Orders
              </button>
            </div>

            {showPopup && <Popup message={"Status Updated"} />}

            <div className="space-y-6">
              {orders.map((order, index) => (
                <div
                  key={order._id}
                  className="border border-gray-300 rounded-lg p-6 shadow-md bg-gray-50"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap justify-between items-center border-b pb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Order ID:{" "}
                      <span className="text-blue-600">{order._id}</span>
                    </h2>
                    <p className="text-gray-700">
                      <strong>Total:</strong>{" "}
                      <span className="text-green-600">
                        <Amount amount={order.totalAmount} />
                      </span>
                    </p>
                  </div>

                  {/* Order Details */}
                  <div className="grid md:grid-cols-3 gap-6 mt-4">
                    {/* Items */}
                    <div>
                      <h3 className="font-semibold text-gray-700">Items:</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {order.items.map((item, i) => (
                          <li key={i}>
                            {item.productId.name} (x{item.quantity})
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Shipping Address:
                      </h3>
                      <p className="text-gray-600">
                        {order.shippingAddress.address}
                      </p>
                      <p className="text-gray-600">
                        {order.shippingAddress.city}
                      </p>
                      <p className="text-gray-600">
                        ZIP: {order.shippingAddress.zip_code}
                      </p>
                    </div>

                    {/* Payment & Status */}
                    <div>
                      <p className="text-gray-700">
                        <strong>Payment Type:</strong> {order.paymentType}
                      </p>

                      {/* Status Dropdown */}
                      <div className="mt-3">
                        <label className="font-semibold text-gray-700">
                          Status:
                        </label>
                        <select
                          className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                          value={status[index]}
                          onChange={(event) =>
                            handleStatusChange(index, order._id, event)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Shipped">Shipped</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default OrderDetails;
