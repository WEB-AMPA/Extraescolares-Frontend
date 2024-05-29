

const Classification = () => {
  return (
    <div className="px-6 pt-12 pb-20 bg-violet-500 bg-opacity-30 max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 ">
        <div className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
          <div className="text-base leading-6 text-black">
            <span className="text-xl font-bold">Actividades Deportivas</span>
            <br />
            <ul>
              <li>
                Fútbol, fútbol sala, baloncesto, balonmano, patinaje, tenis,
                judo, kárate, voleibol, multideporte
              </li>
              <li>
                Juegos populares, ajedrez, baile, danza, funky, hip-hop, zumba,
                pilates, yoga
              </li>
            </ul>
            <br />
            <br />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
          <div className="text-base leading-6 text-black">
            <br />
            <span className="text-xl font-bold">Actividades Educativas</span>
            <br />
            <ul>
              <li>Club de deberes.</li>
              <li>Creatividad y diversión.</li>
              <li>Teatro.</li>
              <li>Robótica.</li>
              <li>Inglés.</li>
            </ul>
            <br />
            <br />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
          <div className="text-base leading-6 text-black">
            <br />
            <br />
            <span className="text-xl font-bold">
              Actividades para Niños/as con Dificultades de Aprendizaje
            </span>
            <br />
            <ul>
              <li>
                Actividades especializadas para alumnos con dificultades de
                comprensión y aprendizaje.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classification;
