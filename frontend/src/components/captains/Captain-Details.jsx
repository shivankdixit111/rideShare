import React, { useContext } from 'react';
import { CiTimer, CiWallet, CiStar } from "react-icons/ci";
import { FaCar, FaUserAlt } from "react-icons/fa";
import { userDataContext } from '../../contexts/userContext';
import Loading from '../../pages/Loading';
import { RiMotorbikeFill } from "react-icons/ri";

const CaptainDetails = () => {
  const { currentCaptain } = useContext(userDataContext);

  if (!currentCaptain) {
    return <Loading />;
  }

  // Sample data (replace with actual data from your backend)
  const stats = {
    onlineHours: 9,
    totalEarnings: 295.20,
    rating: 4.8,
    completedRides: 42
  };

  return (
    <div className="w-full h-screen p-4 bg-orange-200 rounded-lg">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <FaUserAlt className="text-gray-600 text-xl" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {currentCaptain.fullname.firstName} {currentCaptain.fullname.lastName}
            </h2>
            <div className="flex items-center text-sm text-gray-500">
               <RiMotorbikeFill />
              <span>
                 &nbsp; {currentCaptain.vehicle?.color} {currentCaptain.vehicle?.vehicleType}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-bold text-lg">₹{stats.totalEarnings.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Total Earnings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-purple-100 p-3 rounded-lg">
          <div className="flex items-center">
            <CiTimer className="text-xl text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Online Time</p>
              <p className="font-semibold">{stats.onlineHours} hours</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-100 p-3 rounded-lg">
          <div className="flex items-center">
            <CiWallet className="text-xl text-green-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Completed Rides</p>
              <p className="font-semibold">{stats.completedRides}</p>
            </div>
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-yellow-100">
          <div className="flex items-center">
            <CiStar className="text-xl text-yellow-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="font-semibold">{stats.rating}/5</p>
            </div>
          </div>
        </div>

        <div className="bg-red-100 p-3 rounded-lg">
          <div className="flex items-center">
            <FaCar className="text-xl text-purple-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Vehicle</p>
              <p className="font-semibold">{currentCaptain.vehicle?.plate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;