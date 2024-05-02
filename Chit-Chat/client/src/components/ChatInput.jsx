import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  //   const handlePicker = () => {
  //     setShowEmojiPicker(!showEmojiPicker);
  //   };

  const handleEmojiClick = (emojiObject) => {
    // console.log(emojiObject);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmile
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
            }}
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #0a0a13;
  padding: 0 1.9rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: absolute;
      top: 4.5 rem;
      svg {
        font-size: 1.7rem;
        color: #635f7a;
        cursor: pointer;
        margin-bottom: 5px;
        transition: 0.3s;
        &:hover {
          transition: 0.2s;
          color: #9a86f3;
          scale: 1.2;
        }
      }
      .Picker {
        position: absolute;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 4px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 5rem;
    display: flex;
    align-items: center;
    gap: 3rem;
    background-color: #2a2a33;
    margin-bottom: 5px;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #8f8ca1;
        opacity: 1;
      }
    }
    button {
      padding: 2px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #3a374d;
      border: 2px solid #9a86f3;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        background-color: #9a86f3;
        svg {
          transition: 0.2s;
          color: #fff;
        }
        
      }
      &:active {
        scale: 0.9;
        svg {
          scale: 1;
        }
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.6rem 0.6rem;
        svg {
          font-size: 0.8rem;
        }
      }
      @media screen and (min-width: 360px) and (max-width: 480px) {
        padding: 0.6rem 0.6rem;
        svg {
          font-size: 0.5rem;
        }
      }
      svg {
        font-size: 1.8rem;
        color: #9a86f3;
      }
    }
  }
`;
