
import Navbar from "../../components/Web/navbar/Navbar";

function Contact() {
  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center h-full p-6">
      <div
        className="w-full lg:w-2/3 p-6 bg-white rounded-r-lg flex justify-center items-center"
        style={{ maxWidth: "1000px", minHeight: "100vh" }}
      >
        <div className="flex flex-col lg:flex-row">
          <div
            className="w-full lg:w-1/3 p-8 text-white"
            style={{ backgroundColor: "#3854A6" }}
          >
            <h2 className="text-xl font-semibold mb-4 text-center mt-6">
              Contacto
            </h2>
            <p className="mb-4 p-4">
              Si tienes alguna pregunta o deseas más información sobre nuestras
              actividades, no dudes en contactarnos. ¡Estamos aquí para
              ayudarte!
            </p>
            <div className="flex items-center mt-10 mb-4">
              <svg className="w-6 h-6 mr-2" fill="black" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.051 15.051 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.12-.27c1.12.45 2.33.69 3.57.69.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.48 21 3 13.52 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.24 2.45.69 3.57.14.33.06.72-.27 1.12l-2.2 2.2z"></path>
              </svg>
              <span>7234243424</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="black" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 7.44 7 13 7 13s7-5.56 7-13c0-3.87-3.13-7-7-7zm0 17.1s-5.2-4.85-5.2-10.1C6.8 6.6 9.12 4.5 12 4.5s5.2 2.1 5.2 4.5c0 5.25-5.2 10.1-5.2 10.1zM12 6.5C10.67 6.5 9.6 7.57 9.6 9S10.67 11.5 12 11.5 14.4 10.43 14.4 9 13.33 6.5 12 6.5z"></path>
              </svg>
              <span>Dirección poner una principal por ejemplo</span>
            </div>
          </div>
          <div className="w-full lg:w-2/3 p-6 bg-white rounded-r-lg">
            <form>
              <div className="mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  placeholder="Nombre"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="surname"
                >
                  Apellidos
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="surname"
                  type="text"
                  placeholder="Apellidos"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Correo Electrónico
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  placeholder="Correo Electrónico"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="message"
                >
                  Tu mensaje
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="message"
                  rows="4"
                  placeholder="Tu mensaje"
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  className=" text-black py-2 px-8 rounded"
                  type="submit"
                  style={{ backgroundColor: "#F2E30F" }}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  
    </>
  );
}

export default Contact;
