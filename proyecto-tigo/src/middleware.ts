//https://next-auth.js.org/configuration/nextjs

export { default } from "next-auth/middleware" //Protege las url cuando un usuario no se ha authenticado, es decir, evita que el usuario ingrese a una pagina por medio de la url sin que se haya authenticado antes

export const config = { matcher: ["/dashboard/:path*"] }
