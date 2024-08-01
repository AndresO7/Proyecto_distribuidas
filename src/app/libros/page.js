'use client';

import { useState } from 'react';
import useLibros from '@/hooks/useLibros';
import LibroForm from '@/components/LibroForm';
import { FaUserEdit, FaTrash, FaBook } from 'react-icons/fa';
import Loader from '@/components/Loader';

const LibrosPage = () => {
  const { libros, loading, error, addLibro, updateLibro, deleteLibro } = useLibros();
  const [showModal, setShowModal] = useState(false);
  const [selectedLibro, setSelectedLibro] = useState(null);

  if (loading) return <Loader/>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddClick = () => {
    setSelectedLibro(null);
    setShowModal(true);
  };

  const handleEditClick = (libro) => {
    setSelectedLibro(libro);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Libros</h1>
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-1"
        >
          <FaBook /> <span>Nuevo Libro</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {libros.map((libro) => (
          <div key={libro.id} className="p-4 border rounded-md shadow-md bg-white">
            <div className="flex items-center space-x-2">
              <FaBook className="text-gray-700 text-3xl" />
              <div>
                <p className="text-xl font-bold">{libro.titulo}</p>
                <p className="text-gray-600">Autor: {libro.autor}</p>
                <p className="text-gray-600">Año publicación: {libro.anoPublicacion}</p>
                <p className="text-gray-600">Ejemplares disponibles: {libro.ejemplaresDisponibles}</p>
                <p className="text-gray-600">ISBN: {libro.isbn}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleEditClick(libro)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                <FaUserEdit />
              </button>
              <button
                onClick={() => deleteLibro(libro.id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <LibroForm
          onSubmit={selectedLibro ? (data) => updateLibro(selectedLibro.id, data) : addLibro}
          initialData={selectedLibro || { autor: '', titulo: '', anoPublicacion: '', ejemplaresDisponibles: '', isbn: '' }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default LibrosPage;
