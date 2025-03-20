require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Agent Schema & Model
const AgentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
});

const Agent = mongoose.model("Agent", AgentSchema);

// Task Schema & Model
const TaskSchema = new mongoose.Schema({
  firstName: String,
  phone: Number,
  notes: String,
  agentId: mongoose.Schema.Types.ObjectId,
});

const Task = mongoose.model("Task", TaskSchema);

// Middleware for Authentication
const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// **User Signup API**
app.post("/api/signup", async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up!" });
  }
});

// **User Login API**
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found!" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, user });
});

// **Add Agent API**
app.post("/api/add-agent", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const existingAgent = await Agent.findOne({ email });
  if (existingAgent) return res.status(400).json({ message: "Agent already exists!" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAgent = new Agent({ name, email, mobile, password: hashedPassword });

  try {
    await newAgent.save();
    res.json({ message: "Agent added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding agent!" });
  }
});

// **Get All Agents**
app.get("/api/agents", async (req, res) => {
  try {
    const agents = await Agent.find({}, "-password"); // Exclude passwords
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agents!" });
  }
});

// **Multer Storage Config for File Upload**
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".csv", ".xlsx", ".xls"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
      return cb(new Error("Only CSV, XLSX, and XLS files are allowed"));
    }
    cb(null, true);
  },
});

// **Upload CSV/XLSX and Distribute Tasks**
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const filePath = req.file.path;
  let tasks = [];

  try {
    if (req.file.mimetype.includes("csv")) {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          tasks = results.map((row) => ({
            firstName: row.FirstName,
            phone: row.Phone,
            notes: row.Notes,
          }));
          await distributeTasks(tasks);
          fs.unlinkSync(filePath);
          res.json({ message: "File processed and tasks distributed!" });
        });
    } else {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      tasks = jsonData.map((row) => ({
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes,
      }));
      await distributeTasks(tasks);
      fs.unlinkSync(filePath);
      res.json({ message: "File processed and tasks distributed!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing file", error: error.message });
  }
});

// **Function to Distribute Tasks Among 5 Agents**
async function distributeTasks(tasks) {
  const agents = await Agent.find();
  if (agents.length < 5) throw new Error("At least 5 agents are required");

  let distributedTasks = [];
  const numAgents = agents.length;

  tasks.forEach((task, index) => {
    const agentIndex = index % numAgents; // Assign tasks in a round-robin manner
    distributedTasks.push({ ...task, agentId: agents[agentIndex]._id });
  });

  await Task.insertMany(distributedTasks);
}

// **API to Get Distributed Tasks for Each Agent**
app.get("/api/agents-tasks", async (req, res) => {
  try {
    const agents = await Agent.find();
    const tasksByAgent = {};

    for (const agent of agents) {
      const tasks = await Task.find({ agentId: agent._id });
      tasksByAgent[agent.name] = tasks;
    }

    res.json(tasksByAgent);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agent tasks", error: error.message });
  }
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
