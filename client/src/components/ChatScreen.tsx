import React, { useState } from "react";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Image as ImageIcon,
  Paperclip,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    user: {
      name: "Sarah Wilson",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      online: true,
    },
    messages: [
      {
        id: 1,
        text: "Hey! How's your project going? 👋",
        timestamp: "10:30 AM",
        isUser: false,
      },
      {
        id: 2,
        text: "It's going great! Just finished the main features. Would love your feedback! 🚀",
        timestamp: "10:32 AM",
        isUser: true,
      },
      {
        id: 3,
        text: "That's awesome! Would you mind sharing some screenshots?",
        timestamp: "10:33 AM",
        isUser: false,
      },
    ],
  },
];

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [activeChat] = useState(conversations[0]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm h-[calc(100vh-8rem)] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={activeChat.user.avatar}
              alt={activeChat.user.name}
              className="w-10 h-10 rounded-full ring-2 ring-gray-100"
            />
            {activeChat.user.online && (
              <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {activeChat.user.name}
            </h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
            <Phone className="h-5 w-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
            <Video className="h-5 w-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeChat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                msg.isUser
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.isUser ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <Smile className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <ImageIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <Paperclip className="h-6 w-6" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 
                     focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 
                     transform active:scale-95 transition-all duration-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
