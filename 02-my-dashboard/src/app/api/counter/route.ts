
//Convention: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

/**
 * Hacer la peticion en Posman: localhost:3000/api/counter
 */

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {

    console.log({method: request.method})

    return Response.json({ 
        method: 'GET',
        count: 100
     })
}



export async function POST(request: Request) {

    console.log({method: request.method})
    
    return Response.json({ 
        method: 'POST',
        count: 100
     })
}