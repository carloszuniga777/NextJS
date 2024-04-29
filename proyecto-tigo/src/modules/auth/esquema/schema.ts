import * as z from "zod";

//Verificacion de datos con Zod: https://authjs.dev/getting-started/authentication/credentials
//Para mejorar la seguridad, se valida las entradas que coincidan con lo que esperamos
export const LoginSchema = z.object({
    username: z.string().min(1, {message: 'Usuario es requerido'}),
    password: z.string().min(1, {message: "Contraseña es requerido"}),
});
