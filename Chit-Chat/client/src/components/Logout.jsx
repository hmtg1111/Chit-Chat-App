import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}
const Button = styled.button`
display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #9a86f3;
  cursor: pointer;
  transition: 0.2s;
  svg {
    font-size: 1.3rem;
    color: #9a86f3;
  }
  &:hover {

    background-color: #9a86f3;
    svg {
      transition: 0.2s;
      color: #fff;
    }
  }
  
  `;
