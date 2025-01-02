import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../Contaxt/AuthContaxt";
import { IoLogOutOutline } from "react-icons/io5";

function SideBar() {
  const { isAuthenticated } = useAuth();
      const [isLoggedIn, setIsLoggedIn] = useState(false);
    
      useEffect(() => {
        const authToken = localStorage.getItem("isAuth") === 'true'; // Check for string equality
        setIsLoggedIn(isAuthenticated || authToken); // Set based on either context or local storage
    
        // Optionally, you can add an effect to synchronize state changes
      }, [isAuthenticated]);
      
  return (
    <Wrapper>
      <div className="sidebar">
      <h4>{
        isLoggedIn ? <>Hello, Admin</>:<>Please Log in</>
        }</h4>
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeclassname="active">
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-products" activeclassname="active">
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/order-details" activeclassname="active">
                Order Details
              </NavLink>
            </li>
            <li>
              <NavLink to="/order-history" activeclassname="active">
                Order History
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.nav`

  .sidebar {
    width: 250px;
    // background-color: #2c3e50;
    background-color: #254336;
    color: white;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
  }

  .sidebar h1 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 20px;
    text-align: center;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    // background: #425d78;
    background: #2c4e41;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .sidebar ul li a {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px;
    border-radius: 5px;
  }

  .sidebar ul li a:hover,
  .sidebar ul li a.active {
    // background-color: #34495e;
    background-color:rgb(31, 53, 45);
  }
`;

export default SideBar;
