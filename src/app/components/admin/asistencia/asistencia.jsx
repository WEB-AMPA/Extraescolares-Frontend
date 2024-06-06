import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const UsersTable = () => {
 const [users, setUsers] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://random-data-api.com/api/users/random_user');
        const data = await response.json();
        setUsers([data]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
 }, []);

 const handleEdit = (user) => {
   console.log('Editar usuario:', user);
 };

 const handleDelete = (user) => {
   console.log('Borrar usuario:', user);
 };


 return (
    <div className="flex justify-center overflow-x-auto m-4 p-4">
      <table className="divide-y divide-gray-600 border border-gray-300 rounded-lg">
        <thead className="bg-gray-200 gap-3 items-center">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
            Nº. Socio
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
            Fecha de Asistencia
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
            Nombre Alumno
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Actividad
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Docente
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
          Asistencia
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Actions
            </th>
         
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.date_of_birth}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{`${user.first_name} ${user.last_name}`}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.employment.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.subscription.status}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.employment.key_skill}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button onClick={() => handleEdit(user)} className="p-2 m-2 bg-gray-200 border border-gray-300">
                  <FaEdit /></button>
                <button onClick={() => handleDelete(user)} className="p-2 m-2 bg-gray-200 border border-gray-300">
                  <MdDelete /></button>
              </td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
 );
};

export default UsersTable;
