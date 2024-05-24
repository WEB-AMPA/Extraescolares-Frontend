import React from 'react';
import { FaLinkedinIn } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";


const Profiles = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
            <img src="/profile.jpg" alt="Avatar" className="w-32 h-32 object-cover rounded-full mx-auto m-6"/>
            <h2 className="text-center m-3 text-base text-gray-700 font-bold">Alejandra Gutierrez</h2>
            <h3 className="text-center text-base text-gray-700 font-semibold">Monitora:</h3>
            <p className='text-base m-5 p-2'>Con cariño y alegría, guía a los niños en el yoga, creando un ambiente divertido y seguro para aprender y crecer.</p>
            <div className="flex justify-center m-3">
              <a href="*" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-400 text-white rounded hover:bg-orange-100 transition duration-200 order-2 text-base flex justify-between">
              Descarga mi CV
              <CiSaveDown2 className='flex justify-center m-1'/>
              </a>
              <a href="*" target="_blank" rel="noopener noreferrer" className="px-4 py-3 mr-6 bg-blue-500 text-white rounded hover:bg-orange-100 transition duration-200 order-1">
                <FaLinkedinIn />
              </a> 
            </div>
          </div>
        </div>
    );
};
export default Profiles;
