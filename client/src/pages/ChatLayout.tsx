import React, { useState } from "react";
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Send,
  Smile,
  Image as ImageIcon,
  Paperclip,
  MessageCircle,
  Settings,
  Star,
  Archive,
} from "lucide-react";

interface Chat {
  id: number;
  user: {
    name: string;
    avatar: string;
    online: boolean;
    lastSeen?: string;
  };
  lastMessage: {
    text: string;
    time: string;
    unread: boolean;
  };
}

const chats: Chat[] = [
  {
    id: 1,
    user: {
      name: "Sarah Wilson",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      online: true,
    },
    lastMessage: {
      text: "Hey! How's your project going? 👋",
      time: "10:30 AM",
      unread: true,
    },
  },
  {
    id: 2,
    user: {
      name: "David Brown",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      online: false,
      lastSeen: "2h ago",
    },
    lastMessage: {
      text: "The meeting is scheduled for tomorrow at 10 AM",
      time: "9:45 AM",
      unread: false,
    },
  },
  {
    id: 3,
    user: {
      name: "Emma Davis",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      online: true,
    },
    lastMessage: {
      text: "Thanks for your help! 🙌",
      time: "Yesterday",
      unread: false,
    },
  },
];

const messages = [
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
];

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<Chat>(chats[0]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] mt-20">
      {/* Chat List Sidebar */}
      <div className="w-96 border-r border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <Star className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <Archive className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-13rem)]">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200 
                       ${selectedChat.id === chat.id ? "bg-blue-50" : ""}`}
            >
              <div className="relative">
                <img
                  src={chat.user.avatar}
                  alt={chat.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.user.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {chat.user.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {chat.lastMessage.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage.text}
                  </p>
                  {chat.lastMessage.unread && (
                    <span className="h-2 w-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={selectedChat.user.avatar}
                alt={selectedChat.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {selectedChat.user.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                {selectedChat.user.name}
              </h3>
              <p className="text-xs text-green-500">
                {selectedChat.user.online
                  ? "Online"
                  : selectedChat.user.lastSeen}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-gray-100">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.isUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none shadow-sm"
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

        {/* Message Input */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-white border-t border-gray-100"
        >
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Smile className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ImageIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
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
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 
                       transform active:scale-95 transition-all duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
