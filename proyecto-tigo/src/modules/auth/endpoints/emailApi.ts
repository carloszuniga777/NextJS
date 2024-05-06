
interface SendEmailTwoFactor{
    email: string,
    token: string
}

//Se realiza un fetch por medio la API para envio de correo
export async function sendTwoFactorTokenEmail({email, token}:SendEmailTwoFactor){

    const sendEmail = await fetch(`${process.env.NEXTAUTH_URL}/api/email`, 
                                    {
                                        method: 'POST',
                                        body: JSON.stringify({ correo: email, 
                                                               token: token
                                                             }),
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }
                            ).then(res => res.json())

     return sendEmail                       
} 
