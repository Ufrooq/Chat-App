import React from "react";
import avatar from "../assets/avatar.png";
import roboGif from "../assets/robot.gif";
import "./styles.scss";
const ChatBox = () => {
  return (
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
      <div className="conversation-box">
        <div className="welcome">
          <img src={roboGif} alt="" />
          <h1>Welcome Admin !</h1>
          <p>Select any contact to start chatting !</p>
        </div>
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
  );
};

export default ChatBox;
