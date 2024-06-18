import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

const AddActivities = () => {
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
        className="flex flex-row gap-2 items-center text-white m-8 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-900 rounded-lg shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={openModal}
      >
        <IoIosAddCircle className="text-4xl" />
        <span className="text-lg font-semibold">Asignar Actividad</span>
      </button>

      {isModalOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-800 bg-opacity-75"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-700">
                    Asignar Actividad
                  </h3>
                  <button
                    className="text-gray-500 hover:text-gray-700 transition"
                    onClick={closeModal}
                  >
                    <AiOutlineClose className="text-2xl" />
                  </button>
                </div>

                <form className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="actividades"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Actividades
                    </label>
                    <select
                      name="actividades"
                      id="actividades"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccione una actividad</option>
                      <option value="opcion1">Opción 1</option>
                      <option value="opcion2">Opción 2</option>
                      <option value="opcion3">Opción 3</option>
                      <option value="opcion4">Opción 4</option>
                      <option value="opcion5">Opción 5</option>
                      <option value="opcion6">Opción 6</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="monitor"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Monitor
                      </label>
                      <input
                        type="text"
                        name="monitor"
                        id="monitor"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="categoria"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Categoría
                      </label>
                      <select
                        name="categoria"
                        id="categoria"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seleccione una categoría</option>
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                        <option value="opcion4">Opción 4</option>
                        <option value="opcion5">Opción 5</option>
                        <option value="opcion6">Opción 6</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="horario"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Horario
                      </label>
                      <select
                        name="horario"
                        id="horario"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seleccione un horario</option>
                        <option value="opcion1">13:00-14:00</option>
                        <option value="opcion2">14:00-15:00</option>
                        <option value="opcion3">15:00-16:00</option>
                        <option value="opcion4">16:00-17:00</option>
                        <option value="opcion5">17:00-18:00</option>
                        <option value="opcion6">18:00-19:00</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="dias"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Días
                      </label>
                      <select
                        name="dias"
                        id="dias"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seleccione días</option>
                        <option value="lunes">Lunes y Miércoles</option>
                        <option value="martes">Martes y Jueves</option>
                        <option value="miércoles">Miércoles y Viernes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="observaciones"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Observaciones
                    </label>
                    <input
                      type="text"
                      name="observaciones"
                      id="observaciones"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </form>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={closeModal}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddActivities;
