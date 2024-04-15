
//import style from '@/modules/auth/components/auth.module.css'
import { LoginForm } from "@/modules/auth/login/LoginForm";


export const metadata = {
 title: 'Login del portl SO',
 description: 'Login del portal SO',
};


export default function LoginPage() {

  
  return (
  
      <LoginForm/>
   
  );

  /*
  return (
    <main className={`h-[calc(100vh-2rem)] flex justify-center items-center ${style.body}`}>
      <LoginForm/>
    </main>
  );*/
}