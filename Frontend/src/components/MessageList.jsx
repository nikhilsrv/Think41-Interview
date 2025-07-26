// components/MessageList.jsx
import { useChat } from "../context/chatContext";

export default function MessageList() {
  const { messages } = useChat();

  return (
    <div className="space-y-2 p-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded max-w-lg ${
            msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
