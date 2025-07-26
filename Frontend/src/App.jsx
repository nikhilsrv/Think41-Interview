import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (userMessage) => {
    const userEntry = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userEntry]);

    // Simulate LLM API call here
    const aiReply = {
      role: "assistant",
      content: "This is a simulated AI response.",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  return <ChatWindow messages={messages} onSend={handleSend} />;
};

export default App;
