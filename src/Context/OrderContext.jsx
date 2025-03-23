import { useContext, useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { URL } = useAuth();
  const getOrders = async () => {
    try {
      const res = await fetch(`${URL}/order/admin-order`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (result.statusCode === 200) {
        const delivered = result.data.filter(
          (order) => order.orderStatus === "Delivered"
        );
        const orders = result.data.filter(
          (order) => order.orderStatus !== "Delivered"
        );
        return { success: true, orders, delivered };
      }
    } catch (error) {
      return { success: false, data: error };
    }
  };
  const updateStatus = async (payload) => {
    console.log(payload);

    const res = await fetch(`${URL}/order/update-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Ensure this header is set
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const result = await res.json();
    if (result.statusCode === 200) {
      return { success: true };
    }
  };

  return (
    <OrderContext.Provider value={{ getOrders, updateStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderAdmin = () => useContext(OrderContext);
