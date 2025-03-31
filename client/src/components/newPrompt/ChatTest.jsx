import { getClient } from "@botpress/webchat";
import { useEffect, useState } from "react";

const ChatTest = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const clientInstance = getClient({ clientId });

    clientInstance.on("message", (message) => {
      console.log("Received Message: ", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const connectClient = async () => {
      try {
        await clientInstance.connect();
        setIsConnected(true);
        setClient(clientInstance);

        await clientInstance.sendMessage({ type: "text", text: "Hi Botpress" });
      } catch (error) {
        console.error("Error connecting Botpress", error);
        setIsConnected(false);
      }
    };

    connectClient();

    console.log(messages);

    return () => {
      clientInstance.disconnect();
      setIsConnected(false);
    };
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    if (!client || !isConnected) {
      console.error("Client is not connected. Cannot send message.");
      return;
    }

    try {
      await client.sendMessage({ type: "text", text: inputMessage });
      setMessages((prevMessages) => [
        ...prevMessages,
        { payload: { block: { text: inputMessage } }, authorId: "user" },
      ]);

      setInputMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      if (event.shiftKey) {
        setInputMessage((prev) => prev + "\n");
      } else {
        event.preventDefault();
        sendMessage();
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <div>
        <div style={{ maxWidth: "800px", textAlign: "center" }}>
          <h2>Botpress Chat</h2>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              height: "500px",
              width: "700px",
              overflowY: "auto",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg?.authorId === "user" ? "right" : "left",
                  marginBottom: "16px",
                }}
              >
                <p
                  style={{
                    display: "inline-block",
                    padding: "8px",
                    borderRadius: "5px",
                    background:
                      msg?.authorId === "user" ? "#007bff" : "#f1f1f1",
                    color: msg.authorId === "user" ? "#fff" : "#000",
                    maxWidth: "80%",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.payload?.block?.text || "No message content"}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            width: "100%",
          }}
        >
          <textarea
            onChange={(e) => setInputMessage(e.target.value)}
            rows={3}
            placeholder="Nhập tin nhắn..."
            onKeyDown={handleKeyDown}
            value={inputMessage}
            style={{
              padding: "8px",
              resize: "none",
              fontSize: "16px",
              flex: 1,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.1)",
            }}
          ></textarea>
          <button
            onClick={sendMessage}
            disabled={!isConnected}
            style={{
              padding: "10px 20px",
              border: "1px solid black",
              background: isConnected ? "#007bff" : "#ccc",
              color: "white",
              borderRadius: "12px",
              height: "70px",
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              maxWidth: "80%",
            }}
          >
            Gửi tin nhắn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTest;
