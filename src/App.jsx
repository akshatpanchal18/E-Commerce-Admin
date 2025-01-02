import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./Components/SideBar";
import AddProduct from "./Components/AddProduct";
import ViewAllProducts from "./Components/ViewAllProducts";
import OrderDetails from "./Components/OrderDetails";
import OrderHistory from "./Components/OrderHistory";
import SingleProduct from "./Components/SingleProduct";


function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <div className="app-container">
          <SideBar /> 
          <div className="main-content">
            <Routes>
              <Route path="/" element={<AddProduct />} />
               <Route path="/all-products" element={<ViewAllProducts />} /> 
               <Route path="/all-products/:id" element={<SingleProduct/>} /> 
              <Route path="/order-details" element={<OrderDetails />} /> 
              <Route path="/order-history" element={<OrderHistory />} /> 
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  .app-container {
    display: flex;
    width: 100%;
  }
  .main-content {
    flex: 1;
    background-color: #f4f4f4;
  }
`;

export default App;
