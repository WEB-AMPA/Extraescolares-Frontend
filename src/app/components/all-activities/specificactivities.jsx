

const Specificactivities = () => {
  return (
    <div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-5 mt-3.5 text-base leading-6 text-black max-md:mt-10">
            <div>
              <span className="text-xl font-bold">
                Actividades para Papás y Mamás
              </span>
              <br />
              <ul>
                <li>Cursos: Gimnasia, zumba, pilates, baile.</li>
                <li>
                  Talleres: Temas relevantes como resolución de conflictos y
                  primeros auxilios.
                </li>
              </ul>
            </div>
            <img
              loading="lazy"
              srcSet="..."
              className="mt-20 w-full aspect-[1.49] max-md:mx-2.5 max-md:mt-10"
            />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5 text-base leading-6 text-black max-md:mt-10 max-md:max-w-full">
            <div className="max-md:max-w-full">
              <span className="text-xl font-bold">
                Eventos y Actividades Puntuales
              </span>
              <br />
              <ul>
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
              srcSet="..."
              className="self-center mt-12 max-w-full aspect-[1.45] w-[350px] max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default Specificactivities;