import { useState } from "react";
import {
  Home,
  Search,
  PlusSquare,
  User,
  MessageCircle,
  Bell,
} from "lucide-react";

export default function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              SocialApp
            </h1>
            <div className="hidden md:block ml-8">
              <div
                className={`relative transition-all duration-200 ${
                  isSearchFocused ? "scale-105" : ""
                }`}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 bg-gray-50 rounded-full w-72 focus:outline-none focus:ring-2 
                           focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Home className="nav-icon" />
            <MessageCircle className="nav-icon" />
            <div className="relative group">
              <PlusSquare className="nav-icon" />
              <div
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                            transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
              >
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Create Post
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Create Story
                </button>
              </div>
            </div>
            <div className="relative">
              <Bell className="nav-icon" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">3</span>
              </span>
            </div>
            <div
              className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-[2px] cursor-pointer
                          hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
            >
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                <User className="h-5 w-5 text-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
