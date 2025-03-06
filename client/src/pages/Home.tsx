import React from "react";
import ChatScreen from "../components/ChatScreen";
import Sidebar from "../components/Sidebar";
import Stories from "../components/Stories";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <Stories />
          <Feed />
        </div>

        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <ChatScreen />
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
