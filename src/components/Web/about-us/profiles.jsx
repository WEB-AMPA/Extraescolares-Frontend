import React from 'react';


const Profiles = () => {
    return (
      <div className="flex flex-wrap justify-around items-center min-h-screen px-4 sm:px-8 md:px-12 lg:px-16 gap-3 m-10">
      <div className="bg-white shadow-md rounded-lg p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col">
        <img src="/profile.jpg" alt="Avatar 1" className="w-32 h-32 object-cover rounded-full mx-auto m-6"/>
        <h2 className="text-center m-3 text-base text-gray-700 font-bold">Juan Pérez</h2>
        <h3 className="text-center text-base text-gray-700 font-semibold">Administradora:</h3>
        <p className='text-base m-5 p-2'>Con pasión, enseña a los adultos principiantes en el arte del fútbol, promoviendo la salud física y el trabajo en equipo.</p>
      </div>
    
      <div className="bg-white shadow-md rounded-lg p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col">
        <img src="/profile.jpg" alt="Avatar 2" className="w-32 h-32 object-cover rounded-full mx-auto m-6"/>
        <h2 className="text-center m-3 text-base text-gray-700 font-bold">María Rodríguez</h2>
        <h3 className="text-center text-base text-gray-700 font-semibold">Monitora:</h3>
        <p className='text-base m-5 p-2'>Con entusiasmo, dirige a los jóvenes en actividades de voluntariado comunitario, fomentando el espíritu de servicio.</p>
      </div>
    
      <div className="bg-white shadow-md rounded-lg p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col">
        <img src="/profile.jpg" alt="Avatar 3" className="w-32 h-32 object-cover rounded-full mx-auto m-6"/>
        <h2 className="text-center m-3 text-base text-gray-700 font-bold">Samanta López</h2>
        <h3 className="text-center text-base text-gray-700 font-semibold">Coordinadora:</h3>
        <p className='text-base m-5 p-2'>Con dedicación, imparte clases de música a niños y adolescentes, ayudándoles a descubrir su talento y amor por la creatividad.</p>
      </div>
    </div>
    

        
        
    );
};
export default Profiles;
