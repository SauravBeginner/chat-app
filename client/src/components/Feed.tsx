import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

const posts = Array.from({ length: 6 }, (_, index) => ({
  id: index++,
  user: {
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  image:
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  likes: 1234,
  caption: "Beautiful sunset at the beach! 🌅 #nature #photography",
  comments: 45,
  timeAgo: "2 hours ago",
}));

// const posts = [
//   {
//     id: 1,
//     user: {
//       name: "John Doe",
//       avatar:
//         "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     },
//     image:
//       "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
//     likes: 1234,
//     caption: "Beautiful sunset at the beach! 🌅 #nature #photography",
//     comments: 45,
//     timeAgo: "2 hours ago",
//   },
//   {
//     id: 2,
//     user: {
//       name: "Jane Smith",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     },
//     image:
//       "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
//     likes: 856,
//     caption: "Coffee and code ☕️ #developer #coding",
//     comments: 23,
//     timeAgo: "5 hours ago",
//   },
// ];

export default function Feed() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleSave = (postId: number) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md 
                                    hover:shadow-lg transition-all duration-200 animate-fade"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 rounded-full ring-2 ring-gray-100"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {post.user.name}
                </h3>
                <p className="text-xs text-gray-500">{post.timeAgo}</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="relative pb-[100%] bg-gray-100">
            <img
              src={post.image}
              alt="Post content"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`transform active:scale-90 transition-transform duration-100 ${
                    likedPosts.has(post.id)
                      ? "text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`h-6 w-6 ${
                      likedPosts.has(post.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
                <button className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
                  <MessageCircle className="h-6 w-6" />
                </button>
                <button className="text-gray-700 hover:text-green-500 transition-colors duration-200">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
              <button
                onClick={() => toggleSave(post.id)}
                className={`transition-colors duration-200 ${
                  savedPosts.has(post.id)
                    ? "text-yellow-500"
                    : "text-gray-700 hover:text-yellow-500"
                }`}
              >
                <Bookmark
                  className={`h-6 w-6 ${
                    savedPosts.has(post.id) ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>

            <div className="mb-2">
              <span className="font-semibold">
                {post.likes.toLocaleString()} likes
              </span>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold mr-2">{post.user.name}</span>
                {post.caption}
              </p>
              <button className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200">
                View all {post.comments} comments
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
