import React, { useState } from "react";
import {
  Camera,
  Users,
  UserPlus,
  UserMinus,
  Grid,
  Heart,
  MessageCircle,
} from "lucide-react";

interface Friend {
  id: number;
  name: string;
  avatar: string;
  mutualFriends: number;
  isFollowing: boolean;
}

interface Post {
  id: number;
  image: string;
  likes: number;
  comments: number;
}

const friends: Friend[] = [
  {
    id: 1,
    name: "Emma Wilson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    mutualFriends: 12,
    isFollowing: true,
  },
  {
    id: 2,
    name: "James Anderson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    mutualFriends: 8,
    isFollowing: true,
  },
  {
    id: 3,
    name: "Sophie Brown",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    mutualFriends: 15,
    isFollowing: false,
  },
];

const suggestions: Friend[] = [
  {
    id: 4,
    name: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    mutualFriends: 6,
    isFollowing: false,
  },
  {
    id: 5,
    name: "Maria Garcia",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    mutualFriends: 4,
    isFollowing: false,
  },
];

const posts: Post[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 187,
    comments: 32,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 342,
    comments: 56,
  },
];

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "posts" | "friends" | "suggestions"
  >("posts");
  const [followingStatus, setFollowingStatus] = useState<{
    [key: number]: boolean;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const toggleFollow = (userId: number) => {
    setFollowingStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const isFollowing = (userId: number, defaultStatus: boolean) => {
    return followingStatus[userId] ?? defaultStatus;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <button
              className="absolute bottom-4 right-4 bg-black/30 text-white p-2 rounded-lg 
                           hover:bg-black/40 transition-colors duration-200 backdrop-blur-sm"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 pb-6">
            <div className="flex justify-between items-end -mt-12">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl border-4 border-white bg-white shadow-md overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="absolute bottom-2 right-2 bg-black/30 text-white p-1.5 rounded-lg 
                               hover:bg-black/40 transition-colors duration-200 backdrop-blur-sm"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                               flex items-center space-x-2 transform active:scale-95 transition-all duration-200"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Follow</span>
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 
                         transform active:scale-95 transition-all duration-200"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-600 mt-1">Product Designer & Developer</p>

              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span>2.4k followers</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Heart className="h-5 w-5" />
                  <span>1.2k following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-1">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 
                       transition-all duration-200 ${
                         activeTab === "posts"
                           ? "bg-blue-500 text-white"
                           : "text-gray-600 hover:bg-gray-50"
                       }`}
            >
              <Grid className="h-5 w-5" />
              <span>Posts</span>
            </button>
            <button
              onClick={() => setActiveTab("friends")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 
                       transition-all duration-200 ${
                         activeTab === "friends"
                           ? "bg-blue-500 text-white"
                           : "text-gray-600 hover:bg-gray-50"
                       }`}
            >
              <Users className="h-5 w-5" />
              <span>Friends</span>
            </button>
            <button
              onClick={() => setActiveTab("suggestions")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 
                       transition-all duration-200 ${
                         activeTab === "suggestions"
                           ? "bg-blue-500 text-white"
                           : "text-gray-600 hover:bg-gray-50"
                       }`}
            >
              <UserPlus className="h-5 w-5" />
              <span>Suggestions</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6">
          {activeTab === "posts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group relative rounded-xl overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                               transition-opacity duration-200 flex items-center justify-center"
                  >
                    <div className="flex items-center space-x-6 text-white">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-6 w-6" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-6 w-6" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "friends" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-4 rounded-xl 
                                            bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {friend.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {friend.mutualFriends} mutual friends
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(friend.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                      isFollowing(friend.id, friend.isFollowing)
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {isFollowing(friend.id, friend.isFollowing) ? (
                      <>
                        <UserMinus className="h-5 w-5" />
                        <span>Unfollow</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "suggestions" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center justify-between p-4 rounded-xl 
                                                bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={suggestion.avatar}
                      alt={suggestion.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {suggestion.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {suggestion.mutualFriends} mutual friends
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(suggestion.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                      isFollowing(suggestion.id, suggestion.isFollowing)
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {isFollowing(suggestion.id, suggestion.isFollowing) ? (
                      <>
                        <UserMinus className="h-5 w-5" />
                        <span>Unfollow</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
