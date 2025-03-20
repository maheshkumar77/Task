import React, { useState, useEffect } from "react";
import axios from "axios";

const AgentTasks = () => {
  const [agentsTasks, setAgentsTasks] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/agents-tasks")
      .then((response) => setAgentsTasks(response.data))
      .catch((error) => console.error("Error fetching tasks", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">Tasks Assigned to Agents</h2>
      {Object.entries(agentsTasks).map(([agent, tasks]) => (
        <div key={agent} className="border p-4 my-4">
          <h3 className="font-bold">{agent}</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task.firstName} - {task.phone} - {task.notes}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AgentTasks;
