import React from "react";


const NavbarDashboard = () => {
  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 right-0 left-64 z-10 flex justify-between items-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2 border-t-2 border-b-2 border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">Logo</div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative">
  
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">3</span>
        </button>
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default NavbarDashboard;

