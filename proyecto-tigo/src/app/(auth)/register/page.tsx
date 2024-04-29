import { RegisterForm } from '@/modules/auth/register/registerform'


export const metadata = {
 title: 'Pagina de registro de usuario',
 description: 'Pagina de registro de usuario',
};


export default function Registerpage () {
    return( <main className='md:h-[100vh] lg:h-[100vh] md:flex md:flex-col md:items-center lg:flex lg:flex-col lg:items-center pt-3 bg-[#f4f9fe]'>
                <RegisterForm/>
            </main>
    )
}
