import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/usuarios');
      setUsuarios(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addUsuario = async (usuario) => {
    setLoading(true);
    try {
      await axios.post('/api/usuarios/crear', usuario);
      fetchUsuarios();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUsuario = async (id, usuario) => {
    setLoading(true);
    try {
      await axios.put(`/api/usuarios/editar/${id}`, usuario);
      fetchUsuarios();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUsuario = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/usuarios/eliminar/${id}`);
      fetchUsuarios();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    error,
    addUsuario,
    updateUsuario,
    deleteUsuario,
  };
};

export default useUsuarios;
