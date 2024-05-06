
interface username{
    username: string
}

//Verifica si el usuario existe, en caso de existir devuelve la informacion del usuario: correo, contrasena, etc.
export async function getUserApi({username}: username){

    const user = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, 
                {
                    method: 'POST',
                    body: JSON.stringify({ username: username}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(res => res.json())

    return user        

} 
