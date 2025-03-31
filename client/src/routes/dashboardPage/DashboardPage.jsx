import React from "react";
import "./dashboardPage.css";

function DashboardPage() {
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logoVLU.png" alt=""></img>
          <h1>VLU CHAT BOT</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt=""></img>
            <span>Create A New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt=""></img>
            <span>Analyze Images</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form>
          <input type="text" placeholder="Ask anything..."></input>
          <button>
            <img src="/arrow.png" alt=""></img>
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashboardPage;
