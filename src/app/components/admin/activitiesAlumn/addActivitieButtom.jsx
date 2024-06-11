import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

const AddActivitie = () => {
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
                className="flex flex-row gap-1 items-center text-white m-8 py-3 px-3 bg-blue-900 rounded"
                onClick={openModal}
            >
                <IoIosAddCircle className="text-4xl" />
                Asignar Actividad
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
    <h3 className="mb-5 text-xl text-center leading-6 font-medium text-gray-400">Asignar Actividad</h3>
    <div className="gap-4 mb-4">

        <div>
            <label htmlFor="actividades" className="block text-sm font-medium text-gray-700 m-2">Actividades</label>
            <select name="actividades" id="actividades" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Seleccione una actividad</option>
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
                <option value="opcion4">Opción 4</option>
                <option value="opcion5">Opción 5</option>
                <option value="opcion6">Opción 6</option>
            </select>
        </div>

        <div className="grid grid-cols-2 -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="monitor" className="block text-sm font-medium text-gray-700 m-2">Monitor</label>
                <input type="text" name="monitor" id="monitor" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 m-2">Categoría</label>
                <select name="categoria" id="categoria" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Seleccione una categoría</option>
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                    <option value="opcion4">Opción 4</option>
                    <option value="opcion5">Opción 5</option>
                    <option value="opcion6">Opción 6</option>
                </select>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="horario" className="block text-sm font-medium text-gray-700 m-2">Horario</label>
                <select name="horario" id="horario" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Seleccione un horario</option>
                    <option value="opcion1">13:00-14:00</option>
                    <option value="opcion2">14:00-15:00</option>
                    <option value="opcion3">15:00-16:00</option>
                    <option value="opcion4">16:00-17:00</option>
                    <option value="opcion5">17:00-18:00</option>
                    <option value="opcion6">18:00-19:00</option>
                </select>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="dias" className="block text-sm font-medium text-gray-700 m-2">Días</label>
                <select name="dias" id="dias" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Seleccione días</option>
                    <option value="lunes">Lunes y Miercoles</option>
                    <option value="martes">Martes y Jueves</option>
                    <option value="miércoles">Miércoles y Viernes</option>
                </select>
            </div>
        </div>

    </div>

    <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 m-2">Observaciones</label>
        <input type="text" name="text" id="observaciones" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mt-9 justify-center bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
            Guardar
        </button>
        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
            Cancelar
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

export default AddActivitie;
