import React from 'react';
import logo from '/logo.png'; // Asegúrate de que la ruta del logo es correcta

const IntranetStart = () => {
  return (
    <div className="hero min-h-screen flex items-center justify-center -mt-16"> {/* Añadir margen negativo superior */}
      <div className="text-center p-8 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn">
        <img 
          src={logo} 
          alt="Logo" 
          className="mx-auto mb-10 w-[15rem] h-[11rem] animate__animated animate__bounceInDown"
        />
        <h2 className="mb-5 text-4xl font-bold">Bienvenida a la Intranet</h2>
        <h3 className="mb-5 text-5xl font-bold text-[#293CA6]">Actividades Extraescolares Ciudad de los Ángeles</h3>
        <p className="mb-10 text-gray-700">Aquí puedes gestionar las actividades, ver las asistencias, editar los usuarios y mucho más. <br/> Explora nuestras funcionalidades y aprovecha al máximo nuestros servicios.</p>
      </div>
    </div>
  );
};

export default IntranetStart;
