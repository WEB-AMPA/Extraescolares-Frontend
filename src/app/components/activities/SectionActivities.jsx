import React from 'react';
import Header from './Header';
import Section from './Section';

const Actividades = () => {
  return (
    <div className="container mx-auto mt-16">
      <Header />
      <div className="bg-purple-100 p-4 flex justify-between flex-wrap">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Section title="Actividades Deportivas" >
            <ul className="list-disc pl-5">
              <li>Fútbol, Fútbol sala, baloncesto, balonmano, patinaje, tenis, judo, kárate, voleibol, multideporte</li>
              <li>Juegos populares, ajedrez, baile, danza, funky, hip-hop, zumba, pilates, yoga</li>
            </ul>
          </Section>
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Section title="Actividades Educativas" >
            <ul className="list-disc pl-5">
              <li>Club de deberes</li>
              <li>Creatividad y diversión</li>
              <li>Teatro</li>
              <li>Robótica</li>
              <li>Inglés</li>
            </ul>
          </Section>
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Section title="Actividades para Niños/as con Dificultades de Aprendizaje" >
            <ul className="list-disc pl-5">
              <li>Actividades especializadas para alumnos con dificultades de comprensión y aprendizaje.</li>
            </ul>
          </Section>
        </div>
      </div>
      <div className="flex justify-center space-x-4 my-8">
        <img src="/images/actividades1.jpg" alt="Actividad 1" className="rounded-lg w-1/4" />
        <img src="/images/actividades2.jpg" alt="Actividad 2" className="rounded-lg w-1/4" />
        <img src="/images/actividades3.jpg" alt="Actividad 3" className="rounded-lg w-1/4" />
      </div>
      <div className="bg-purple-100 p-4 flex justify-between flex-wrap">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Section title="Actividades para Papás y Mamás" className="bg-purple-100">
            <div className="p-4">
              <ul className="list-disc pl-5">
                <li>Gimnasia, Zumba, Pilates, Baile</li>
                <li>Talleres: Temas relevantes como resolución de conflictos y primeros auxilios</li>
              </ul>
            </div>
          </Section>
        </div>
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Section title="Eventos y Actividades Puntuales" className="bg-purple-100">
            <div className="p-4">
              <ul className="list-disc pl-5">
                <li>Cabalgata de Reyes Magos del distrito</li>
                <li>Fiestas y Eventos: Celebraciones de colegio, Navidad, carnaval, fiestas tradicionales</li>
                <li>Excursiones: Rutas por la sierra y salidas a actividades lúdicas</li>
                <li>Pistas al Aire Libre: Solicitud de uso para partidos de liga</li>
              </ul>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Actividades;
