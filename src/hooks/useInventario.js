import { useState, useEffect } from 'react';
import axios from 'axios';

const useInventarios = () => {
  const [inventarios, setInventarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventarios = async () => {
    setLoading(true);
    try {
      const inventariosResponse = await axios.get('/api/inventario');
      const inventariosData = inventariosResponse.data;

      const [librosResponse] = await axios.all([
        axios.get('/api/libros')
      ]);

      const libros = librosResponse.data;

      const inventariosWithDetails = inventariosData.map((inventario) => {
        const libro = libros.find((book) => book.id === inventario.libroId);
        return {
          ...inventario,
          libroTitulo: libro ? libro.titulo : 'Libro desconocido',
        };
      });

      setInventarios(inventariosWithDetails);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addInventario = async (inventario) => {
    setLoading(true);
    try {
      await axios.post('/api/inventario/crear', inventario);
      fetchInventarios();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateInventario = async (id, inventario) => {
    setLoading(true);
    try {
      await axios.put(`/api/inventario/editar/${id}`, inventario);
      fetchInventarios();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteInventario = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/inventario/eliminar/${id}`);
      fetchInventarios();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventarios();
  }, []);

  return {
    inventarios,
    loading,
    error,
    addInventario,
    updateInventario,
    deleteInventario,
  };
};

export default useInventarios;
