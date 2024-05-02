import React, { useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Welcome() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    notLoggedIn();
  }, []);

  const notLoggedIn = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      try {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome ,{" "}
        {currentUser === undefined ? (
          <></>
        ) : (
          <span>{currentUser.username}</span>
        )}{" "}
      </h1>
      <h3>Please selecct a chat to start messaging </h3>
    </Container>
  );
}

const Container = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 10px;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #ba00ff;
  }
`;
