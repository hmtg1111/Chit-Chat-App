import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, vhost } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  //  console.log(JSON.parse(localStorage.getItem("chat-app-user")))
  useEffect(() => {
    notLoggedIn();
  }, []);

  const notLoggedIn = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      try {
        setIsLoaded(true);
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        // console.log(JSON.parse(localStorage.getItem("chat-app-user")))
      } catch (err) {
        // console.log(err);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(vhost);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // const checkAvatar = async () => {

  // if (currentUser) {
  // if (currentUser.isAvatarImageSet) {
  //   const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //   setContacts(data.data);
  // } else {
  //   navigate("/setAvatar");
  // }
  //   }
  // };

  // useEffect(() => {
  //   checkAvatar();
  // }, [currentUser]);

  useEffect(() => {
    // console.log(currentUser);
    // if (current) {
    //   // console.log('yes its working')
    //   fetchContacts(current);
    //   // console.log(JSON.parse(localStorage.getItem("chat-app-user")))
    // } else {
    //   console.log("not current user");
    // }
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const current = JSON.parse(localStorage.getItem("chat-app-user"));
    if (current) {
      const data = await axios.get(`${allUsersRoute}/${current._id}`);
      // console.log(data);
      setContacts(data.data);
    } else {
      console.log("not current user");
    }
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 90vh;
    width: 90vw;
    background-color: #00000076;
    border: 3px solid #1b1b29;
    box-shadow: 0px 0px 22px 22px #0e0e1a;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 45% 55%;
    }
  }
`;

export default Chat;
