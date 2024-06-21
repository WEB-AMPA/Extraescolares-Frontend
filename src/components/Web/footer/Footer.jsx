import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-blue-800 text-white">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-screen-xl px-4 py-6 lg:py-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                <a href="/about-us">Sobre Nosotros</a>
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="/contact" className="hover:underline">
                    Contacto
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/centros" className="hover:underline">
                    Centros
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/activities" className="hover:underline">
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
                  <a href="/Privacy-Policy" className="hover:underline">
                    Aviso Legal
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/Privacy-Policy" className="hover:underline">
                    Política de Privacidad
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/Privacy-Policy" className="hover:underline">
                    Política de Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Redes Sociales
              </h2>
              <div className="flex justify-center space-x-4 mt-4">
                <a href="https://www.facebook.com" className="text-white hover:text-gray-400">
                  <FaFacebook className="w-6 h-6" />
                  <span className="sr-only">Facebook page</span>
                </a>
                <a href="https://www.instagram.com" className="text-white hover:text-gray-400">
                  <FaInstagram className="w-6 h-6" />
                  <span className="sr-only">Instagram page</span>
                </a>
                <a href="https://www.twitter.com" className="text-white hover:text-gray-400">
                  <FaTwitter className="w-6 h-6" />
                  <span className="sr-only">Twitter page</span>
                </a>
                <a href="https://www.linkedin.com" className="text-white hover:text-gray-400">
                  <FaLinkedin className="w-6 h-6" />
                  <span className="sr-only">LinkedIn page</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-sm text-gray-300">
            © 2024 Ciudad de los Ángeles. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
