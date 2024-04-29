import { getUser } from '@/modules/auth/actions/service/user';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';                 //validador


const postSchema = yup.object({
    username: yup.string().required()
})



export async function POST(request: Request){

    try{
        
        const {username} = await postSchema.validate(await request.json())

        const user = await getUser(username)
        
        return NextResponse.json(user)
        
    }catch(error){
        return NextResponse.json(error, { status: 400} )
    }
}

  
