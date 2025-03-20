import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdAddTask } from "react-icons/md";
import { FaUpload, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [agents, setAgents] = useState([]);
  const [tasksByAgent, setTasksByAgent] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect if no user is found
    }
    fetchAgents();
    fetchTasks();
  }, [navigate]);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agents");
      setAgents(res.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agents-tasks");
      setTasksByAgent(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      fetchTasks();
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <motion.div
        className="bg-white p-6 shadow-lg rounded-lg mb-6 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user?.name || "User"} 👋
        </h2>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </motion.div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task Distribution Section */}
        <motion.div
          className="md:col-span-2 bg-white p-6 shadow-lg rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4">Task Distribution</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 border rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-3 px-6 text-left">Agent Name</th>
                  <th className="py-3 px-6 text-center">Tasks Assigned</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent._id} className="border-t hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{agent.name}</td>
                    <td className="py-3 px-6 text-center">
                      {tasksByAgent[agent.name]?.length || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white p-6 shadow-lg rounded-lg flex flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4 text-center">Quick Actions</h3>
          <button
            onClick={() => navigate("/create-user")}
            className="flex items-center justify-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            <IoAddCircleOutline className="text-xl mr-2" /> Create User
          </button>
          <button
            onClick={() => navigate("/add-task")}
            className="flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            <MdAddTask className="text-xl mr-2" /> Add Task
          </button>

          {/* File Upload Section */}
          <form onSubmit={handleFileUpload} className="mt-4">
            <label className="block text-center font-semibold text-gray-700 mb-2">
              Upload Tasks File
            </label>
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-2 rounded mb-2"
            />
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition"
            >
              <FaUpload className="text-xl mr-2" /> Upload & Distribute Tasks
            </button>
          </form>
          {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
