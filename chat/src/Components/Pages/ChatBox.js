import React from "react";
import avatar from "../assets/no-user-no-back.png";
import roboGif from "../assets/robot.gif";
import "./styles.scss";
const ChatBox = (props) => {
  const { currentChat } = props;
  return (
    <div className="chat-box">
      <div className="chat-head">
        <div className="user-details">
          <img
            src={
              currentChat?.avatarImage
                ? `data:image/svg+xml;base64,${currentChat.avatarImage}`
                : avatar
            }
            alt="avatar"
          />
          <h2>{currentChat?.username ? currentChat.username : "No User"}</h2>
        </div>
        <button>
          <i className="fa-solid fa-right-to-bracket fa-rotate-180"></i>
        </button>
      </div>
      <div className="conversation-box">
        {!currentChat && (
          <div className="welcome">
            <img src={roboGif} alt="" />
            <h1>
              Welcome <span>Admin !</span>
            </h1>
            <p>Select any contact to start chatting !</p>
          </div>
        )}
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
