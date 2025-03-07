// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://2a52-2800-430-1203-56c7-bdc7-7941-6b2d-f77b.ngrok-free.app/api/:path*' 
        }
      ];
    },
  };
  
  export default nextConfig;
  
