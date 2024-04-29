"use client";

//Instalar react hook form para validar el formulario: npm i react-hook-form
import { TextInputField } from "@/modules/auth/components/TextInputField";
import { useState } from "react";
import { useForm } from "react-hook-form"; //Validador del formulario
import { registarUsuario } from "../actions/register";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); //Permite registrar los input que vamos a capturar
  const [err, setErr] = useState<string>();
  const [registrado, setRegistrado] = useState<string>();

  //Se envia el formulario al backend por medio de una A  API-REST
  //handleSubmit obtiene la data que se envia del submit de los inputs del formulario como un objeto
  const onSubmit = handleSubmit(
    async ({
      username,
      email,
      password,
      confirmPassword,
      tipo_usuario,
      territorio,
      observacion,
    }) => {
      //Si la contraseña es diferente
      if (password !== confirmPassword) {
        return alert("Passwords no coincide");
      }

      //Registra el usuario - User Userver
      const res = await registarUsuario({
        usuario: username,
        correo: email,
        contrasena: password,
        tipo_usuario: tipo_usuario,
        territorio: territorio,
        observacion: observacion,
      });

      //const resJSON = await res.json()   //dato recibido del backend convertido a json
      //console.log(resJSON)
      //console.log('res', res)

      //Si el usuario se creo correctamente lo redirecciona al login para que pueda ingresar
      if (res.ok) {
        setRegistrado("Usuario registrado exitosamente");
      } else {
        setErr(res.message as string);
      }
    }
  );

  return (
    <form
      onSubmit={onSubmit}
      className="md:max-w-[48%] lg:max-w-[48%] p-[0rem 5rem 0rem 5rem]"
      autoComplete="off"
    >
      {err && (
        <p className="bg-red-700 text-lg text-white p-3  text-center rounded-lg mb-4">
          {err}
        </p>
      )}
      {registrado && (
        <p className="bg-green-300 text-lg p-3 text-center rounded-lg mb-4">
          {registrado}
        </p>
      )}
      <section className={`pt-4`}>
        <h1 className="text-slate-950 font-bold text-4xl mb-4 text-center">
          Registrar
        </h1>
        <div className="bg-white rounded pt-4 pb-10">
          <div className="md:grid md:grid-cols-2 lg:grid lg:grid-cols-2">
            <div className="w-full flex flex-col items-center p-3 md:pl-10 lg:pl-10">
              <TextInputField
                name="username"
                label="Usuario"
                type="text"
                placeholder="Usuario123"
                register={register}
                errors={errors.username}
                clase="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                obligatoryField={true}
              />

              <TextInputField
                name="email"
                label="Correo"
                type="email"
                placeholder="user@email.com"
                register={register}
                errors={errors.email}
                clase="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                obligatoryField={true}
              />

              <TextInputField
                name="password"
                label="Contraseña"
                type="password"
                placeholder="***********"
                register={register}
                errors={errors.password}
                clase="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                obligatoryField={true}
              />

              <TextInputField
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                placeholder="***********"
                register={register}
                errors={errors.confirmPassword}
                clase="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                obligatoryField={true}
              />
            </div>
            <div className="flex flex-col items-center m-2">
              <div className="flex flex-col items-center w-full mt-[-1rem] mb:mt-2 lg:mt-2">
                <label
                  htmlFor="tipo_usuario"
                  className='class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"'
                >
                  Tipo Usuario:
                </label>
                <select
                  id="tipo_usuario"
                  {...register("tipo_usuario")}
                  className="mb-3 w-[35%] md:w-[80%] lg:w-[80%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option
                    className="text-center"
                    value=""
                    defaultValue="Seleccionar"
                  >
                    Seleccionar
                  </option>
                  <option value="Interno">Interno</option>
                  <option value="Externo">Externo</option>
                </select>
              </div>

              <TextInputField
                name="territorio"
                label="Territorio"
                type="text"
                placeholder="T1"
                register={register}
                clase="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                obligatoryField={false}
              />

              <TextInputField
                name="observacion"
                label="Observacion"
                type="text"
                placeholder="CVE"
                register={register}
                clase="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                obligatoryField={false}
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-center">
            <button className="w-2/3 bg-blue-500 text-white p-3 rounded-lg">
              Registrar
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
