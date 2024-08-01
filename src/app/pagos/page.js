'use client';

import { useState } from 'react';
import usePagos from '@/hooks/usePagos';
import PagoForm from '@/components/PagoForm';
import { FaEdit, FaTrash, FaPlus, FaHandHolding, FaDollarSign } from 'react-icons/fa';
import Loader from '@/components/Loader';
const PagosPage = () => {
  const { pagos, loading, error, addPago, updatePago, deletePago } = usePagos();
  const [showModal, setShowModal] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);


  if (loading) return <Loader/>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddClick = () => {
    setSelectedPago(null);
    setShowModal(true);
  };

  const handleEditClick = (pago) => {
    setSelectedPago(pago);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Pagos</h1>
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-1"
        >
          <FaPlus /> <span>Nuevo Pago</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pagos.map((pago) => (
          <div key={pago.id} className="p-4 border rounded-md shadow-md bg-white">
            <div className="flex items-center space-x-2">
              <FaDollarSign className="text-gray-700 text-3xl" />
              <div>
                <p className="text-xl font-bold">Destinatario: {pago.usuarioNombre}</p>
                <p className="text-gray-600">{pago.libroTitulo}</p>
                <p className="text-gray-600">Fecha de Pago: {new Date(pago.fechaPago).toLocaleDateString()}</p>
                <p className="text-gray-600">{pago.monto}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleEditClick(pago)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deletePago(pago.id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <PagoForm
          onSubmit={selectedPago ? (data) => updatePago(selectedPago.id, data) : addPago}
          initialData={selectedPago || { usuarioId: '', libroId: '', fechaPago: '', fechaDevolucion: '' }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PagosPage;
