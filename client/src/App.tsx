import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import AuthLayout from "./components/AuthLayout";
import Loader from "./components/loader/Loader";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));

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
      {/* <Navbar /> */}
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/edit-profile" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatLayout />} />
              <Route path="/user/:id" element={<UserProfile />} />
            </Route>

            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
