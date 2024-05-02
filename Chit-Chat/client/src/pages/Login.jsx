import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/chatify-logo.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  }, [])
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      // console.log("in validaition", loginRoute);
      const {username , password} = values;
      const { data } = await axios.post(loginRoute, {
        username, 
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password==="") {
      toast.error("Password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username is required", toastOptions);
      return false;
    } 
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chatify</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    border: 3px solid #1b1b29;
    box-shadow: 0px 0px 20px 10px #0e0e1a;
    input:-webkit-autofill,
    input:-webkit-autofill:focus {
      transition: background-color 0s 600000s, color 0s 600000s;
    }
    input {
      background-color: transparent;
      padding: 1rem;
      border: 2px solid #2f2561;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      outline: none;
      &: focus {
        border: 2px solid #1b1b29;
        outline: none;
        background-color: transparent;
      }
    }
    button {
      
      color: #9a86f3;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      letter-spacing: 1px;
      border-radius: 0.4rem;
      font-size: 0.8rem;
      text-transform: uppercase;
      background-color: #0a0a13;
      border: 2px solid #9a86f3;
      transition: 0.2s ;
      &:hover {
        background-color: #9a86f3;
        color: #fff
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      font-size: 0.8rem;
      a {
        color: #9681f7;
        text-decoration: none;
      }
    }
  }
`;

export default Login;
