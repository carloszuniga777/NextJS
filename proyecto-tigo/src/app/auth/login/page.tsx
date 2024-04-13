
import style from '@/components/auth/auth.module.css'
import { LoginForm } from '@/components/auth/login/LoginForm';



export const metadata = {
 title: 'Login del portl SO',
 description: 'Login del portal SO',
};


export default function LoginPage() {

  return (
    <section className={`h-[calc(100vh-2rem)] flex justify-center items-center ${style.body}`}>
      <LoginForm/>
    </section>
  );
}