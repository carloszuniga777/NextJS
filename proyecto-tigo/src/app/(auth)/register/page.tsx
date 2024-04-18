import { RegisterForm } from '@/modules/auth/register/registerform'


export const metadata = {
 title: 'Pagina de registro de usuario',
 description: 'Pagina de registro de usuario',
};


export default function Registerpage () {
    return( <main className='h-[100vh] flex justify-center pt-3 bg-blue-500'>
                <RegisterForm/>
            </main>
    )
}
