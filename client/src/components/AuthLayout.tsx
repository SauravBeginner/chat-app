import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AuthLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
