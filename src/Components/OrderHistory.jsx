import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useOrderAdmin } from "../Contaxt/OrderContext";
import Amount from "../Helper/Amount";
import FormatDate from "../Helper/Moment";
import { useAuth } from "../Contaxt/AuthContaxt";
import { FaTriangleExclamation } from "react-icons/fa6";

function OrderHistory() {
  const { isAuthenticated } = useAuth();
  const { getOrders } = useOrderAdmin();
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authToken = localStorage.getItem("isAuth") === "true";
    setIsLoggedIn(isAuthenticated || authToken);
  }, [isAuthenticated]);

  useEffect(() => {
    getOrders().then((res) => {
      setLoading(true);
      if (res.success) {
        setLoading(false);
        setDeliveredOrders(res.delivered);
      }
    });
  }, []);
  console.log(deliveredOrders);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Wrapper>
      {isLoggedIn ? (
        <div className="order-history">
          <h2>Delivered Orders({deliveredOrders.length})</h2>
          {deliveredOrders.length === 0 ? (
            <p>No delivered orders found.</p>
          ) : (
            <div>
              {deliveredOrders.map((order) => (
                <div className="list" key={order._id}>
                  <div className="container">
                    <div className="one">
                      <h1>Order Details</h1>
                      <p>
                        <strong>Order ID:</strong> {order._id}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          {order.orderStatus}
                        </span>
                      </p>
                      <p>
                        <strong>Deliverd On:</strong>
                        <FormatDate dateString={order.updatedAt} />
                      </p>
                    </div>
                    <div className="two">
                      <p>
                        <strong>Items:</strong>
                      </p>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.productId.name} (Quantity: {item.quantity})
                          </li>
                        ))}
                      </ul>
                      <p>
                        <strong>Total:</strong>{" "}
                        <Amount amount={order.totalAmount} />
                      </p>
                    </div>
                    <div className="three">
                      <p>
                        <strong>Address:</strong>{" "}
                        {order.shippingAddress.address}
                      </p>
                      <p>
                        <strong>City:</strong>
                        {order.shippingAddress.city}
                      </p>
                      <p>
                        <strong>Zip Code:</strong>{" "}
                        {order.shippingAddress.zip_code}
                      </p>
                      <p>
                        <strong>Payment Type:</strong> {order.paymentType}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "3rem", color: "#992234" }}>
          <FaTriangleExclamation /> Access Denied !!!!
        </h1>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100vh;
  margin: 0 auto;
  overflow: auto;
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #3b4f46;
    /* border-radius: 10px;  */
  }
  &::-webkit-scrollbar-track {
    background: rgb(221, 234, 228);
  }
  .order-history {
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .list {
    border: 1px solid #ddd;
    padding: 1rem 2rem;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 70%;
    margin: 1rem auto;
  }

  .container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 15px;
  }

  .one,
  .two,
  .three {
    margin-bottom: 10px;
  }

  .one h1 {
    font-size: 1.5em;
    margin-bottom: 5px;
  }

  .two ul {
    list-style-type: disc;
    margin-left: 20px;
  }

  .three {
    color: black;
  }

  p {
    margin: 5px 0;
  }

  p strong {
    font-weight: bold;
  }
`;
export default OrderHistory;
