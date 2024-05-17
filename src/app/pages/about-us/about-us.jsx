import React from 'react';

function AboutUs() {
    return (
        <section className="about-us-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-center">
                <img src="/ruta/a/tu/imagen.jpg" alt="Actividades Extraescolares" className="w-full h-64 object-cover rounded-lg shadow-md" />
            </div>
            <article className="mt-16 text-center">
                <h1>Bienvenidos a nuestra plataforma dedicada a las actividades extra-escolares en la Ciudad de Los Ángeles.</h1>
                <p>Nuestro objetivo es proporcionar un espacio inclusivo donde cada número de socio se asocie directamente a una familia, permitiendo a múltiples estudiantes participar en una amplia gama de actividades recreativas y educativas. Estas actividades abarcan desde deportes colectivos como fútbol sala y baloncesto, hasta prácticas culturales y creativas como baile, pilates y club de deberes, asegurando una experiencia variada y enriquecedora para todos nuestros miembros.</p>
                <ul>
                    <li>Fútbol Sala: Una excelente manera de desarrollar habilidades motoras y trabajo en equipo.</li>
                    <li>Multideporte: Un programa integral que combina varias disciplinas deportivas.</li>
                    <li>Baile y Diversión: Actividades que promueven la expresión artística y el disfrute.</li>
                    <li>Baloncesto: Para aquellos interesados en mejorar sus habilidades de baloncesto.</li>
                    <li>Club de Deberes: Ayuda a mantener organizadas las tareas escolares.</li>
                    <li>Creatividad y Diversión: Sesiones diseñadas para estimular la imaginación y el pensamiento crítico.</li>
                    <li>Pilates: Beneficioso tanto para adultos como para niños mayores, ayudando a fortalecer el cuerpo y la mente.</li>
                    <li>Inglés Primaria: Programa enfocado en mejorar las habilidades lingüísticas de los estudiantes.</li>
                    <li>Patinaje: Una actividad divertida y saludable para todos los niveles.</li>
                    <li>Voleibol: Oportunidad para aprender y practicar voleibol en diferentes categorías de edad.</li>
                </ul>
                <p>Además, contamos con monitores y coordinadores especializados para garantizar un ambiente seguro y productivo en nuestros tres centros. Los socios pueden autenticarse mediante su número de socio y crear perfiles detallados con información relevante sobre cada niño o niña, incluyendo alergias, enfermedades y preferencias personales. Este sistema permite una evaluación personalizada y feedback constructivo para cada estudiante.</p>
                <ul>
                    <li>Un día: 15 euros</li>
                    <li>Dos días: 25 euros</li>
                    <li>Cuatro días: 40 euros</li>
                </ul>
                <ul>
                    <li>Mensuales</li>
                    <li>Diarios</li>
                    <li>Bonos de 10</li>
                    <li>Descuento por familia numerosa</li>
                </ul>
                <p>Nos comprometemos a brindar una experiencia excepcional a través de nuestro servicio, promoviendo el desarrollo integral de nuestros jóvenes miembros mientras disfrutan de actividades que les encantarán.</p>
                <h2 className="text-3xl font-bold mb-4">Misión</h2>
                <p>Nuestra misión es complementar la educación y formación de los escolares en los tiempos no lectivos, ofreciendo actividades extraescolares lúdicas, formativas y deportivas que se adapten a las necesidades, intereses, gustos y aficiones de los menores. Buscamos ser un espacio inclusivo y accesible para todas las familias, promoviendo el desarrollo integral de nuestros jóvenes miembros a través de una variedad de actividades que combinan educación y diversión, colaborando activamente en su educación y fomentando valores humanos y éticos.</p>
                <h2 className="text-3xl font-bold mt-8 mb-4">Visión</h2>
                <p>Nuestra visión es ser reconocida como una organización líder en servicios educacionales y recreativos en la Ciudad de Los Ángeles, destacándonos por nuestra capacidad para adaptarnos a las necesidades cambiantes de la comunidad y por nuestro compromiso con la calidad y la innovación en el diseño de actividades que beneficien tanto a los niños como a sus familias. Aspiramos a ser un modelo de excelencia en la integración de la educación y el ocio, contribuyendo significativamente al desarrollo personal y social de los jóvenes de nuestra región. Estas declaraciones reflejan nuestro compromiso con la educación integral, la inclusión y la diversión, buscando siempre mejorar nuestros servicios y ofrecer experiencias memorables que marquen positivamente la vida de nuestros estudiantes.</p>
            </article>
        </section>
    );
};

export default AboutUs;
