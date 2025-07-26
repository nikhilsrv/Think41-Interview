// context/ChatContext.jsx
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 NEW: Save multiple conversations
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const saveConversation = (title = "Untitled") => {
    const newConvo = {
      id: Date.now(),
      title,
      messages: [...messages],
    };
    setConversations([newConvo, ...conversations]);
  };

  const loadConversation = (id) => {
    const convo = conversations.find((c) => c.id === id);
    if (convo) {
      setMessages(convo.messages);
      setSelectedConversationId(id);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        input,
        setInput,
        loading,
        setLoading,
        conversations,
        saveConversation,
        loadConversation,
        selectedConversationId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
