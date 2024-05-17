import "./activities.css";

function Activities() {
  return (
    <section className="bg-custom-yellow text-white ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-4xl font-bold sm:text-4xl">
            Actividades Extraescolares
          </h1>

          <p className="mt-4 text-white-300 font-bold">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae aperiam
            fugit consequuntur saepe laborum.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <a
            className="block rounded-xl p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            href="#"
          >
            <h2 className="mt-4 text-xl font-bold text-white mb-5">
              CEIP Ciudades de los Angeles
            </h2>

            <img src="../../../../public/hero2.png" alt="" />
          </a>
          <a
            className="block rounded-xl p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            href="#"
          >
            <h2 className="mt-4 text-xl font-bold text-white mb-5">
              CEIP BARCELONA
            </h2>

            <img src="../../../../public/hero2.png" alt="" />
          </a>
          <a
            className="block rounded-xl p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            href="#"
          >
            <h2 className="mt-4 text-xl font-bold text-white mb-5">
              IES Ciudades de los Angeles
            </h2>
            <img src="../../../../public/hero2.png" alt="" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Activities;
