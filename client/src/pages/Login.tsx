import React, { useState } from "react";

import { Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";

interface AuthFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/login`,
        formData,
        { withCredentials: true }
      );
      toast.success("Account created successfully!");
      navigate("/");
      console.log(response);
    } catch (err) {
      //@ts-ignore
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.success("Redirecting to Google login...");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1554147090-e1221a04a025?w=1600)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Auth Container */}
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Welcome back!
          </h2>
          <p className="mt-2 text-sm text-gray-200">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/auth/signup")}
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Auth Form */}
        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-2xl"
        >
          <div className="space-y-4">
            {/* <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full rounded-lg border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  placeholder="Full name"
                />
              </div>
            </div> */}
            {/* <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full rounded-lg border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  placeholder="Email address"
                />
              </div>
            </div> */}
            {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" /> */}
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email or UserName"
              label="Email or UserName"
              autoComplete="off"
              icon={
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              }
            />
            <Input
              id="password"
              name="password"
              type="text"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              label="Password"
              autoComplete="off"
              icon={
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              }
              isPassword
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot your password?
            </button>
          </div>

          <div>
            <button
              type="submit"
              //@ts-ignore
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              <span className="absolute inset-y-0 right-3 flex items-center">
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              {loading ? "Logging In..." : "Log in"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-2 text-gray-300">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#24292F] px-3 py-2 text-sm font-semibold text-white hover:bg-[#24292F]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F] transition-colors"
            >
              <Github className="h-5 w-5" />
              GitHub
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-300">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
