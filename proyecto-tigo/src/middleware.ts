//documentacion: https://authjs.dev/getting-started/migrating-to-v5

import { auth } from "./auth";

const authRoutes = ["/", "/login"]                  //Estas rutas son usadas para autenticacion
const DEFAULT_LOGIN_REDIRECT = "/dashboard";        //Ruta de redireccionamiento



export default auth((req) => {
   
    const { nextUrl } = req                  //Se obtiene la informacion de la url donde navega el usuario
    const isLoggedIn = !!req.auth           //Se obtiene el estatus del usuario, si esta authenticado o no
 

    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
    

     //Si el usuario se encuentra en la ruta login   
    if(isAuthRoutes){                        

        //Verifica si el usuario esta autenticado, si esta autenticado redirige a la pagina principal, de lo contrario no hace nada
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
    }

    //Si usuario no esta autenticado, y quiere acceder a otra pagina, lo redirige por defecto al login
   if(!isLoggedIn && !isAuthRoutes){
     return Response.redirect(new URL('/login', nextUrl))
   }
   
})


//https://nextjs.org/docs/pages/building-your-application/routing/middleware#matching-paths
export const config = { 
    matcher: [  "/dashboard/:path*", 
                "/register/:path*",
                //"/((?!api|_next/static|_next/image|favicon.ico).*)",
            ]
}