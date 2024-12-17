import { useEffect, useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId] = useState("user123"); // Simulated user ID

  useEffect(() => {
    // Connect to the chat-events SSE endpoint to listen for new messages
    const eventSource = new EventSource("http://localhost:5000/chat-events");

    eventSource.onmessage = (event) => {
      const updatedMessages = JSON.parse(event.data);
      setMessages(updatedMessages);
    };

    eventSource.onerror = (error) => {
      console.error("Error in SSE:", error);
    };

    // Cleanup when component unmounts
    return () => {
      eventSource.close();
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage) return;

    await fetch("http://localhost:5000/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, message: newMessage }),
    });

    setNewMessage(""); // Clear the message input after sending
  };

  return (
    <div>
      <h1>Live Chat</h1>
      <div>
        {messages.map(
          (msg: { id: string; userId: string; message: string }) => (
            <div key={msg.id}>
              <strong>{msg.userId}:</strong> {msg.message}
            </div>
          )
        )}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
