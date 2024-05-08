/** @type {import('next').NextConfig} */
const nextConfig = {

     //Configuracion para la propiedad Images acepte imagenes externas con URL
     images: {
        remotePatterns: [
            {
                protocol:'https',
                hostname:'tailus.io'
            },  
            {
                protocol:'https',
                hostname:'avatars.githubusercontent.com'
            },
            {
                protocol:'https',
                hostname:'lh3.googleusercontent.com'
            }
        ]
     }
};

export default nextConfig;
