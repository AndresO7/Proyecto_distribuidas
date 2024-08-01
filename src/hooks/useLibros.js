import { useState, useEffect } from 'react';
import axios from 'axios';

const useLibros = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLibros = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/libros');
      setLibros(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addLibro = async (libro) => {
    setLoading(true);
    try {
      await axios.post('/api/libros/crear', libro);
      fetchLibros();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateLibro = async (id, libro) => {
    setLoading(true);
    try {
      await axios.put(`/api/libros/editar/${id}`, libro);
      fetchLibros();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteLibro = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/libros/eliminar/${id}`);
      fetchLibros();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  return {
    libros,
    loading,
    error,
    addLibro,
    updateLibro,
    deleteLibro,
  };
};

export default useLibros;
