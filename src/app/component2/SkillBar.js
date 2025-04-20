import React from "react";
import { motion } from "framer-motion";

const SkillBar = ({ icon, name, percent }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300"
    >
      <div className="flex items-center mb-3">
        <div className="text-3xl text-purple-600 dark:text-purple-400 mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`h-3 rounded-full ${getBarColor(percent)}`}
        ></motion.div>
      </div>
      <div className="mt-2 text-right font-medium text-gray-600 dark:text-gray-300">
        {percent}%
      </div>
    </motion.div>
  );
};

// Function to determine the color of the skill bar based on percentage
const getBarColor = (percent) => {
  if (percent >= 80) return "bg-green-500";
  if (percent >= 60) return "bg-blue-500";
  if (percent >= 40) return "bg-yellow-500";
  return "bg-orange-500";
};

export default SkillBar;