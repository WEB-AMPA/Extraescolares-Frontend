import React from 'react';

const Modal = ({ info, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h3 className="text-xl font-bold mb-4">{info.title}</h3>
        <p className="mb-4">{info.extendedDescription}</p>
        <p className="mb-4"><strong>Horarios:</strong> {info.schedules}</p>
        <p className="mb-4"><strong>Grupos disponibles:</strong> {info.groups}</p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
