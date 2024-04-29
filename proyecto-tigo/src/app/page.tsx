import ValidateLoginCode from "@/modules/auth/components/ValidateLoginCode";
import { LoginForm } from "@/modules/auth/login/LoginForm";
import style from "@/modules/auth/styles/auth.module.css";

export const metadata = {
  title: "Login del portl SO",
  description: "Login del portal SO",
};

export default function LoginPage() {
  return (
    <main className={`h-[100vh] ${style.body} flex flex-col justify-center`}>
      <section className="flex flex-col justify-center items-center pt-3">
        <LoginForm />
        <ValidateLoginCode />
      </section>
    </main>
  );
}
