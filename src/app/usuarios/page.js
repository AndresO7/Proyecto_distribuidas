'use client';

import { useState } from 'react';
import useUsuarios from '@/hooks/useUsuarios';
import UsuarioForm from '@/components/UsuarioForm';
import { FaUserEdit, FaTrash, FaUserPlus, FaUser } from 'react-icons/fa';
import Loader from '@/components/Loader';
const UsuariosPage = () => {
  const { usuarios, loading, error, addUsuario, updateUsuario, deleteUsuario } = useUsuarios();
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);


  if (loading) return <Loader/>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddClick = () => {
    setSelectedUsuario(null);
    setShowModal(true);
  };

  const handleEditClick = (usuario) => {
    setSelectedUsuario(usuario);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-1"
        >
          <FaUserPlus /> <span>Nuevo Usuario</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="p-4 border rounded-md shadow-md bg-white">
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-700 text-3xl" />
              <div>
                <p className="text-xl font-bold">{usuario.nombre}</p>
                <p className="text-gray-600">{usuario.email}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleEditClick(usuario)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                <FaUserEdit />
              </button>
              <button
                onClick={() => deleteUsuario(usuario.id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <UsuarioForm
          onSubmit={selectedUsuario ? (data) => updateUsuario(selectedUsuario.id, data) : addUsuario}
          initialData={selectedUsuario || { nombre: '', email: '', password: '' }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UsuariosPage;
