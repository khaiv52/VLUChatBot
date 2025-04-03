import { ArrowDownwardRounded } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import "./chatPage.css";

function ChatPage() {
  // Xư lý sự kiện cuộn (hiển thị nút)
  const chatRef = useRef(null);
  const endRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const chatDiv = chatRef.current;

    const handleScroll = () => {
      if (!chatDiv) return;
      const { scrollTop, scrollHeight, clientHeight } = chatDiv;

      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 50);
    };

    chatDiv?.addEventListener("scroll", handleScroll);
    return () => chatDiv?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="chatPage">
      <div className="wrapper" ref={chatRef}>
        <div className="chat">
          <div className="message user">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem perspiciatis ea! Dolorem consequatur blanditiis, natus aliquam aliquid explicabo earum quasi assumenda ea sunt harum saepe iure vero omnis sed!</div>
          <div className="message ">message from bot</div>
          <div className="message user">message from user</div>
          <div className="message ">message from bot</div>
          <div className="message user">message from user</div>
          <div className="message ">message from bot</div>
          <div className="message user">message from user</div>
          <div className="message "></div>
          <NewPrompt endRef={endRef} />
        </div>

        {showScrollButton && (
          <button className={`scrollButton`} onClick={scrollToBottom}>
            <ArrowDownwardRounded fontSize="medium" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
