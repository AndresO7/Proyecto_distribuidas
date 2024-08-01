'use client';

import  ChartComponent  from '@/components/ChartComponent';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center mt-10">Bienvenido al Sistema de Gestión de Biblioteca</h1>
        <p className="text-lg ml-20 mr-20 mb-10">
          Este sistema te permite gestionar eficientemente los recursos de la biblioteca, incluyendo libros, usuarios y préstamos. 
          Navega a través de las diferentes secciones utilizando el menú superior para comenzar.
        </p>
        <div className="flex justify-center text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 max-w-screen-lg mx-auto">
          <div className="p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-xl font-bold mb-2">Total de Libros</h2>
            <p className="text-2xl font-bold text-blue-500">1234</p>
          </div>
          <div className="p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-xl font-bold mb-2">Usuarios Registrados</h2>
            <p className="text-2xl font-bold text-green-500">567</p>
          </div>
          <div className="p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-xl font-bold mb-2">Préstamos Activos</h2>
            <p className="text-2xl font-bold text-red-500">89</p>
          </div>
      </div>
    </div>

    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Análisis</h1>
      <ChartComponent />
    </div>


    
  </div>
  );

}


