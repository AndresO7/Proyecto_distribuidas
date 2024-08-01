'use client';

import { useState } from 'react';
import useNotificaciones from '@/hooks/useNotificaciones';
import NotificacionForm from '@/components/NotificacionForm';
import { FaEdit, FaTrash, FaPlus, FaHandHolding, FaBell } from 'react-icons/fa';
import Loader from '@/components/Loader';
const NotificacionesPage = () => {
  const { notificaciones, loading, error, addNotificacion, updateNotificacion, deleteNotificacion } = useNotificaciones();
  const [showModal, setShowModal] = useState(false);
  const [selectedNotificacion, setSelectedNotificacion] = useState(null);


  if (loading) return <Loader/>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddClick = () => {
    setSelectedNotificacion(null);
    setShowModal(true);
  };

  const handleEditClick = (notificacion) => {
    setSelectedNotificacion(notificacion);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Notificaciones</h1>
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-1"
        >
          <FaPlus /> <span>Nueva Notificación</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notificaciones.map((notificacion) => (
          <div key={notificacion.id} className="p-4 border rounded-md shadow-md bg-white">
            <div className="flex items-center space-x-2">
              <FaBell className="text-gray-700 text-3xl" />
              <div>
                <p className="text-xl font-bold">Destinatario: {notificacion.usuarioNombre}</p>
                <p className="text-gray-600">Fecha: {notificacion.fecha}</p>
                <p className="text-gray-600">Tipo: {notificacion.tipo}</p>
                <p className="text-gray-600">Detalle: {notificacion.detalle}</p>
                
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleEditClick(notificacion)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteNotificacion(notificacion.id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <NotificacionForm
          onSubmit={selectedNotificacion ? (data) => updateNotificacion(selectedNotificacion.id, data) : addNotificacion}
          initialData={selectedNotificacion || { usuarioId: '', fecha: '', detalle: '', tipo: ''}}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default NotificacionesPage;
