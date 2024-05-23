import "./activities.css";
import img1 from "../../../../public/actividad1.png";
import img2 from "../../../../public/actividad2.png";
import img3 from "../../../../public/actividad3.png";

function Activities() {
  return (
    <section
      className="text-black"
      style={{ backgroundColor: "rgba(133, 82, 242, 0.14)" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold sm:text-4xl">
            Actividades Extraescolares
          </h1>
          <p className="mt-6 text-2xl">
            Ofrecemos una amplia variedad de actividades extraescolares
            diseñadas para enriquecer el desarrollo integral de nuestros
            estudiantes. Estas actividades se agrupan en tres categorías
            principales
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 text-center">
          <a className="block p-8">
            <h2 className="mt-4 text-xl font-bold mb-5">
              Actividades
              <br />
              Deportivas
            </h2>
            <div className="image-container border-deportivas">
              <img src={img1} alt="Actividades Deportivas" />
            </div>
          </a>
          <a className="block p-8">
            <h2 className="mt-4 text-xl font-bold mb-5">
              Actividades
              <br />
              Artísticas
            </h2>
            <div className="image-container border-artisticas">
              <img src={img2} alt="Actividades Artísticas" />
            </div>
          </a>
          <a className="block p-8">
            <h2 className="mt-4 text-xl font-bold mb-5">
              Actividades
              <br />
              Educativas
            </h2>
            <div className="image-container border-educativas">
              <img src={img3} alt="Actividades Educativas" />
            </div>
          </a>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="bg-button hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
          Ver más actividades
        </button>
      </div>
    </section>
  );
}

export default Activities;
