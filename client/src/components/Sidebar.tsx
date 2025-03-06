import React from "react";
import { User, Users, Bookmark, Settings, TrendingUp } from "lucide-react";

const suggestions = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    mutual: 3,
  },
  {
    id: 2,
    name: "David Brown",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    mutual: 5,
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    mutual: 2,
  },
];

const trends = ["#photography", "#technology", "#travel", "#food"];

export default function Sidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-[2px]">
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
              <User className="h-6 w-6 text-gray-700" />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Your Profile</h2>
            <p className="text-sm text-gray-500">View and edit profile</p>
          </div>
        </div>

        <div className="space-y-2">
          <button
            className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 w-full p-2.5 rounded-lg
                           transition-colors duration-200"
          >
            <Users className="h-5 w-5" />
            <span>Friends</span>
          </button>
          <button
            className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 w-full p-2.5 rounded-lg
                           transition-colors duration-200"
          >
            <Bookmark className="h-5 w-5" />
            <span>Saved</span>
          </button>
          <button
            className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 w-full p-2.5 rounded-lg
                           transition-colors duration-200"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Trending</span>
          </button>
          <button
            className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 w-full p-2.5 rounded-lg
                           transition-colors duration-200"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Trending Topics</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {trends.map((trend) => (
            <span
              key={trend}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700
                                      hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            >
              {trend}
            </span>
          ))}
        </div>

        <h3 className="font-semibold text-gray-800 mb-4">Suggested for you</h3>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={suggestion.avatar}
                    alt={suggestion.name}
                    className="w-10 h-10 rounded-full ring-2 ring-gray-100 group-hover:ring-blue-100
                             transition-all duration-200"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{suggestion.name}</p>
                  <p className="text-xs text-gray-500">
                    {suggestion.mutual} mutual friends
                  </p>
                </div>
              </div>
              <button
                className="text-blue-500 hover:text-blue-600 text-sm font-semibold
                               transition-colors duration-200"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
