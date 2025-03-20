// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate , Link } from "react-router-dom";
// // import Login from "./component/Login";
// // import Dashboard from "./component/Dashboard";
// // import AddAgent from "./component/AddAgent";
// // import AgentList from "./component/AgentList";

// import Navbar from "./component/Navbar";


// // const PrivateRoute = ({ children }) => {
// //   const token = localStorage.getItem("token");
// //   return token ? children : <Navigate to="/login" />;
// // };

// const App = () => {
//   return (

//     <>

// <Navbar/>

//     </>
//     // <Router>
//     //  <div className="p-4">
//     //     <nav className="mb-4">
//     //       <Link to="/add-agent" className="mr-4 text-blue-500">Add Agent</Link>
//     //       <Link to="/agents" className="text-blue-500">View Agents</Link>
//     //     </nav>
//     //   </div>
//     //   <Routes>
//     //     <Route path="/login" element={<Login />} />
//     //     <Route
//     //       path="/dashboard"
//     //       element={
//     //         <PrivateRoute>
//     //           <Dashboard />
//     //         </PrivateRoute>
//     //       }
//     //     />
//     //     <Route path="*" element={<Navigate to="/login" />} />
//     //     <Route path="/add-agent" element={<AddAgent />} />
//     //     <Route path="/agents" element={<AgentList />} />
//     //   </Routes>
//     // </Router>
//   );
// };

// export default App;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import About from "./component/About";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import AgentTasks from "./component/AgentTasks";
import AddAgent from "./component/AddAgent";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lop" element={<AgentTasks/>}/>
        <Route path="/create-user" element={<AddAgent/>}/>
      </Routes>
    </Router>
  );
}

export default App;

