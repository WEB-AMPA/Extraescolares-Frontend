import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const CrearSocio = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                className="flex flex-row gap-2 items-center text-white m-5 py-3 px-3 bg-blue-900 rounded"
                onClick={openModal}
            >
                <FaRegEdit />
                Crear Socio
            </button>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">


                                <form className="p-8 border border-black rounded">
                                <h3 className="mb-5 text-xl text-center leading-6 font-medium text-gray-400">Crear Nuevo Socio</h3>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="nroSocio" className="block text-sm font-medium text-gray-700 m-2">Nº de Socio:</label>
                                            <input type="number" name="nroSocio" id="nroSocio" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        </div>
                                        <div>
                                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 m-2">Nº Teléfono:</label>
                                            <input type="tel" name="telefono" id="telefono" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 m-2">Nombre:</label>
                                            <input type="text" name="nombre" id="nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        </div>
                                        <div>
                                            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 m-2">Apellidos:</label>
                                            <input type="text" name="apellidos" id="apellidos" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700 m-2">Correo:</label>
                                        <input type="email" name="email" id="correo" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mt-9 justify-center bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                                    Guardar
                                </button>
                            </div>
                                </form>
                    
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CrearSocio;
