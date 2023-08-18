import React, { useContext, useEffect, useState } from "react";
import avatar from "../assets/no-user-no-back.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ChatBox from "./ChatBox";
import { globalcontext } from "../../App";
import "./styles.scss";
import io from "socket.io-client";

const Chats = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setisLoggedIn } = useContext(globalcontext);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [currentuser, setcurrentUser] = useState([]);
  const [messagesArray, setmessagesArray] = useState([]);
  const [isUserOnline, setisUserOnline] = useState(false);
  const [msg, setmsg] = useState("");
  const socket = io(process.env.REACT_APP_SERVER_URL);
  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const { userContacts, currentUser } = await response.json();
      if (!response.ok) {
        navigate("/login");
        setisLoggedIn(false);
      } else if (currentUser[0].avatarImage == "") {
        navigate("/avatar");
        setisLoggedIn(false);
      } else {
        setisLoggedIn(true);
        setcurrentUser(currentUser);
        setContacts(userContacts);
        console.log(userContacts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMessages = async (currentuser, currentChat) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/messages/getmsgs`,
        {
          method: "POST",
          credentials: "include",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: currentuser[0]?._id,
            to: currentChat?._id,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setmessagesArray(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // getting message from chat box -->

  const handleSendMessageToChats = (dataFromChatBox) => {
    console.log(dataFromChatBox);
    setmsg(dataFromChatBox);
  };

  // useEffect for socket.io connection -->
  useEffect(() => {
    if (currentuser[0]) {
      socket.emit("setup", currentuser[0]?._id);
    }
    socket.on("connection", () => {
      setisUserOnline(true);
    });
  }, [currentuser]);

  //useEffect for fetching chats -->
  useEffect(() => {
    if (currentChat) {
      fetchMessages(currentuser, currentChat);
      socket.emit("join chat", currentChat?._id);
    }
  }, [currentChat]);

  //general useEffect -->
  useEffect(() => {
    setTimeout(() => {
      fetchContacts();
    }, 2000);
  }, []);

  return (
    <>
      <div className="chat-page">
        {contacts.length > 0 ? (
          <div className="chat-container">
            <div className="chats-panel">
              <h1>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  DuckChats
                </Link>
              </h1>
              <div className="chats">
                {contacts.map((chat, index) => (
                  <div
                    className="chat"
                    key={index}
                    onClick={() => {
                      setcurrentChat(chat);
                    }}
                  >
                    <img
                      src={
                        chat.avatarImage
                          ? `data:image/svg+xml;base64,${chat.avatarImage}`
                          : avatar
                      }
                      alt="avatar"
                    />
                    <h3>{chat.username}</h3>
                    <p>7:34 PM</p>
                  </div>
                ))}
              </div>
              <div className="admin-panel">
                <img
                  src={
                    currentuser[0].avatarImage
                      ? `data:image/svg+xml;base64,${currentuser[0].avatarImage}`
                      : avatar
                  }
                  alt="avatar"
                />
                <h2>{currentuser[0].username}</h2>
              </div>
            </div>
            <ChatBox
              currentChat={currentChat}
              currentuser={currentuser}
              messagesArray={messagesArray}
              isUserOnline={isUserOnline}
              handleSendMessageToChats={handleSendMessageToChats}
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Chats;
