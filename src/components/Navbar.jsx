'use client';

import Link from 'next/link';
import { FaUserCircle, FaSearch, FaBookOpen } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-red-500 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <FaBookOpen className="text-white w-8 h-8" />
          <div className="text-white font-bold text-xl">
            <Link href="/">Biblioteca ESPE</Link>
          </div>
        </div>
        <div className="flex-grow flex justify-center">
          <div className="flex space-x-8 items-center">
            <Link href="/" className="text-white hover:underline">
              Home
            </Link>
            <Link href="/usuarios" className="text-white hover:underline">
              Usuarios
            </Link>
            <Link href="/libros" className="text-white hover:underline">
              Libros
            </Link>
            <Link href="/prestamos" className="text-white hover:underline">
              Préstamos
            </Link>
            <Link href="/notificaciones" className="text-white hover:underline">
              Notificaciones
            </Link>
            <Link href="/inventario" className="text-white hover:underline">
              Inventario
            </Link>
            <Link href="/pagos" className="text-white hover:underline">
              Pagos
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="bg-red-400 text-white rounded-full pl-10 pr-4 py-2 focus:outline-none"
              placeholder="Buscar..."
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-300" />
          </div>
          <FaUserCircle className="text-white w-8 h-8" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
