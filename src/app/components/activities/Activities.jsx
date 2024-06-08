import React, { useState } from 'react';
import Card from './Card';
import Modal from './Modal';

const ActivitiesCard = () => {
  const [modalInfo, setModalInfo] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('Todos');
  const [selectedCenter, setSelectedCenter] = useState('Todos');

  const openModal = (info) => {
    setModalInfo(info);
  };

  const closeModal = () => {
    setModalInfo(null);
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleCenterChange = (e) => {
    setSelectedCenter(e.target.value);
  };

  const activities = [
    {
      title: "Fútbol",
      image: "/activities-images/futbol.webp",
      description: "Participa en nuestros entrenamientos de fútbol y fútbol sala. Contamos con entrenadores cualificados y equipos para todas las edades.",
      extendedDescription: "Participa en nuestros entrenamientos de fútbol y fútbol sala. Contamos con entrenadores cualificados y equipos para todas las edades.",
      schedules: "Lunes y Miércoles 16:00 - 18:00",
      groups: "Niños (6-10 años), Adolescentes (11-15 años)",
      theme: "Deportivas",
      center: "CEIP Barcelona"
    },
    {
      title: "Patinaje",
      image: "/activities-images/patinaje.webp",
      description: "Clases de patinaje para desarrollar el equilibrio y la coordinación en un entorno seguro.",
      extendedDescription: "Aprende a patinar con nosotros. Ofrecemos clases para principiantes y avanzados.",
      schedules: "Martes y Jueves 17:00 - 19:00",
      groups: "Niños (6-10 años), Adolescentes (11-15 años)",
      theme: "Deportivas",
      center: "IES Ciudad de los Ángeles"
    },
    {
      title: "Club de Deberes",
      image: "/activities-images/deberes.webp",
      description: "Un espacio donde los niños pueden hacer sus deberes con la ayuda de monitores.",
      extendedDescription: "Un espacio donde los niños pueden hacer sus deberes con la ayuda de monitores.",
      schedules: "Lunes a Viernes 15:00 - 17:00",
      groups: "Niños (6-12 años)",
      theme: "Educativas",
      center: "CEIP Ciudad de los Ángeles"
    },
    {
      title: "Baile y Diversión",
      image: "/activities-images/baile.jpg",
      description: "Una actividad que combina baile y juegos para que los niños se diviertan mientras hacen ejercicio.",
      extendedDescription: "Clases de baile moderno y actividades lúdicas para todas las edades.",
      schedules: "Viernes 16:00 - 18:00",
      groups: "Niños (6-12 años), Adolescentes (13-17 años)",
      theme: "Creativas",
      center: "CEIP Barcelona"
    },
    {
      title: "Baloncesto",
      image: "/activities-images/baloncesto.jpg",
      description: "Entrenamientos de baloncesto para diferentes niveles y edades.",
      extendedDescription: "Entrenamientos de baloncesto para diferentes niveles y edades.",
      schedules: "Lunes y Miércoles 18:00 - 20:00",
      groups: "Niños (8-12 años), Adolescentes (13-17 años)",
      theme: "Deportivas",
      center: "IES Ciudad de los Ángeles"
    },
    {
      title: "Voleibol",
      image: "/activities-images/voley.jpg",
      description: "Clases de voleibol para principiantes y avanzados.",
      extendedDescription: "Clases de voleibol para principiantes y avanzados.",
      schedules: "Martes y Jueves 16:00 - 18:00",
      groups: "Niños (8-12 años), Adolescentes (13-17 años)",
      theme: "Deportivas",
      center: "CEIP Ciudad de los Ángeles"
    },
    {
      title: "Inglés",
      image: "/activities-images/ingles.webp",
      description: "Clases de inglés para mejorar tus habilidades lingüísticas",
      extendedDescription: "Clases de inglés para mejorar tus habilidades lingüísticas.",
      schedules: "Lunes a Viernes 17:00 - 19:00",
      groups: "Niños (6-12 años), Adolescentes (13-17 años)",
      theme: "Educativas",
      center: "CEIP Barcelona"
    },
    {
      title: "Creatividad y Diversión",
      image: "/activities-images/dibujo.webp",
      description: "Actividades creativas para estimular la imaginación y la expresión artística de los niños.",
      extendedDescription: "Talleres de creatividad y actividades divertidas para estimular la imaginación.",
      schedules: "Sábados 10:00 - 12:00",
      groups: "Niños (6-12 años)",
      theme: "Creativas",
      center: "IES Ciudad de los Ángeles"
    }
  ];

  const filteredActivities = activities.filter(activity =>
    (selectedTheme === 'Todos' || activity.theme === selectedTheme) &&
    (selectedCenter === 'Todos' || activity.center === selectedCenter)
  );

  return (
    
   <div className="container mx-auto mt-16 px-4 md:px-8 lg:px-16 mb-24">
      <h2 className="text-center text-3xl font-bold mb-8">Nuestras Actividades</h2>

      <div className="mb-8 flex flex-col md:flex-row items-center">
        <div className="flex flex-col md:flex-row items-center space-x-4 mb-4 md:mb-0">
          <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2">Centro</h3>
            <select
              value={selectedCenter}
              onChange={handleCenterChange}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-sm w-full md:w-auto"
            >
              <option value="Todos">Todos</option>
              <option value="CEIP Barcelona">CEIP Barcelona</option>
              <option value="IES Ciudad de los Ángeles">IES Ciudad de los Ángeles</option>
              <option value="CEIP Ciudad de los Ángeles">CEIP Ciudad de los Ángeles</option>
            </select>
          </div>

          <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2">Tipo Actividad</h3>
            <select
              value={selectedTheme}
              onChange={handleThemeChange}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-sm w-full md:w-auto"
            >
              <option value="Todos">Todos</option>
              <option value="Deportivas">Deportivas</option>
              <option value="Educativas">Educativas</option>
              <option value="Creativas">Creativas</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity, index) => (
          <Card
            key={index}
            title={activity.title}
            image={activity.image}
            description={activity.description}
            onClick={() => openModal(activity)}
          />
        ))}
      </div>
      {modalInfo && (
        <Modal info={modalInfo} onClose={closeModal} />
      )}
    </div>
  );
};

export default ActivitiesCard;