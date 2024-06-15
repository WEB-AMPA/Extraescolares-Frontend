import React from 'react';
import logo from '../../../../public/logo.png'; // Asegúrate de que esta ruta sea correcta

function Navbar() {
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50 py-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 30 30"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a href="/" className="font-bold">INICIO</a></li>
            <li><a href="/about-us" className="font-semibold">QUIENES SOMOS</a></li>
            <li><a href="/activities" className="font-semibold">ACTIVIDADES</a></li>
            <li><a href="/centros" className="font-semibold">CENTROS</a></li>
            <li><a href="/contact" className="font-semibold">CONTACTANOS</a></li>
          </ul>
        </div>
        <a href="/" className="">
          <img src={logo} alt="Logo" className="h-[6rem] w-[6rem]" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/" className="font-semibold text-[1rem]">INICIO</a></li>
          <li><a href="/about-us" className="font-semibold text-[1rem]">QUIENES SOMOS</a></li>
          <li><a href="/activities" className="font-semibold text-[1rem]">ACTIVIDADES</a></li>
          <li><a href="/centros" className="font-semibold text-[1rem]">CENTROS</a></li>
          <li><a href="/contact" className="font-semibold text-[1rem]">CONTACTANOS</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a href="/login" className="btn bg-blue-600 text-white hover:bg-blue-700">
          ACCESOS
        </a>
      </div>
    </div>
  );
}

export default Navbar;


