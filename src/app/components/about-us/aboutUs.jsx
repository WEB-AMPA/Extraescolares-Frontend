import React from 'react';

const AboutUs = () => {
    return (
        <div className="about-us-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center md:justify-between">
            <div className="md:w-1/2 flex justify-center">
                <img src="/about-us.jpg" alt="Club Deportivo Ciudad de los Ángeles" className="object-cover h-auto" />
            </div>

            <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-semibold mb-6 text-center">¿Quiénes Somos?</h2>
                <p className="text-sm leading-[22.221px] mb-4">
                    El Club Deportivo Ciudad de los Ángeles se fundó en 2003 para ofrecer propuestas deportivas en el barrio de Ciudad de los Ángeles. En 2012, ampliamos nuestras actividades a la gestión de actividades extraescolares en el CEIP Ciudad de los Ángeles.
                    A lo largo de 11 años, hemos trabajado con los estudiantes del colegio, fomentando valores fundamentales como el compañerismo y el respeto. Satisfechos con los resultados, continuamos nuestro compromiso de promover estos valores a través del deporte en el barrio.
                </p>
                <p className="text-sm leading-[22.221px] mb-4">
                    Nuestros coordinadores cuentan con más de 40 años de experiencia en actividades extraescolares, garantizando una formación integral y de calidad. Nuestro objetivo es proporcionar un espacio inclusivo donde cada número de socio se asocie directamente a una familia, permitiendo a múltiples estudiantes participar en una amplia gama de actividades recreativas y educativas.
                    Estas actividades abarcan desde deportes colectivos como fútbol sala y baloncesto, hasta prácticas culturales y creativas como baile, pilates y club de deberes, asegurando una experiencia variada y enriquecedora para todos nuestros miembros.
                </p>
            </div>
        </div>

    );
};

export default AboutUs;