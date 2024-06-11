import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCookieBite } from "react-icons/fa";

const ModalCookies = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="text-sm fixed bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 max-h-[80vh] mx-auto bg-gray-100 rounded-lg shadow-lg p-5 space-y-4 border z-50">
          <h3 className="flex justify-center gap-5 text-xl text-center font-semibold mb-4">Utilizamos Cookies
            <FaCookieBite className='text-yellow-500' /></h3>
          <p className='p-3 m-5'>Utilizamos cookies y tecnologías de seguimiento similares para analizar su navegación y ofrecerle un servicio más personalizado acorde a sus intereses. Continuar navegando implica la aceptación de nuestra Política de Cookies.</p>
          <div className="flex justify-center gap-8">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={() => setIsOpen(false)}
            >
              Aceptar
            </button>
            <button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={() => setIsOpen(false)}
            >
              Rechazar
            </button>
          </div>
          <Link
            to="/Privacy-Policy"
            rel="noopener noreferrer"
            className="flex justify-center mt-4 underline decoration-yellow-500 hover:underline-offset-1 transition-all duration-200 ease-in-out"
          >
            Más información
          </Link>
        </div>
      )}
    </>
  );
};

export default ModalCookies;
