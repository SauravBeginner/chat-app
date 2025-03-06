import { Plus } from "lucide-react";

const stories = [
  {
    id: 1,
    user: "Your Story",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isUser: true,
  },
  {
    id: 2,
    user: "John Doe",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    user: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    user: "Mike Johnson",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

export default function Stories() {
  return (
    <div
      className="flex space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-x-auto
                    scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
    >
      {stories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center space-y-1.5 flex-shrink-0 group"
        >
          <div className="relative cursor-pointer transform transition-transform duration-200 hover:scale-105">
            <div
              className={`w-16 h-16 rounded-full p-[2px] ${
                story.isUser
                  ? "bg-white ring-2 ring-gray-200 hover:ring-blue-500 transition-all duration-200"
                  : "bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-500"
              }`}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src={story.image}
                  alt={story.user}
                  className="w-full h-full object-cover filter group-hover:brightness-90 transition-all duration-200"
                />
                {story.isUser && (
                  <div
                    className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 
                                shadow-md transform transition-transform duration-200 hover:scale-110"
                  >
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-gray-700 truncate w-16 text-center">
            {story.user}
          </span>
        </div>
      ))}
    </div>
  );
}
