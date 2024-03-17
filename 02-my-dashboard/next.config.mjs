/** @type {import('next').NextConfig} */
const nextConfig = {

    //Configuracion para la propiedad Images acepte imagenes externas con URL
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'images.unsplash.com'  
            },
            {
                protocol: 'https',
                hostname: 'user-images.githubusercontent.com'  
            },  
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com'  
            },
        ]
        
    }
};

export default nextConfig;
