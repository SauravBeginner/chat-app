import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("./pages/Home"));
const AuthPage = React.lazy(() => import("./pages/Auth"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const ChatLayout = React.lazy(() => import("./pages/ChatLayout"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));

function App() {
  return (
    // <div className="bg-[#121212]">
    //   <Header />
    //   <Chat />
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <Router>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/edit-profile" element={<ProfilePage />} />
            <Route path="/chat" element={<ChatLayout />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
