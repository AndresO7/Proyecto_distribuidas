'use client';

import { useState } from 'react';
import usePrestamos from '@/hooks/usePrestamos';
import PrestamoForm from '@/components/PrestamoForm';
import { FaEdit, FaTrash, FaPlus, FaBook } from 'react-icons/fa';

const PrestamosPage = () => {
  const { prestamos, loading, error, addPrestamo, updatePrestamo, deletePrestamo } = usePrestamos();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddClick = () => {
    setSelectedPrestamo(null);
    setShowModal(true);
  };

  const handleEditClick = (prestamo) => {
    setSelectedPrestamo(prestamo);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Préstamos</h1>
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-1"
        >
          <FaPlus /> <span>Nuevo Préstamo</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prestamos.map((prestamo) => (
          <div key={prestamo.id} className="p-4 border rounded-md shadow-md bg-white">
            <div className="flex items-center space-x-2">
              <FaBook className="text-gray-700 text-3xl" />
              <div>
                <p className="text-xl font-bold">{prestamo.usuarioNombre}</p>
                <p className="text-gray-600">{prestamo.libroTitulo}</p>
                <p className="text-gray-600">Fecha de Préstamo: {new Date(prestamo.fechaPrestamo).toLocaleDateString()}</p>
                <p className="text-gray-600">Fecha de Devolución: {new Date(prestamo.fechaDevolucion).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleEditClick(prestamo)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deletePrestamo(prestamo.id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <PrestamoForm
          onSubmit={selectedPrestamo ? (data) => updatePrestamo(selectedPrestamo.id, data) : addPrestamo}
          initialData={selectedPrestamo || { usuarioId: '', libroId: '', fechaPrestamo: '', fechaDevolucion: '' }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PrestamosPage;
