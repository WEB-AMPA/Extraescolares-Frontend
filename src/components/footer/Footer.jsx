function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: "#3854A6" }}>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-screen-xl px-4 py-6 lg:py-8 text-white text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Sobre Nosotros
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Contacto
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Centros
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Actividades
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Información Legal
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Aviso Legal
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Política de Privacidad
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Política de Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Redes Sociales
              </h2>
              <ul className="font-medium">
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="#" className="text-black hover:text-white">
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 8 19"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Facebook page</span>
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
