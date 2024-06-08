// src/components/Card.jsx
import React from 'react';

const Card = ({ title, image, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-4">
      <img src={image} alt={title} className="w-full h-32 sm:h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Card;
