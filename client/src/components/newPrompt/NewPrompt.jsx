import React, { useEffect, useState } from "react";
import "./NewPrompt.css";
import Upload from "../../components/upload/Upload.jsx";
import { IKImage } from "imagekitio-react";
import { getClient } from "@botpress/webchat";
import Markdown from "react-markdown";

function NewPrompt({ endRef }) {
  // Xử lý nhập / gửi chat
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);
  // Biến tăng dòng cho textarea
  const [rows, setRows] = useState(1);

  const clientId = import.meta.env.VITE_CLIENT_ID;

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  useEffect(() => {
    if (endRef?.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, img.dbData]);

  useEffect(() => {
    const clientInstance = getClient({ clientId });

    clientInstance.on("message", (message) => {
      console.log("received message: ", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const connectClient = async () => {
      try {
        await clientInstance.connect();
        setIsConnected(true);
        setClient(clientInstance);
      } catch (error) {
        console.error("Error Connecting Botpress", error);
        setIsConnected(false);
      }
    };
    connectClient();
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const sendMessage = async (message) => {
    if (!inputMessage.trim()) return;

    if (!client || !isConnected) {
      console.error("Client is not connected. Cannot send message.");
      return;
    }

    try {
      if (typeof message === "string") {
        await client.sendMessage({ type: "text", text: inputMessage });
        setMessages((prevMessages) => [
          ...prevMessages,
          { payload: { block: { text: inputMessage } }, authorId: "user" },
        ]);
        setInputMessage("");
      } else if (typeof message === "object") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { payload: { block: { file: message.file } }, authorId: "user" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleChange = (event) => {
    setInputMessage(event.target.value);

    const lineBreaks = event.target.value.split("\n").length;
    setRows(Math.min(7, Math.max(1, lineBreaks))); // Giới hạn từ 1 đến 7 dòng
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    sendMessage(inputMessage);
    const textarea = e.target;

    if (textarea) {
      textarea.style.height = "auto";
    }
  };

  const handleKeyDown = (event) => {
    if (!isConnected) return; // Không cho nhập khi chưa kết nối

    const textarea = event.target;

    if (event.key === "Enter") {
      if (event.shiftKey) {
        event.preventDefault(); // Chặn hành vi mặc định để tránh xuống 2 dòng
        setInputMessage((prev) => prev + "\n"); // Xuống dòng đúng 1 lần
        textarea.style.height = textarea.scrollHeight + "px";
      } else {
        event.preventDefault(); // Chặn hành vi xuống dòng mặc định
        sendMessage(inputMessage);
        textarea.style.height = "auto"; // reset chiều cao
      }
    }
  };

  // reset khi input rỗng
  useEffect(() => {
    if (inputMessage.trim() === "") {
      setRows(1); // Reset về 1 dòng
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.style.height = "auto";
      }
    }
  }, [inputMessage]);

  return (
    <>
      {img.isLoading && <div className="">Đang tải...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: "380", height: "auto" }]}
        />
      )}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={msg?.authorId === "user" ? "message user" : "message"}
        >
          <Markdown>
            {msg.authorId === "user"
              ? msg.payload?.block?.text
              : msg.payload?.block?.text ||
                msg.payload?.blocks?.[0]?.block?.text ||
                "No message content"}
          </Markdown>
        </div>
      ))}
      <div className="endChat" ref={endRef}>
        <div
          className="newPrompt"
          style={{ marginTop: rows === 1 ? "40px" : `${rows * 30}px` }}
        >
          <form className="newForm" onSubmit={handleSubmit}>
            <div className="area">
              <textarea
                type="text"
                name="text"
                placeholder="Ask anything..."
                onKeyDown={handleKeyDown}
                disabled={!isConnected}
                onChange={handleChange}
                value={inputMessage}
                rows={rows}
              ></textarea>
            </div>
            <div className="button_container">
              <Upload
                setImg={setImg}
                isConnected={isConnected}
                client={client}
              />
              <input
                id="file"
                type="file"
                multiple={false}
                hidden
                disabled={!isConnected}
              ></input>
              <button
                type="submit"
                disabled={!isConnected}
                style={
                  isConnected ? {} : { background: "rgba(117, 117, 117, 0.4)" }
                }
              >
                <img src="/arrow.png" alt=""></img>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPrompt;
