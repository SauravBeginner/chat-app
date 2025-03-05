import React from "react";
import ChatList from "../../components/chats/ChatList";
import ChatWindow from "../../components/chats/ChatWindow";

const Chat: React.FC = () => {
  return (
    <div
      className="mt-[77px] md:mt-[83px] flex h-[calc(100vh-77px)] md:h-[calc(100vh-83px)] w-full items-center justify-center overflow-hidden p-0"
      style={{ overflowY: "hidden" }}
    >
      <ChatList />

      {/* Chat Area */}
      <ChatWindow />
    </div>
  );
};

export default Chat;
