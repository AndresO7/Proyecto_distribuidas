'use client';

import { useState } from 'react';
import useInventarios from '@/hooks/useInventario';
import InventarioForm from '@/components/InventarioForm';
import { FaEdit, FaTrash, FaPlus, FaHandHolding, FaBoxOpen } from 'react-icons/fa';
import Loader from '@/components/Loader';
const InventariosPage = () => {
  const { inventarios, loading, error, addInventario, updateInventario, deleteInventario } = useInventarios();
  const [showModal, setShowModal] = useState(false);
  const [selectedInventario, setSelectedInventario] = useState(null);

  if (loading) return <Loader/>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddClick = () => {
    setSelectedInventario(null);
    setShowModal(true);
  };

  const handleEditClick = (inventario) => {
    setSelectedInventario(inventario);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Inventarios</h1>
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-1"
        >
          <FaPlus /> <span>Nuevo Inventario</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventarios.map((inventario) => (
          <div key={inventario.id} className="p-4 border rounded-md shadow-md bg-white">
            <div className="flex items-center space-x-2">
              <FaBoxOpen className="text-gray-700 text-3xl" />
              <div>
                <p className="text-xl font-bold">Libro: {inventario.libroTitulo}</p>
                <p className="text-gray-600">{inventario.cantidadDisponible}</p>
                <p className="text-gray-600">{inventario.cantidadTotal}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleEditClick(inventario)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteInventario(inventario.id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <InventarioForm
          onSubmit={selectedInventario ? (data) => updateInventario(selectedInventario.id, data) : addInventario}
          initialData={selectedInventario || { libroId: '', cantidadDisponible: '', cantidadTotal: '' }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default InventariosPage;
