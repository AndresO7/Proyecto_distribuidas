import { useState, useEffect } from 'react';
import axios from 'axios';

const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotificaciones = async () => {
    setLoading(true);
    try {
      const notificacionesResponse = await axios.get('/api/notificaciones');
      const notificacionesData = notificacionesResponse.data;

      const [usuariosResponse] = await axios.all([
        axios.get('/api/usuarios')
      ]);

      const usuarios = usuariosResponse.data;

      const notificacionesWithDetails = notificacionesData.map((notificacion) => {
        const usuario = usuarios.find((user) => user.id === notificacion.usuarioId);
        return {
          ...notificacion,
          usuarioNombre: usuario ? usuario.nombre : 'Usuario desconocido',
        };
      });

      setNotificaciones(notificacionesWithDetails);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addNotificacion = async (notificacion) => {
    setLoading(true);
    try {
      await axios.post('/api/notificaciones/crear', notificacion);
      fetchNotificaciones();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateNotificacion = async (id, notificacion) => {
    setLoading(true);
    try {
      await axios.put(`/api/notificaciones/editar/${id}`, notificacion);
      fetchNotificaciones();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotificacion = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/notificaciones/eliminar/${id}`);
      fetchNotificaciones();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
  }, []);

  return {
    notificaciones,
    loading,
    error,
    addNotificacion,
    updateNotificacion,
    deleteNotificacion,
  };
};

export default useNotificaciones;
