import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCookieBite } from "react-icons/fa";

const ModalCookies = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg p-6 space-y-4 border">
          <h3 className="flex justify-center gap-5 text-lg text-center font-semibold mb-4 p-2">Utilizamos Cookies
            <FaCookieBite className='text-yellow-500' /></h3>
          <p className='p-3 m-5'>Utilizamos cookies y tecnologías de seguimiento similares para analizar su navegación y ofrecerle un servicio más personalizado acorde a sus intereses. Continuar navegando implica la aceptación de nuestra Política de Cookies.</p>
          <div className="flex justify-center gap-2 p-3">
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
            to="/Politica-privacity"
            target="_blank"
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
