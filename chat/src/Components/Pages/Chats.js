import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "./styles.scss";

const Chats = () => {
  const navigate = useNavigate();
  const [chats, setfirst] = useState([
    "Sam",
    "Cam",
    "Raven",
    "Jeena",
    "Waran",
    "Rock",
    "Screw",
    "Balack",
    "Umar",
    "Bilal",
  ]);
  const [contacts, setContacts] = useState([]);
  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        setContacts(data);
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
                {chats.map((chat, index) => (
                  <div className="chat" key={index}>
                    <img src={avatar} alt="avatar" />
                    <h3>{chat}</h3>
                    <p>7:34 PM</p>
                  </div>
                ))}
              </div>
              <div className="admin-panel">
                <img src={avatar} alt="avatar" />
                <h2>ADMIN</h2>
              </div>
            </div>
            <div className="chat-box">
              <div className="chat-head">
                <div className="user-details">
                  <img src={avatar} alt="avatar" />
                  <h2>UserName</h2>
                </div>
                <button>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
              <div className="controls">
                <button>
                  <i className="fa-solid fa-icons"></i>
                </button>
                <input type="text" placeholder="Message" />
                <button>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Chats;
