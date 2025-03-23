import React, { useEffect, useState } from "react";
import { useOrderAdmin } from "../Context/OrderContext";
import { FormatDate, Amount } from "../Helpers/helper";
import { useAuth } from "../Context/AuthContext";
import { FaTriangleExclamation } from "react-icons/fa6";

function OrderHistory() {
  const { getOrders } = useOrderAdmin();
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      if (res.success) {
        setDeliveredOrders(res.delivered);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold">Loading orders...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white ">
      <>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Delivered Orders ({deliveredOrders.length})
        </h2>

        {deliveredOrders.length === 0 ? (
          <p className="text-center text-gray-600">
            No delivered orders found.
          </p>
        ) : (
          <div className="space-y-6">
            {deliveredOrders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-300 rounded-lg p-6 shadow-md bg-gray-50"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Order Details */}
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Order Details
                    </h3>
                    <p>
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="text-green-600 font-bold">
                        {order.orderStatus}
                      </span>
                    </p>
                    <p>
                      <strong>Delivered On:</strong>{" "}
                      <FormatDate dateString={order.updatedAt} />
                    </p>
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="font-semibold text-gray-700">Items</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productId.name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2">
                      <strong>Total:</strong>{" "}
                      <Amount amount={order.totalAmount} />
                    </p>
                  </div>

                  {/* Address & Payment */}
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Shipping Address
                    </h3>
                    <p>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.zip_code}
                    </p>
                    <p className="mt-2">
                      <strong>Payment Type:</strong> {order.paymentType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
}

export default OrderHistory;
