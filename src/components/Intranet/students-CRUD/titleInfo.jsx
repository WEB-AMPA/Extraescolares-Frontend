import React, { useState, useEffect } from 'react';

const TituloInfo = () => {
  const [socioData, setSocioData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://random-data-api.com/api/users/random_user');
        const data = await response.json();
        setSocioData({
          firstName: data.first_name,
          lastName: data.last_name,
          socialNumber: data.social_insurance_number,
          enrolledCount: 1,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 m-8">
      <h1 className="text-3xl font-bold mb-2">Socio</h1>
      <h2 className="mb-5 text-xl leading-6 font-medium text-gray-700">{socioData.firstName} {socioData.lastName}</h2>
      <h3 className="text-lg mb-2  text-gray-500">Nº Socio: {socioData.socialNumber}</h3>
      <h3 className="text-lg  text-gray-500">Nº Inscritos: {socioData.enrolledCount}</h3>
    </div>
  );
};

export default TituloInfo;