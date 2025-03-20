import React, { useState, useEffect } from "react";
import axios from "axios";

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/agents");
        setAgents(res.data);
      } catch (error) {
        console.error("Failed to fetch agents", error);
      }
      setLoading(false);
    };

    fetchAgents();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Registered Agents</h1>

      {loading ? (
        <p>Loading agents...</p>
      ) : agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {agents.map((agent) => (
            <li
              key={agent._id}
              className="border p-4 bg-white shadow-lg rounded-lg"
            >
              <h2 className="text-xl font-bold">{agent.name}</h2>
              <p>Email: {agent.email}</p>
              <p>Mobile: {agent.mobile}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentList;
