import React from 'react';

function AboutUs() {
    return (
        <section className="about-us-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-wrap justify-center gap-4">

            <h1 className="text-4xl font-bold mb-4 text-center">QUIENES SOMOS</h1>
            <div className="flex justify-center w-full p-5">
                <img src="/qs.jpg" alt="img" className="w-full h-64 object-cover rounded-lg shadow-md" />
            </div>
             
                <div className="bg-gray-300 shadow-md rounded-lg p-8 w-full md:w-1/2 lg:w-1/2 transform hover:-translate-y-1 transition-transform duration-200 ease-in-out">
                    <h3 className="text-ml font-semibold mb-4 text-center">Bienvenidos a nuestra plataforma</h3>
                    <p className='text-sm m-2 p-2'>El Club Deportivo Ciudad de los Ángeles se fundó en 2003 para ofrecer propuestas deportivas en el barrio de Ciudad de los Ángeles. En 2012, ampliamos nuestras actividades a la gestión de actividades extraescolares en el CEIP Ciudad de los Ángeles. A lo largo de 11 años, hemos trabajado con los estudiantes del colegio, fomentando valores fundamentales como el compañerismo y el respeto. Satisfechos con los resultados, continuamos nuestro compromiso de promover estos valores a través del deporte en el barrio.
                   <br/> Nuestros coordinadores cuentan con más de 40 años de experiencia en actividades extraescolares, garantizando una formación integral y de calidad. Nuestro objetivo es proporcionar un espacio inclusivo donde cada número de socio se asocie directamente a una familia, permitiendo a múltiples estudiantes participar en una amplia gama de actividades recreativas y educativas. Estas actividades abarcan desde deportes colectivos como fútbol sala y baloncesto, hasta prácticas culturales y creativas como baile, pilates y club de deberes, asegurando una experiencia variada y enriquecedora para todos nuestros miembros.</p>
                </div>

             
                <div className="bg-gray-300  shadow-md rounded-lg p-8 m-5 w-full md:w-1/2 lg:w-1/2 transform hover:-translate-y-1 transition-transform duration-200 ease-in-out">
                <h3 className="text-ml font-semibold mb-4 text-center">Nuestra Misión</h3>
                    <p className='text-sm m-2 p-2'>Nuestra misión es complementar la educación y formación de los escolares en los tiempos no lectivos, ofreciendo actividades extraescolares lúdicas, formativas y deportivas que se adapten a las necesidades, intereses, gustos y aficiones de los menores. Buscamos ser un espacio inclusivo y accesible para todas las familias, promoviendo el desarrollo integral de nuestros jóvenes miembros a través de una variedad de actividades que combinan educación y diversión, colaborando activamente en su educación y fomentando valores humanos y éticos.</p>
                </div>

                <div className="bg-gray-300  shadow-md rounded-lg p-8 m-5 w-full md:w-1/2 lg:w-1/2 transform hover:-translate-y-1 transition-transform duration-200 ease-in-out">
                    <h3 className="text-ml font-semibold mb-4 text-center">Nuestra Visión</h3>
                    <p className='text-sm m-2 p-2'>Nuestra visión es ser reconocida como una organización líder en servicios educacionales y recreativos en la Ciudad de Los Ángeles, destacándonos por nuestra capacidad para adaptarnos a las necesidades cambiantes de la comunidad y por nuestro compromiso con la calidad y la innovación en el diseño de actividades que beneficien tanto a los niños como a sus familias. Aspiramos a ser un modelo de excelencia en la integración de la educación y el ocio, contribuyendo significativamente al desarrollo personal y social de los jóvenes de nuestra región. Estas declaraciones reflejan nuestro compromiso con la educación integral, la inclusión y la diversión, buscando siempre mejorar nuestros servicios y ofrecer experiencias memorables que marquen positivamente la vida de nuestros estudiantes.</p>
                </div> 
            
                <div className="bg-gray-300  shadow-md rounded-lg p-8 m-5 w-full md:w-1/2 lg:w-1/2 transform hover:-translate-y-1 transition-transform duration-200 ease-in-out">

                <h3 className="text-ml font-semibold mb-4 text-center">Nuestras Actividades Extra-Escolares</h3>
                    <ul className='text-sm m-2 p-2'>
                        <li className='m-2'>
                            <p className='font-semibold'>Fútbol Sala:</p> Una excelente manera de desarrollar habilidades motoras y trabajo en equipo.</li>

                        <li className='m-2'>
                            <p className='font-semibold'> Multideporte:</p> Un programa integral que combina varias disciplinas deportivas.</li>
                        <li className='m-2'>
                            <p className='font-semibold'>Baile y Diversión:</p> Actividades que promueven la expresión artística y el disfrute.</li>
                        <li className='m-2'>
                            <p className='font-semibold'>Baloncesto:</p> Para aquellos interesados en mejorar sus habilidades de baloncesto.</li>
                        <li className='m-2'>
                            <p className='font-semibold'>Club de Deberes:</p> Ayuda a mantener organizadas las tareas escolares.</li>
                        <li className='m-2'>
                            <p className='font-semibold'>Creatividad y Diversión:</p> Sesiones diseñadas para estimular la imaginación y el pensamiento crítico.</li>
                        <li className='m-2'>
                            <p className='font-semibold'>Pilates:</p> Beneficioso tanto para adultos como para niños mayores, ayudando a fortalecer el cuerpo y la mente.</li>
                        <li className='m-2'>
                            <p className='font-semibold'>Inglés Primaria:</p> Programa enfocado en mejorar las habilidades lingüísticas de los estudiantes.</li>
                        <li className='m-2'>
                            <p className='font-semibold'>Patinaje: </p> Una actividad divertida y saludable para todos los niveles.</li>
                        <li className='m-2'>
                            <p className='font-semibold'>Voleibol:</p> Oportunidad para aprender y practicar voleibol en diferentes categorías de edad.</li>
                    </ul>
                </div>

             
                <div className="bg-gray-300  shadow-md rounded-lg p-8 w-full md:w-1/2 lg:w-1/2 transform hover:-translate-y-1 transition-transform duration-200 ease-in-out text-center">
                    <h3 className="text-ml font-semibold mb-4">Nuestros Precios</h3>
                    <ul className='text-sm '>
                        <li>Un día: 15 euros</li>
                        <li>Dos días: 25 euros</li>
                        <li>Cuatro días: 40 euros</li>
                        <li>Mensuales</li>
                        <li>Diarios</li>
                        <li>Bonos de 10</li>
                        <li>Descuento por familia numerosa</li>
                    </ul>
                
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
