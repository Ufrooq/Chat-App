import React, { useState } from "react";
import avatar from "../assets/avatar.png";

const Chats = () => {
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
  return (
    <>
      <div className="chat-page">
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
                <i class="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
            <div className="controls">
              <button>:)</button>
              <input type="text" placeholder="Message" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
