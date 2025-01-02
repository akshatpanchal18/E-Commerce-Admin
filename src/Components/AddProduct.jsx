import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useAuth } from "../Contaxt/AuthContaxt";
import Login from "./Login";
import AddProductDetails from "./AddProductDetails";
import { IoLogOutOutline } from "react-icons/io5";

const AddProduct = () => {
    const { isAuthenticated ,logout} = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const authToken = localStorage.getItem("isAuth") === 'true'; // Check for string equality
      setIsLoggedIn(isAuthenticated || authToken); // Set based on either context or local storage
  
      // Optionally, you can add an effect to synchronize state changes
    }, [isAuthenticated]);
    const handlelogout = () => {
      logout();
      setIsLoggedIn(false)
    };
  return (<>{isLoggedIn ? <><Button className="logout" onClick={handlelogout} >
          Logout <IoLogOutOutline />
        </Button><AddProductDetails /></> : <Login />}</>);
};
const Button = styled.button`
    position: absolute;
    top: 3%;
    right: 3%;
    border: none;
    outine: none;
    // background: #033669;
    background: rgb(31, 53, 45);
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`
export default AddProduct;
