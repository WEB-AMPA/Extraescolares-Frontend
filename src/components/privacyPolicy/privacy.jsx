import React from 'react';

function Privacy(){
  return (
    <div className="flex flex-col gap-5 p-10">
      <h1 className="text-center text-2xl font-bold text-yellow-500">Recopilación y uso de sus datos personales</h1>
     
      <h2 className="text-center text-xl font-semibold mb-2"  style={{ color: "#3854A6" }}>Tipos de datos recopilados</h2>

      <h3 className="font-semibold mb-2">Información personal</h3>
      <p>Al utilizar nuestro servicio, podemos pedirle que nos proporcione cierta información de identificación personal que pueda usarse para contactarlo o identificarlo. La información de identificación personal puede incluir, entre otras:</p>
      <ul>
        <li>Dirección de correo electrónico</li>
        <li>Nombre y apellido</li>
        <li>Número de teléfono</li>
        <li>Datos de uso</li>
      </ul>

      <h3 className="font-semibold mb-2">Datos de Uso</h3>
      <p>Los datos de uso se recopilan automáticamente cuando se utiliza el Servicio.
Los datos de uso pueden incluir información como la dirección de protocolo de Internet de su dispositivo (por ejemplo, dirección IP), tipo de navegador, versión del navegador, las páginas de nuestro Servicio que visita, la hora y fecha de su visita, el tiempo dedicado a esas páginas, dispositivo único identificadores y otros datos de diagnóstico.
Cuando accede al Servicio mediante o a través de un dispositivo móvil, podemos recopilar cierta información automáticamente, incluido, entre otros, el tipo de dispositivo móvil que utiliza, la identificación única de su dispositivo móvil, la dirección IP de su dispositivo móvil, su sistema operativo, el tipo de navegador de Internet móvil que utiliza, identificadores únicos de dispositivo y otros datos de diagnóstico.
También podemos recopilar información que su navegador envía cada vez que visita nuestro Servicio o cuando accede al Servicio mediante un dispositivo móvil.</p>
    </div>
  );
};

export default Privacy;
