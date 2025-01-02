import React, { useEffect, useState } from "react";
import { useAuth } from "../Contaxt/AuthContaxt";
import { FaTriangleExclamation } from "react-icons/fa6";
import { io } from "socket.io-client";
// import OrderList from "./OrderList";
import styled from "styled-components";
import { useOrderAdmin } from "../Contaxt/OrderContext";
import Popup from "./Popup";
import Amount from "../Helper/Amount";

function OrderDetails() {
  const { isAuthenticated, URL } = useAuth();
  const { getOrders, updateStatus } = useOrderAdmin();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState(orders.map((ord) => ord.orderStatus));

  useEffect(() => {
    const authToken = localStorage.getItem("isAuth") === "true";
    setIsLoggedIn(isAuthenticated || authToken);
  }, [isAuthenticated]);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["polling"],
    });

    // Listen for new orders
    socket.on("newOrder", (newOrder) => {
      setOrders((prevOrders) => {
        const updatedOrders = [...prevOrders, newOrder];
        return updatedOrders;
      });
    });
    getOrders().then((res) => {
      if (res.success) {
        setOrders(res.orders);
      }
    });
    return () => {
      socket.off("newOrder");
      socket.disconnect();
    };
  }, []);
  // Clear orders manually
  const handleClearOrders = () => {
    setOrders([]);
    localStorage.removeItem("orders");
  };
  const handleStatusChange = async (index, orderId, event) => {
    const newStatus = [...status];
    newStatus[index] = event.target.value;
    setStatus(newStatus);
    // Create the payload
    const payload = {
      order_id: orderId,
      status: event.target.value,
    };
    // console.log("Payload:", payload);
    updateStatus(payload).then((res) => {
      if (res.success) {
        getOrders()
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    });
  };

  return (
    <>
      <Wrapper>
        {isLoggedIn ? (
          <>
            {orders.length === 0 ? (
              <div className="div">
                <h1>No Orders !!!!</h1>
              </div>
            ) : (
              <>
                <button onClick={handleClearOrders}>Clear Orders</button>
                <OrderList>
                  {
                    showPopup ? <Popup message={'status updated'}/>:(<></>)
                  }
                  <h1>Pending Order's({orders.length})</h1>
                  {orders.map((order, index) => {
                    return (
                      <div className="list" key={order._id}>
                        <div className="container">
                          <div className="one">
                            <h1>Order Details</h1>
                            <p>
                              <strong>Order ID:</strong> {order._id}
                            </p>
                          </div>
                          <div className="two">
                            <p>
                              <strong>Items:</strong>
                            </p>
                            <ul>
                              {order.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  {item.productId.name} (Quantity:{" "}
                                  {item.quantity})
                                </li>
                              ))}
                            </ul>
                            <p>
                              <strong>Total:</strong> <Amount amount={order.totalAmount}/>
                            </p>
                          </div>
                          <div className="three">
                            <p>
                              <strong>Address:</strong>
                              {order.shippingAddress.address}
                            </p>
                            <p>
                              <strong>City:</strong>
                              {order.shippingAddress.city}
                            </p>
                            <p>
                              <strong>zip code:</strong>
                              {order.shippingAddress.zip_code}
                            </p>
                            <p>
                              <strong>Payment-Type:</strong>
                              {order.paymentType}
                            </p>
                          </div>
                        </div>
                        <div className="status">
                          <label htmlFor={`status-${index}`}>
                            <strong>Status:</strong>
                          </label>
                          <select
                            name={`status-${index}`}
                            id={`status-${index}`}
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
                    );
                  })}
                </OrderList>
              </>
            )}
          </>
        ) : (
          <h1
            style={{ textAlign: "center", fontSize: "3rem", color: "#992234" }}
          >
            <FaTriangleExclamation /> Access Denied !!!!
          </h1>
        )}
      </Wrapper>
    </>
  );
}
const OrderList = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  padding: 1rem 2rem;
  .list {
    max-width: 80%;
    margin: 1rem auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    // max-height:100vh;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    word-wrap: break-word;
  }

  .items {
    flex: 1;
    min-width: 0;
    word-wrap: break-word;
  }

  .status {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  label {
    font-weight: bold;
  }

  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .list {
      padding: 0.5rem;
    }

    .container {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    h1 {
      font-size: 1.2rem;
    }

    .status {
      width: 100%;
    }

    select {
      font-size: 0.9rem;
    }
  }
`;
const Wrapper = styled.div`
  .div h1 {
    text-align: center;
    font-size: 3rem;
    color: #992234;
  }
  button {
    margin: 1rem auto;
    display: block;
    padding: 10px 20px;
    font-size: 1rem;
    background: #992234;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;
export default OrderDetails;
