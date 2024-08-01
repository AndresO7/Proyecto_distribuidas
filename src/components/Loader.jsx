// app/components/Loader.js
'use client';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-300 border-dashed rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-200 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default Loader;
