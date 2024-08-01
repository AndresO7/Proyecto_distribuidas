'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const PagoForm = ({ onSubmit, initialData = { usuarioId: '', libroId: '', fechaPago: '', monto: '' }, onClose }) => {
  const [formData, setFormData] = useState(initialData);
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [usuariosResponse, librosResponse] = await axios.all([
        axios.get('/api/usuarios'),
        axios.get('/api/libros'),
      ]);

      setUsuarios(usuariosResponse.data);
      setLibros(librosResponse.data);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ usuarioId: '', libroId: '', fechaPago: '', monto: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-900 bg-opacity-50 transition-opacity">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Formulario de Pago</h2>
            <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario</label>
              <select
                name="usuarioId"
                value={formData.usuarioId}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Seleccione un usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Libro</label>
              <select
                name="libroId"
                value={formData.libroId}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Seleccione un libro</option>
                {libros.map((libro) => (
                  <option key={libro.id} value={libro.id}>
                    {libro.titulo}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de pago</label>
              <input
                type="date"
                name="fechaPago"
                value={formData.fechaPago}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monto</label>
              <input
                type="number"
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded-md">Cancelar</button>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PagoForm;
