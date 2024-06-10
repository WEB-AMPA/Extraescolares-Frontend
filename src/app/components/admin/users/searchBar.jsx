import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ onSearch }) => {
 const [searchTerm, setSearchTerm] = useState('');

 const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
 };

 return (
  <div className="flex items-center p-2 m-10 w-full max-w-xs">
  <CiSearch className="absolute text-gray-500 ml-2" size={20} /> {/* Añade un margen a la derecha para separación */}
  <input
    type="text"
    placeholder="Buscar Contenido..."
    value={searchTerm}
    onChange={handleSearchChange}
    className="flex-grow outline-none text-sm rounded-md pl-8" // Asegura espacio para el ícono
  />
</div>
 );
};

export default SearchBar;
