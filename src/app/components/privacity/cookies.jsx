import React from 'react';

function CookiePolicy(){
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-5 p-10">
      <h1 className="text-2xl font-bold text-yellow-500">Tecnologías de Seguimiento y Cookies</h1>
      <p className="mb-4">
        Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en Nuestro Servicio y almacenar cierta información. Las tecnologías de seguimiento utilizadas son balizas, etiquetas y scripts para recopilar y rastrear información y mejorar y analizar Nuestro Servicio. Las tecnologías que utilizamos pueden incluir:
      </p>
     
      <h2 className="text-xl font-semibold mb-2"  style={{ color: "#3854A6" }}>Cookies Persistentes o de Sesión</h2>
      <p>Las cookies pueden ser Cookies "Persistentes" o de "Sesión"</p>

      <h3 className="font-semibold mb-2">Cookies necesarias/esenciales</h3>
      <p>Cookies de sesión: Estas cookies son esenciales para brindarle los servicios disponibles a través del sitio web</p>

      <h3 className="font-semibold mb-2">Política de Cookies / Aviso de Aceptación de Cookies</h3>
      <p>Cookies persistentes: Estas Cookies identifican si los usuarios han aceptado el uso de cookies en el Sitio Web</p>

      <h3 className="font-semibold mb-2">Cookies de funcionalidad</h3>
      <p>Cookies Persistentes: Estas cookies nos permiten recordar las elecciones que realiza cuando utiliza el sitio web</p>
    </div>
  );
};

export default CookiePolicy;
