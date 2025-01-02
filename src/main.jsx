import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Contaxt/AuthContaxt.jsx";
import { ProductProvider } from "./Contaxt/ProductContext.jsx";
import { OrderProvider } from "./Contaxt/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);
