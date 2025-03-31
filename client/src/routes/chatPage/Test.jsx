import { useState } from "react";
import axios from "axios";

const clientId = "ad60685b-8325-40f4-9427-fc40b5c54068";
const botpressAPI = "https://YOUR_BOTPRESS_INSTANCE/api/v1/chat";

export function Test() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        botpressAPI,
        { text: message },
        {
          headers: {
            Authorization: `Bearer ${clientId}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập tin nhắn..."
      />
      <button onClick={sendMessage}>Gửi</button>
      <p>Bot response: {response}</p>
    </div>
  );
}
