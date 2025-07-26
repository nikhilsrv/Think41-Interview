// components/SidePanel.jsx
import React from "react";
import { useChat } from "../context/chatContext";

const SidePanel = () => {
  const { conversations, loadConversation } = useChat();

  return (
    <div className="w-64 bg-gray-100 border-r p-4 h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Past Conversations</h2>
      <ul className="space-y-2">
        {conversations.length === 0 && <p className="text-sm text-gray-500">No saved chats</p>}
        {conversations.map((convo) => (
          <li
            key={convo.id}
            className="cursor-pointer bg-white hover:bg-gray-200 p-2 rounded shadow-sm"
            onClick={() => loadConversation(convo.id)}
          >
            {convo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidePanel;
