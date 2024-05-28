import img1 from '../../../../public/hero1.png';
import img2 from '../../../../public/hero1.png';
import img3 from '../../../../public/hero1.png';


function Centros() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Nuestros Centros</h1>
        </div>
        <div className="mt-8 space-y-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <img src={img1} alt="CEIP Ciudad de los Ángeles" className="w-full rounded-lg" />
              <p className="mt-4 text-gray-500 dark:text-gray-400">Dirección: No se cual era</p>
            </div>
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">CEIP Ciudad de los Ángeles</h2>
              <ul className="list-disc ml-5 space-y-2">
                <li>Fútbol Sala: Diversos equipos según la edad y el nivel.</li>
                <li>Natación: Clases de natación para todas las edades.</li>
                <li>Patinaje: Aprendizaje y perfeccionamiento para infantil y primaria.</li>
                <li>Baloncesto: Entrenamiento y partidos para diferentes edades.</li>
                <li>Teatro: Actividades teatrales para desarrollar habilidades artísticas.</li>
                <li>Pintura: Clases de pintura para todas las edades.</li>
              </ul>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="order-last lg:order-first">
              <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">CEIP Barcelona</h2>
                <ul className="list-disc ml-5 space-y-2">
                  <li>Fútbol Sala: Introducción y perfeccionamiento.</li>
                  <li>Inglés: Clases para mejorar habilidades lingüísticas.</li>
                  <li>Natación: Niveles desde iniciación hasta avanzado.</li>
                  <li>Patinaje: Técnicas y seguridad en patinaje.</li>
                  <li>Voley: Entrenamientos y competiciones.</li>
                </ul>
              </div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Dirección: No se cual era</p>
            </div>
            <div>
              <img src={img2} alt="CEIP Barcelona" className="w-full rounded-lg" />
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <img src={img3} alt="IES Ciudad de los Ángeles" className="w-full rounded-lg" />
              <p className="mt-4 text-gray-500 dark:text-gray-400">Dirección: No se cual era</p>
            </div>
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">IES Ciudad de los Ángeles</h2>
              <ul className="list-disc ml-5 space-y-2">
                <li>Voleibol: Equipos para todas las edades.</li>
                <li>Pilates: Clases para mejorar la flexibilidad y fuerza.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Centros;
