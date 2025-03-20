import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
      <motion.h1 
        className="text-4xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About CSTech Infosolutions Pvt. Ltd.
      </motion.h1>
      <motion.p 
        className="text-lg text-gray-600 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        CSTech Infosolutions is a leading software development company focused on providing top-notch web and mobile solutions. We specialize in **MERN Stack Development**, **Cloud Computing**, and **AI-powered applications** to revolutionize businesses worldwide.
      </motion.p>
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <img 
          src="https://source.unsplash.com/800x400/?technology,teamwork" 
          alt="Company Team" 
          className="rounded-lg shadow-lg w-full max-w-3xl"
        />
      </motion.div>
    </div>
  );
};

export default About;
