import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const PopupContainer = styled.div`
  position: fixed;
  top: 3%;
  right: 34%;
  background-color:#2c3e50; 
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;

  &.fade-out {
    opacity: 0;
  }
`;
const Button = styled.button`
  margin-left: 10px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size:1rem;
  // display:flex;
  flex:column;
  align-items:center;
`;

const Popup = ({ message}) => {
  return (
    <PopupContainer>
      {message}
      {/* <Button onClick={onClose}>
        <IoClose />
      </Button> */}
    </PopupContainer>
  );
};

export default Popup;
