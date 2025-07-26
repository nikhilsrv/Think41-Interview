// components/ChatWindow.jsx
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import { useChat } from "../context/chatContext";

export default function ChatWindow() {
  const { loading } = useChat();

  return (
    <div className="max-w-2xl mx-auto border rounded shadow p-4 flex flex-col h-[90vh]">
      <div className="flex-1 overflow-y-auto mb-4">
        <MessageList />
        {loading && <p className="text-sm italic">Thinking...</p>}
      </div>
      <UserInput />
    </div>
  );
}
