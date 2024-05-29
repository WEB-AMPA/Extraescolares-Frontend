

const Specificactivities = () => {
  return (
    <div>
      <div className="mt-10 flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-5 mt-3.5 text-base leading-6 text-black max-md:mt-10">
            <div className="text-center">
              <span className=" text-xl font-bold">
                Actividades para Papás y Mamás
              </span>
              <br />
              <ul className="list-disc list-inside">
                <li>Cursos: Gimnasia, zumba, pilates, baile.</li>
                <li>
                  Talleres: Temas relevantes como resolución de conflictos y
                  primeros auxilios.
                </li>
              </ul>
            </div>
            <img
              loading="lazy"
              srcSet="/Pilates.png"
              className="self-center mt-20 w-[250px] h-[150px] aspect-[1.45] max-md:mx-2.5 max-md:mt-10"
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5 text-base leading-6 text-black max-md:mt-10 max-md:max-w-full">
            <div className="text-center max-md:max-w-full">
              <span className="text-xl font-bold">
                Eventos y Actividades Puntuales
              </span>
              <br />
              <ul className="list-disc list-inside">
                <li>Cabalgata de Reyes Magos del distrito</li>
                <li>
                  Fiestas y Eventos: Celebraciones de colegio, Navidad,
                  carnaval, fiestas tradicionales.
                </li>
                <li>
                  Excursiones: Rutas por la sierra y salidas a actividades
                  lúdicas.
                </li>
                <li>
                  Pistas al Aire Libre: Solicitud de uso para partidos de liga.
                </li>
              </ul>
            </div>
            <img
              loading="lazy"
              srcSet="/actividadespuntuales.png"
              className="self-center mt-12 mb-10 w-[250px] h-[150px] aspect-[1.45] max-md:mx-2.5 max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default Specificactivities;