import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { contacts } from "../../data";

const ChatList: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //@ts-ignore
  const [activeContact, setActiveContact] = useState(contacts[0]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        className="peer fixed h-full w-full md:hidden"
        onClick={toggleSidebar}
        aria-label="mobile-chatlist-toggler"
      ></button>
      {/* Sidebar */}
      <div
        className={`fixed md:static top-[77px] z-10 h-full w-full md:w-[30%] bg-[#121212] border-r-[1px] border-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? "right-0" : "right-full"
        } md:block`}
      >
        {/* Search Bar */}
        <div className="flex w-full items-center justify-start gap-2 p-4 border-b-[1px] border-white">
          <input
            placeholder="Search chat..."
            className="w-full bg-transparent px-2 md:px-4 text-white !outline-none placeholder:text-gray-500"
          />
          <button className="inline-flex h-7 w-7 md:h-10 md:w-10 flex-shrink-0 items-center justify-center border-[1px] border-white p-1">
            <Search className="w-5 h-5 text-white" />
          </button>
          <button className="hidden md:inline-flex h-10 w-10 flex-shrink-0 items-center justify-center border-[1px] border-white p-1">
            <Filter className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Contact List */}
        <ul className="flex h-[calc(100%-140px)] md:h-[calc(100%-73px)] w-full flex-col items-start justify-start divide-y-[1px] divide-white overflow-y-auto">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="w-full cursor-pointer p-4 md:p-6 hover:bg-[#232323]"
              onClick={() => setActiveContact(contact)}
            >
              <div className="flex w-full items-start justify-start gap-3 md:gap-4">
                <img
                  className="flex aspect-square h-10 w-10 flex-shrink-0 rounded-full object-cover"
                  src={contact.avatar}
                  alt="avatar"
                />
                <div className="flex w-full flex-col items-start justify-start gap-1 truncate text-ellipsis">
                  <div className="flex w-full items-center justify-between text-[10px] md:text-xs">
                    <p className="text-gray-400">{contact.name}</p>
                    <p className="text-gray-400">{contact.time}</p>
                  </div>
                  <p className="text-xs md:text-sm text-white">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatList;
