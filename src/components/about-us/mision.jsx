import React from 'react';

const Mision = () => {
    return (
        <div className="mission-card-container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 p-8 bg-purple-100">
            <div className="flex flex-col items-center md:flex-row p-3">
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Nuestra Misión</h2>
                    <p className="text-sm leading-relaxed mb-4 p-5">
                        El deporte moviliza emociones y sentimientos, y puede influir en las actitudes y comportamientos de las personas a través de los valores que transmite: esfuerzo, superación, perseverancia, igualdad, respeto, deportividad, solidaridad, compañerismo, éxito personal y colectivo, entre otros muchos. Esos valores son muy importantes en el desarrollo de los niños y los adolescentes. Desde el Club Deportivo Ciudad de los Ángeles, nos centramos en fomentar esos valores desde la igualdad, independientemente de las condiciones físicas.
                    </p>
                </div>
                <div>
                    <img src="/mision.jpg" alt="mision" className="h-50"/>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold mt-8 text-center p-3">"Ofrecemos una propuesta educo-deportiva, donde nuestro pilar fundamental es aportar los valores del deporte a la educación de nuestros alumnos"</h3>
            </div>
        </div>
    );
};

export default Mision;
