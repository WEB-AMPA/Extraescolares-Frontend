import "./activities.css";
import img1 from '../../../../public/actividad1.png';
import img2 from '../../../../public/actividad2.png';
import img3 from '../../../../public/actividad3.png';

function Activities() {
  return (
    <section className="activities-section bg-purple-light text-black py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold sm:text-4xl">Actividades Extraescolares</h1>
          <p className="mt-6 text-1xl">
            Ofrecemos una amplia variedad de actividades extraescolares
            diseñadas para enriquecer el desarrollo integral de nuestros
            estudiantes. Estas actividades se agrupan en tres categorías
            principales
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3 text-center">
          <div className="activity-card">
            <h2 className="text-xl font-bold mb-5">
              Actividades <br /> Deportivas
            </h2>
            <div className="image-container border-deportivas">
              <img src={img1} alt="Actividades Deportivas" className="activity-image" />
            </div>
          </div>
          <div className="activity-card">
            <h2 className="text-xl font-bold mb-5">
              Actividades <br /> Artísticas
            </h2>
            <div className="image-container border-artisticas">
              <img src={img2} alt="Actividades Artísticas" className="activity-image" />
            </div>
          </div>
          <div className="activity-card">
            <h2 className="text-xl font-bold mb-5">
              Actividades <br /> Educativas
            </h2>
            <div className="image-container border-educativas">
              <img src={img3} alt="Actividades Educativas" className="activity-image" />
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            Descúbrelo
          </button>
        </div>
      </div>
    </section>
  );
}

export default Activities;
