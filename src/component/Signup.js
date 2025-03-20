import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/signup", {
        name: user.name,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
      });
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 px-4">
      <motion.div
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Create an Account</h2>
        <p className="text-gray-500 mb-6">Join CSTech Infosolutions today!</p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <FaPhone className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={user.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
