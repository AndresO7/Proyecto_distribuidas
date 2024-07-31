import { useState, useEffect } from 'react';
import axios from 'axios';

const usePrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrestamos = async () => {
    setLoading(true);
    try {
      const prestamosResponse = await axios.get('/api/prestamos');
      const prestamosData = prestamosResponse.data;

      // Fetch all users and books in parallel
      const [usuariosResponse, librosResponse] = await axios.all([
        axios.get('/api/usuarios'),
        axios.get('/api/libros'),
      ]);

      const usuarios = usuariosResponse.data;
      const libros = librosResponse.data;

      // Map prestamos to include user and book details
      const prestamosWithDetails = prestamosData.map((prestamo) => {
        const usuario = usuarios.find((user) => user.id === prestamo.usuarioId);
        const libro = libros.find((book) => book.id === prestamo.libroId);
        return {
          ...prestamo,
          usuarioNombre: usuario ? usuario.nombre : 'Usuario desconocido',
          libroTitulo: libro ? libro.titulo : 'Libro desconocido',
        };
      });

      setPrestamos(prestamosWithDetails);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addPrestamo = async (prestamo) => {
    setLoading(true);
    try {
      await axios.post('/api/prestamos/crear', prestamo);
      fetchPrestamos();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePrestamo = async (id, prestamo) => {
    setLoading(true);
    try {
      await axios.put(`/api/prestamos/editar/${id}`, prestamo);
      fetchPrestamos();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePrestamo = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/prestamos/eliminar/${id}`);
      fetchPrestamos();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  return {
    prestamos,
    loading,
    error,
    addPrestamo,
    updatePrestamo,
    deletePrestamo,
  };
};

export default usePrestamos;
