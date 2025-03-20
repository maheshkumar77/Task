# CSTech Infosolutions Private Limited - MERN Stack Project

## 🚀 Project Overview
This project is a **Full Stack MERN Application** for **Admin User Management, Agent Creation & Management, and CSV-based Task Distribution**.

## 📌 Features
1. **User Authentication**
   - Secure Login with JWT Authentication.
   - Signup with name, email, username, mobile, password.
   
2. **Admin Panel**
   - Create and manage **Agents**.
   - Upload CSV files for **Task Distribution**.
   
3. **Task Distribution System**
   - Distributes tasks evenly among **5 Agents**.
   - Supports **CSV/XLSX file upload**.
   
4. **Dashboard**
   - View assigned tasks for each agent.
   - Quick Actions: **Create User, Add Task, Upload CSV**.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt.js
- **Database:** MongoDB (Local / Atlas)
- **Deployment:** Vercel (Frontend), Render/Railway (Backend)

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/your-repo/cstech-project.git
 cd cstech-project
```

### 2️⃣ Install Backend Dependencies
```sh
cd backend
npm install
```

### 3️⃣ Configure `.env` File in Backend
```env
MONGO_URI=mongodb://localhost:27017/authDB
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Start Backend Server
```sh
npm start
```

### 5️⃣ Install Frontend Dependencies
```sh
cd ../frontend
npm install
```

### 6️⃣ Start Frontend Server
```sh
npm start
```

---

## 📂 Folder Structure
```
cstech-project/
│── backend/        # Express.js backend API
│   ├── models/     # Mongoose models (User, Agent, Task)
│   ├── routes/     # API routes
│   ├── server.js   # Main server file
│── frontend/       # React.js frontend
│   ├── src/
│   │   ├── pages/  # Dashboard, Signup, Login
│   │   ├── components/ # Navbar, Forms
│   ├── App.js      # Main application
│── README.md       # Documentation
```

---

## 🚀 API Endpoints

### **Authentication APIs**
| Method | Endpoint         | Description          |
|--------|----------------|----------------------|
| POST   | /api/signup    | User registration   |
| POST   | /api/login     | User login          |

### **Admin APIs**
| Method | Endpoint        | Description             |
|--------|---------------|-------------------------|
| POST   | /api/add-agent | Add new agent          |
| GET    | /api/agents    | Fetch all agents       |
| POST   | /api/upload    | Upload CSV & Distribute |

### **Task APIs**
| Method | Endpoint            | Description                       |
|--------|--------------------|----------------------------------|
| GET    | /api/agents-tasks  | View assigned tasks per agent   |

---

## ✨ Deployment Steps
### Deploy Backend
- Use **Railway.app** or **Render** for hosting.
- Ensure **MongoDB Atlas** is configured.

### Deploy Frontend
- Use **Netlify** or **Vercel**.
- Set API URL in `frontend/src/config.js`.

---

## 🎯 Future Improvements
✅ Role-based Access (Admin & Agents)
✅ Email Notification on Task Assignment
✅ Dynamic Task Allocation based on Workload

---

## 📞 Contact & Support
For any issues, contact **support@cstech.com** or raise a GitHub issue.

**🚀 Happy Coding!**

