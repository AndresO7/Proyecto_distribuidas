'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const LibroForm = ({ onSubmit, initialData = { anoPublicacion: '', autor: '', ejemplaresDisponibles: '', isbn: '', titulo: '' }, onClose }) => {
  const [formData, setFormData] = useState(initialData);

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
    setFormData({ anoPublicacion: '', autor: '', ejemplaresDisponibles: '', isbn: '', titulo: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-900 bg-opacity-50 transition-opacity">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Formulario de Libro</h2>
            <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Autor</label>
              <input
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Año de publicación</label>
              <input
                type="number"
                name="anoPublicacion"
                value={formData.anoPublicacion}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ejemplares disponibles</label>
              <input
                type="number"
                name="ejemplaresDisponibles"
                value={formData.ejemplaresDisponibles}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ISBN</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
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

export default LibroForm;
