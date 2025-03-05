import React, { useEffect, useRef, useState } from "react";
import { MoreVertical, Share2, Send, Paperclip, Smile } from "lucide-react";
import { contacts, initialMessages } from "../../data";
import { Message } from "../../types/constants";

// Mock data for messages

const ChatWindow: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State to store chat messages with initial "Hello from server!" message
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  // @ts-ignore
  const [activeContact, setActiveContact] = useState(contacts[0]);

  // Refs to store WebSocket connection and input element
  const wsRef = useRef<WebSocket | null>(null);
  // const inputRef = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  useEffect(() => {
    // Create new WebSocket connection to local server
    const ws = new WebSocket("ws://localhost:8080");

    // Handle incoming messages from server
    ws.onmessage = (event) => {
      try {
        // Parse the incoming message data
        const data = JSON.parse(event.data);
        const newMessage: Message = {
          ...data,
        };
        setMessages((prevMessage) => [...prevMessage, newMessage]); // Add new message to messages array
      } catch (error) {
        console.error("Error while parsing message:", error);
      }
    };

    // Store WebSocket connection in ref for later use
    //@ts-ignore
    wsRef.current = ws;

    // When connection opens, send join room message
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red", // Join room with ID "red"
          },
        })
      );
    };

    // Cleanup: close WebSocket when component unmounts
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array means this runs once on mount
  const sendMassege = () => {
    if (!inputMessage.trim() || !wsRef.current) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "Dan Abramov",
      avatar:
        "https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-bench-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: inputMessage,
      isUser: true,
      time: "Just now",
    };

    // Send chat message through WebSocket
    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: newMessage,
        },
      })
    );
    setInputMessage("");
  };

  return (
    <div className="h-full w-full md:w-[70%]">
      {/* Chat Header */}
      <div className="flex w-full items-center justify-between gap-2 p-4 border-b-[1px] border-white">
        <div className="flex w-full items-center justify-start gap-3">
          <button
            className="inline-flex md:hidden h-7 w-7 md:h-10 md:w-10 flex-shrink-0 items-center justify-center border-[1px] border-white p-1"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </button>
          <img
            className="flex aspect-square h-10 w-10 flex-shrink-0 rounded-full object-cover"
            src={activeContact.avatar}
            alt="avatar"
          />
          <p className="font-semibold text-white">{activeContact.name}</p>
        </div>
        <div className="flex items-center justify-end gap-4">
          <button className="hidden md:inline-flex h-10 w-10 flex-shrink-0 items-center justify-center border-[1px] border-white p-1">
            <Share2 className="w-5 h-5 text-white" />
          </button>
          <button className="inline-flex h-7 w-7 md:h-10 md:w-10 flex-shrink-0 items-center justify-center border-[1px] border-white p-1">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="relative h-[calc(100vh-150px)] md:h-[calc(100vh-158px)] w-full p-0 md:p-4">
        <div className="flex h-[calc(100%-53px)] md:h-[calc(100%-90px)] w-full flex-col-reverse gap-8 overflow-y-auto px-2 py-4 md:p-0">
          <div className="flex flex-col-reverse gap-6" ref={messagesEndRef}>
            {/* Typing Indicator */}
            <div className="flex min-w-[150px] max-w-[80%] md:max-w-[70%] items-start justify-start gap-2 text-white">
              <img
                className="flex aspect-square h-7 w-7 md:h-10 md:w-10 flex-shrink-0 rounded-full object-cover"
                src={activeContact.avatar}
                alt="avatar"
              />
              <div className="flex w-full max-w-[70%] flex-col gap-2">
                <p className="text-xs">{activeContact.name}</p>
                <div className="relative w-fit bg-[#343434] p-3 text-sm after:absolute after:left-0 after:top-0 after:border-r-[15px] after:border-t-[15px] after:border-r-transparent after:border-t-[#121212]">
                  <div className="flex w-full items-center justify-center gap-1.5 px-3 py-1">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-gray-300"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-gray-300"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-gray-300"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message with Images */}
            {/* <div className="flex min-w-[150px] max-w-[80%] md:max-w-[70%] items-start justify-start gap-2 text-white ml-auto flex-row-reverse">
            <img
              className="flex aspect-square h-7 w-7 md:h-10 md:w-10 flex-shrink-0 rounded-full object-cover"
              src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-bench-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="avatar"
            />
            <div className="flex w-full flex-col gap-1 md:gap-2 items-end justify-end">
              <p className="text-[10px] md:text-xs">
                Dan Abramov
                <span className="ml-2 text-gray-400">5 minutes ago</span>
              </p>
              <div className="relative w-fit p-2 md:p-3 text-xs md:text-sm bg-[#ae7aff] after:absolute after:right-0 after:top-0 after:border-l-[15px] after:border-t-[15px] after:border-l-transparent after:border-t-[#121212]">
                I'm good too, just catching up on some reading and enjoying the
                weather outside.
              </div>
              <div className="grid w-full grid-cols-2 items-start justify-start gap-1 md:gap-2 md:max-w-[90%] ml-auto">
                {imageGallery.map((img, index) => (
                  <img
                    key={index}
                    className="flex aspect-video w-full flex-shrink-0 object-cover"
                    src={img}
                    alt="shared image"
                  />
                ))}
              </div>
            </div>
          </div> */}

            {/* Regular Messages */}
            <div className="flex flex-col gap-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex min-w-[150px] max-w-[80%] md:max-w-[70%] items-start justify-start gap-2 text-white ${
                    msg.isUser ? "ml-auto flex-row-reverse" : "mr-0"
                  }`}
                >
                  <img
                    className="flex aspect-square h-7 w-7 md:h-10 md:w-10 flex-shrink-0 rounded-full object-cover"
                    src={msg.avatar}
                    alt="avatar"
                  />
                  <div
                    className={`flex w-full flex-col gap-1 md:gap-2 ${
                      msg.isUser ? "items-end justify-end" : ""
                    }`}
                  >
                    <p className="text-[10px] md:text-xs">
                      {msg.sender}
                      <span className="ml-2 text-gray-400">{msg.time}</span>
                    </p>
                    <div
                      className={`relative w-fit p-2 md:p-3 text-xs md:text-sm ${
                        msg.isUser
                          ? "bg-[#ae7aff] after:absolute after:right-0 after:top-0 after:border-l-[15px] after:border-t-[15px] after:border-l-transparent after:border-t-[#121212]"
                          : "bg-[#343434] after:absolute after:left-0 after:top-0 after:border-r-[15px] after:border-t-[15px] after:border-r-transparent after:border-t-[#121212]"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Message Input */}
        <div className="sticky top-full flex w-full items-center justify-start gap-1 md:gap-4 px-4 py-2 border-t-[1px] border-white md:border-[1px] md:shadow-[5px_5px_0px_0px_#4f4e4e]">
          <img
            className="hidden md:flex aspect-square h-5 w-5 md:h-10 md:w-10 flex-shrink-0 rounded-full object-cover"
            src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-bench-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="avatar"
          />
          <input
            placeholder="Message..."
            className="w-full bg-transparent p-2 md:p-4 text-sm md:text-base text-white !outline-none placeholder:text-gray-500"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMassege();
              }
            }}
            // ref={inputRef}
          />
          <button className="hidden md:flex h-5 w-5 md:h-10 md:w-10 flex-shrink-0 items-center justify-center p-1">
            <Smile className="w-6 h-6 text-white" />
          </button>
          <button className="flex h-7 w-7 md:h-10 md:w-10 flex-shrink-0 items-center justify-center p-1">
            <Paperclip className="w-6 h-6 text-white" />
          </button>
          <button
            className="flex h-7 w-7 md:h-10 md:w-10 flex-shrink-0 items-center justify-center bg-[#ae7aff] p-1"
            onClick={sendMassege}
          >
            <Send className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
