// src/app/components/activities/ActivitiesCard.jsx
import React from 'react';
import Section from '../Section';
import Card from '../Card';

const ActivitiesCard = () => {
  return (
    <div className="container mx-auto mt-16">
      <Section title="Actividades Deportivas">
        <Card
          title="Fútbol"
          image="/images/futbol.jpg"
          description="Fútbol, Fútbol sala, baloncesto, balonmano, patinaje, tenis, judo, kárate, voleibol, multideporte"
        />
        <Card
          title="Juegos Populares"
          image="/images/juegos-populares.jpg"
          description="Ajedrez, baile, danza, funky, hip-hop, zumba, pilates, yoga"
        />
        {/* Añade más cards según sea necesario */}
      </Section>
      <Section title="Actividades Educativas">
        <Card
          title="Club de Deberes"
          image="/images/deberes.jpg"
          description="Club de deberes"
        />
        <Card
          title="Creatividad y Diversión"
          image="/images/creatividad.jpg"
          description="Creatividad y diversión"
        />
        <Card
          title="Teatro"
          image="/images/teatro.jpg"
          description="Teatro"
        />
        <Card
          title="Robótica"
          image="/images/robotica.jpg"
          description="Robótica"
        />
        <Card
          title="Inglés"
          image="/images/ingles.jpg"
          description="Inglés"
        />
        {/* Añade más cards según sea necesario */}
      </Section>
      <Section title="Actividades para Niños/as con Dificultades de Aprendizaje">
        <Card
          title="Actividades Especializadas"
          image="/images/dificultades-aprendizaje.jpg"
          description="Actividades especializadas para alumnos con dificultades de comprensión y aprendizaje."
        />
        {/* Añade más cards según sea necesario */}
      </Section>
      <div className="flex justify-center space-x-4 my-8">
        <img src="/images/actividades1.jpg" alt="Actividad 1" className="rounded-lg w-1/4" />
        <img src="/images/actividades2.jpg" alt="Actividad 2" className="rounded-lg w-1/4" />
        <img src="/images/actividades3.jpg" alt="Actividad 3" className="rounded-lg w-1/4" />
      </div>
      <Section title="Actividades para Papás y Mamás">
        <Card
          title="Gimnasia"
          image="/images/gimnasia.jpg"
          description="Gimnasia, Zumba, Pilates, Baile"
        />
        <Card
          title="Talleres"
          image="/images/talleres.jpg"
          description="Temas relevantes como resolución de conflictos y primeros auxilios"
        />
      </Section>
      <Section title="Eventos y Actividades Puntuales">
        <Card
          title="Cabalgata de Reyes Magos"
          image="/images/reyes-magos.jpg"
          description="Cabalgata de Reyes Magos del distrito"
        />
        <Card
          title="Fiestas y Eventos"
          image="/images/fiestas-eventos.jpg"
          description="Celebraciones de colegio, Navidad, carnaval, fiestas tradicionales"
        />
        <Card
          title="Excursiones"
          image="/images/excursiones.jpg"
          description="Rutas por la sierra y salidas a actividades lúdicas"
        />
        <Card
          title="Pistas al Aire Libre"
          image="/images/pistas-aire-libre.jpg"
          description="Solicitud de uso para partidos de liga"
        />
      </Section>
    </div>
  );
};

export default ActivitiesCard;
