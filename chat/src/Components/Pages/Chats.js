import React, { useContext, useEffect, useState } from "react";
import avatar from "../assets/no-user-no-back.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ChatBox from "./ChatBox";
import { globalcontext } from "../../App";
import "./styles.scss";

const Chats = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setisLoggedIn } = useContext(globalcontext);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [currentuser, setcurrentUser] = useState([]);
  const [messagesArray, setmessagesArray] = useState([]);
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMessages = async () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
    // currentChat;
    // currentuser;
  };

  //useEffect for fetching chats -->
  useEffect(() => {
    fetchMessages();
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
                      fetchMessages();
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
            <ChatBox currentChat={currentChat} currentuser={currentuser} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Chats;
