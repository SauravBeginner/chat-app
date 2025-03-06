import React, { useState } from "react";
import {
  Camera,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Mail,
  Phone,
  Globe,
  Save,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
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

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                         transform active:scale-95 transition-all duration-200"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 
                         focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 
                         disabled:text-gray-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue="johndoe"
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 
                         focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 
                         disabled:text-gray-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                           disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    defaultValue="+1 (555) 000-0000"
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                           disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    defaultValue="San Francisco, CA"
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                           disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    defaultValue="https://johndoe.com"
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                           disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                defaultValue="Product designer and developer based in San Francisco. Love creating beautiful and functional user interfaces."
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 
                       disabled:text-gray-500 transition-all duration-200"
              />
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg 
                         hover:bg-gray-50 transform active:scale-95 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                         transform active:scale-95 transition-all duration-200 flex items-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
