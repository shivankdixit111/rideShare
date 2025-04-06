import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoLocation, IoCall } from "react-icons/io5";
import { FaCar, FaUserAlt, FaPhone } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";

const LookingForDriver = ({ setLookingForDriver, setDriverOnTheWay, ride }) => {
  return (
    <div className="p-3 max-w-md mx-auto">
      <div className="text-center mb-3 flex">
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setLookingForDriver(false)}
        >
          <IoIosArrowDown className="text-2xl mx-auto" />
        </button>
        <h1 className="text-xl font-bold mt-2 ml-[25%]">Your Driver</h1>
      </div>

      {/* Driver Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-3">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
            <FaUserAlt className="text-2xl text-gray-600" />
          </div>
          
          <div className="ml-4">
            <h2 className="text-lg font-semibold">
              {ride?.captain?.fullname?.firstName} {ride?.captain?.fullname?.lastName}
            </h2>
            
            <div className="flex items-center mt-1">
              <FaPhone className="text-gray-500 mr-2" />
              <a 
                href={`tel:${ride?.captain?.phoneNo}`}
                className="text-blue-600 hover:underline"
              >
                {ride?.captain?.phoneNo}
              </a>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center"> 
            <RiMotorbikeFill className="text-gray-600 mr-2" />
            <div>
              <p className="font-medium">
                {ride?.captain?.vehicle?.color} {ride?.captain?.vehicle?.vehicleType}
              </p>
              <p className="text-sm text-gray-600">
                {ride?.captain?.vehicle?.plate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Details Section */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-3">
        <h3 className="font-semibold text-lg mb-3">Ride Details</h3>
        
        <div className="space-y-3">
          {/* Pickup */}
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <IoLocation className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pickup</p>
              <p className="font-medium">{ride?.pickup}</p>
            </div>
          </div>
          
          {/* Destination */}
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <IoLocation className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium">{ride?.destination}</p>
            </div>
          </div>
          
          {/* Fare */}
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <IoLocation className="text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Fare</p>
              <div className="flex justify-between items-center">
                <p className="font-medium">₹{ride?.fare}</p>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Cash</span>
              </div>
            </div>
          </div>
          
          {/* Duration */}
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <IoLocation className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Time</p>
              <p className="font-medium">{ride?.duration}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        className="w-full py-2 mb-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-colors"
        onClick={() => {
          console.log('Ride confirmed');
          setDriverOnTheWay(true);
        }}
      >
        Confirm Ride
      </button>
 
    </div>
  )
}

export default LookingForDriver