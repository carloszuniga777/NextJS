/** @type {import('next').NextConfig} */
const nextConfig = {

     //Configuracion para la propiedad Images acepte imagenes externas con URL
     images: {
        remotePatterns: [
            {
                protocol:'https',
                hostname:'tailus.io'
            }
        ]
     }
};

export default nextConfig;
