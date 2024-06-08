import React from 'react';

const Card = ({ title, image, description, className, onClick }) => {
  // Asumimos que la imagen WebP tiene el mismo nombre que la imagen JPEG/PNG, pero con extensión .webp
  const webpImage = image.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 m-4 ${className} cursor-pointer`} 
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <picture>
        <source srcSet={webpImage} type="image/webp" />
        <img src={image} alt={title} className="rounded-t-lg w-full h-40 object-cover" />
      </picture>
      <div className="p-2">
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Card;


