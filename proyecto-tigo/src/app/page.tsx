import { redirect } from 'next/navigation';


export const metadata = {
 title: 'Login del portl SO',
 description: 'Login del portal SO',
};


export default function HomePage() {

    redirect('/login');
}