import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-300 to-purple-200 text-white">
      <motion.h1 
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to CSTech Infosolutions Pvt. Ltd.
      </motion.h1>
      <motion.p 
        className="text-lg mb-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Your trusted partner for innovative solutions in software development. Build, Scale & Innovate with us.
      </motion.p>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Link to="/about">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
            Learn More
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
