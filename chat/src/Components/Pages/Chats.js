import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "./styles.scss";
import ChatBox from "./ChatBox";

const Chats = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentuser, setcurrentUser] = useState([]);
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
      } else if (currentUser[0].avatarImage == "") {
        navigate("/avatar");
      } else {
        setcurrentUser(currentUser);
        setContacts(userContacts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
              <h1>Duckchats</h1>
              <div className="chats">
                {contacts.map((chat, index) => (
                  <div className="chat" key={index}>
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
            <ChatBox />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Chats;
