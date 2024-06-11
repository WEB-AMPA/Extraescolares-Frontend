import React from 'react';

const Equipment = () => {
    return (
        <div className="mission-card-container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 p-8 m-20 bg-orange-100">
            <div className="flex flex-col items-center md:flex-row-reverse p-3">
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Nuestro Equipo</h2>
                    <p className="text-sm leading-relaxed mb-4 p-5">
                    En C.D Ciudad de los Ángeles, nuestros promotores y monitores son los pilares que hacen posible nuestras actividades extraescolares. Con pasión y dedicación, trabajan incansablemente para ofrecer experiencias deportivas enriquecedoras a nuestros jóvenes. Gracias a su compromiso, fomentamos el desarrollo integral de cada participante. Conócelos y descubre cómo su entusiasmo impulsa a nuestro club hacia nuevas metas</p>
                </div>
                <div>
                    <img src="/equipment.jpg" alt="mision" className="h-50"/>
                </div>
            </div>
        </div>
    );
};

export default Equipment;
