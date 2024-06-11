// src/hooks/useFetch.js
import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchPagination = (url, initialPage = 1, initialPageSize = 10, role = 'monitor') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [url, initialPage, initialPageSize, role]);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          currentPage: initialPage,
          pageSize: initialPageSize,
          role
        }
      });
      setData(response.data.users)
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return { data, loading, error };
};

export default useFetchPagination;
