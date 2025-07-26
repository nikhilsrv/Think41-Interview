
import SidePanel from "./components/SidePanel";
import { useChat } from "./context/chatContext";
import ChatWindow from "./components/ChatWindow";



const App = () => {
  const { messages, saveConversation } = useChat();
  return (
    <div className="flex">
      <SidePanel />
      <ChatWindow />
    </div>
  );
};

export default App;
