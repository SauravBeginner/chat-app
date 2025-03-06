import React, { useState, useRef } from "react";
import { Image, X, Send } from "lucide-react";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the post creation
    console.log("New post:", { content, image: imagePreview });
    setContent("");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-start space-x-3">
          {/* <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          /> */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />

            {imagePreview && (
              <div className="relative mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-lg max-h-[300px] object-contain"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-gray-900/50 rounded-full text-white hover:bg-gray-900/75 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <Image className="w-5 h-5" />
              <span>Add Photo</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!content.trim() && !imagePreview}
            className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
            <span>Post</span>
          </button>
        </div>
      </form>
    </div>
  );
}
