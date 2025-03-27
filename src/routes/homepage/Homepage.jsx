import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";

function HomePage() {
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital"></img>
      <div className="left">
        <h1>VLU CHATBOT!</h1>
        <h2>
          Trợ lý AI tư vấn tuyển sinh - Thông minh, Chính xác, Cá nhân hóa
        </h2>
        <h3>
          Chatbot AI tư vấn tuyển sinh thông minh, cá nhân hóa, giúp thí sinh
          tìm kiếm thông tin ngành học, trường đại học nhanh chóng và chính xác.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/robot.png" className="bot"></img>
          <div className="chat">
            <img src="/robot.png" alt=""></img>
            <TypeAnimation
              sequence={[
                "Bạn cần tư vấn ngành học?",
                1000,
                "Bạn muốn tìm hiểu về học phí và học bổng?",
                1000,
                "Bạn cần thông tin về chương trình đào tạo?",
                1000,
                "Bạn quan tâm đến ký túc xá và đời sống sinh viên?",
                1000,
                "Bạn muốn biết thêm thông tin về giảng viên của khoa?",
                1000,
                "Bạn cần tìm hiểu cơ hội việc làm sau khi tốt nghiệp?",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
              style={{ fontSize: "1.3rem", color: "white" }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <p>@ 2025 | VLU ChatBot Team</p>
      </div>
    </div>
  );
}

export default HomePage;
