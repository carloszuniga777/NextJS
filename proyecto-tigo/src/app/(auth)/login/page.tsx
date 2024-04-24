import { LoginForm2 } from "@/modules/auth/login/LoginForm2";
import style from "@/modules/auth/styles/auth.module.css";
import Image from "next/image";

export const metadata = {
  title: "Login del portl SO",
  description: "Login del portal SO",
};

export default function LoginPage() {
  return (
    <main className={`h-[100vh] ${style.body} flex flex-col items-center`}>
      <section className="flex flex-col justify-center pt-3 h-screen items-center">
        <figure className="justify-center flex">
          <Image
            src={"/Logo-Sales-Operations.png"}
            alt="Logo Sales Operation"
            className="w-[40%]"
            width={500}
            height={500}
          />
        </figure>
        <LoginForm2 />
      </section>
    </main>
  );
}
