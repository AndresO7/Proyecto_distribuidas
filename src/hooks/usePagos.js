import { useState, useEffect } from 'react';
import axios from 'axios';

const usePagos = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPagos = async () => {
    setLoading(true);
    try {
      const pagosResponse = await axios.get('/api/pagos');
      const pagosData = pagosResponse.data;

      const [usuariosResponse, librosResponse] = await axios.all([
        axios.get('/api/usuarios'),
        axios.get('/api/libros'),
      ]);

      const usuarios = usuariosResponse.data;
      const libros = librosResponse.data;

      const pagosWithDetails = pagosData.map((pago) => {
        const usuario = usuarios.find((user) => user.id === pago.usuarioId);
        const libro = libros.find((book) => book.id === pago.libroId);
        return {
          ...pago,
          usuarioNombre: usuario ? usuario.nombre : 'Usuario desconocido',
          libroTitulo: libro ? libro.titulo : 'Libro desconocido',
        };
      });

      setPagos(pagosWithDetails);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addPago = async (pago) => {
    setLoading(true);
    try {
      await axios.post('/api/pagos/crear', pago);
      fetchPagos();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePago = async (id, pago) => {
    setLoading(true);
    try {
      await axios.put(`/api/pagos/editar/${id}`, pago);
      fetchPagos();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePago = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/pagos/eliminar/${id}`);
      fetchPagos();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  return {
    pagos,
    loading,
    error,
    addPago,
    updatePago,
    deletePago,
  };
};

export default usePagos;
