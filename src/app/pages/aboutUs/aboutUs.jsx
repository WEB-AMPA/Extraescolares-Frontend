import img from "../../../../public/hero3.png";

function AboutUs() {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold sm:text-4xl">¿Quienes somos?</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-96 overflow-hidden sm:h-96 lg:h-full">
            <img
              alt=""
              src={img}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="lg:py-16">
            <article className="space-y-4 text-black">
              <p>
                El Club Deportivo Ciudad de los Ángeles se fundó en 2003 para
                ofrecer propuestas deportivas en el barrio de Ciudad de los
                Ángeles. En 2012, ampliamos nuestras actividades a la gestión de
                actividades extraescolares en el CEIP Ciudad de los Ángeles. A
                lo largo de 11 años, hemos trabajado con los estudiantes del
                colegio, fomentando valores fundamentales como el compañerismo y
                el respeto. Satisfechos con los resultados, continuamos nuestro
                compromiso de promover estos valores a través del deporte en el
                barrio. Nuestros coordinadores cuentan con más de 40 años de
                experiencia en actividades extraescolares, garantizando una
                formación integral y de calidad.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
  