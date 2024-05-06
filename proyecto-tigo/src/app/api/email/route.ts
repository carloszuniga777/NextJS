import { NextResponse, NextRequest } from 'next/server'
import { Resend } from 'resend';
import * as yup from 'yup';

const resend = new Resend(process.env.RESEND_API_KEY);


const postSchema = yup.object({
    correo: yup.string().required(),
    token: yup.string().required()
})



export async function POST(request: Request){

    const {correo, token} = await postSchema.validate(await request.json())
    
    try{

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: correo,
            subject: 'Codigo de Auntenticacion',
            html: `<p>Su codigo de autenticacion es: ${token}</p>`
          });
                
       
        return NextResponse.json(data, {status: 200})

    }catch(error){
        return NextResponse.json(error, { status: 400} )
    }
}
