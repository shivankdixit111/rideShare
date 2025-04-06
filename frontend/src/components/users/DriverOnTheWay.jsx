import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosCar } from "react-icons/io";
import { IoLocation, IoTime } from "react-icons/io5";
import { FaUserAlt, FaPhone } from "react-icons/fa";
import { motion } from 'framer-motion';
import { RiMotorbikeFill } from "react-icons/ri";


const DriverOnTheWay = ({ setDriverOnTheWay, ride }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [distance, setDistance] = useState('2.5 km');
  const [eta, setEta] = useState('5 mins');

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
      // Simulate distance decreasing
      setDistance(prev => {
        const km = parseFloat(prev.split(' ')[0]);
        return `${(km - 0.1).toFixed(1)} km`;
      });
      // Simulate ETA updating
      setEta(prev => {
        const mins = parseInt(prev.split(' ')[0]);
        return `${Math.max(1, mins - 1)} mins`;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 max-w-md mt-2 mx-auto bg-white rounded-lg shadow-sm">
      {/* Header with back button */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setDriverOnTheWay(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <IoIosArrowDown className="text-2xl" />
        </button>
        <h1 className="text-lg font-semibold">Driver On The Way</h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>
 

      {/* Driver Card */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FaUserAlt className="text-blue-600 text-xl" />
            </div>
            <motion.div 
              className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
            </motion.div>
          </div>
          
          <div className="ml-4">
            <h2 className="font-semibold">
              {ride?.captain?.fullname?.firstName} {ride?.captain?.fullname?.lastName}
            </h2>
            <div className="flex items-center mt-1">
              <RiMotorbikeFill className="text-blue-500 mr-1" /> 
              <span className="text-sm">
                {ride?.captain?.vehicle?.color} {ride?.captain?.vehicle?.vehicleType}
              </span>
            </div>
          </div>
        </div>

        {/* Call Button */}
        <a 
          href={`tel:${ride?.captain?.phoneNo}`}
          className="mt-3 flex items-center justify-center gap-2 bg-white text-blue-600 py-2 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
        >
          <FaPhone className="text-blue-600" />
          <span>Call Driver</span>
        </a>
      </div>

      {/* Map Placeholder with Animation */}
      <div className="relative bg-gray-100 rounded-lg h-40 mb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <IoLocation className="text-red-500 text-3xl mx-auto mb-2" />
            <p className="text-gray-600">Live tracking coming soon</p>
          </div>
        </div>
        
        {/* Moving car animation */}
        <motion.div
          className="absolute bottom-4 left-4"
          animate={{ x: 250 }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <RiMotorbikeFill className="text-3xl text-blue-600" />
 
        </motion.div>
      </div>

      {/* Trip Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <IoLocation className="text-gray-500 mr-2" />
            <span className="text-sm">Distance</span>
          </div>
          <span className="font-medium">{ride?.distance} KM</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <IoTime className="text-gray-500 mr-2" />
            <span className="text-sm">ETA</span>
          </div>
          <span className="font-medium">{eta}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <IoTime className="text-gray-500 mr-2" />
            <span className="text-sm">Time Elapsed</span>
          </div>
          <span className="font-medium">{ride?.duration}</span>
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800 text-center">
          Remember to verify the vehicle details before boarding
        </p>
      </div>
    </div>
  );
};

export default DriverOnTheWay;