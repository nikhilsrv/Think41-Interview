// components/UserInput.jsx
import { useChat } from "../context/chatContext";

export default function UserInput() {
  const { input, setInput, setMessages, setLoading } = useChat();

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    const aiMessage = {
      id: Date.now().toString() + "-ai",
      role: "ai",
      content: data.reply,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 flex-1 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button className="bg-blue-500 text-white px-4 rounded" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
