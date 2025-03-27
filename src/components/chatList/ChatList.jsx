import React from "react";
import { Link } from "react-router-dom";
import "./chatList.css";

function ChatList() {

  return (
    <div className="ChatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore VLU Bot chat</Link>
      <hr />
      <span className="title">RECENT CHATS</span>{" "}
      <div className="list">
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>

      </div>
      <hr />
    </div>
  );
}

export default ChatList;
