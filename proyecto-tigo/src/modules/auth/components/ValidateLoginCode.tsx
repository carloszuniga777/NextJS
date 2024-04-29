"use client";

import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import validarToken from "../actions/validateToken";
import { TextInputField } from "./TextInputField";

export default function ValidateLoginCode() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [valido, setValido] = useState<boolean>(false);
  const [consultado, setConsultado] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const route = useRouter();

  const onSubmit = handleSubmit(async ({ codigo }) => {
    const resultado = await validarToken("JOSUE.MARQUEZ", codigo);

    console.log("Resultado obtenido");
    console.log(resultado);

    if (resultado.length < 1) {
      setValido(false);
    } else {
      setValido(true);
      setModalOpen(false);
    }

    if (!consultado) setConsultado(true);
  });

  async function handleValidate() {
    const resultado = await validarToken("JOSUE.MARQUEZ", "355178");
    if (resultado.length < 1) {
      setValido(false);
    } else {
      setValido(true);
      setModalOpen(false);
    }

    if (!consultado) setConsultado(true);
  }

  return (
    <div>
      {/* Video thumbnail */}
      <button
        className="relative flex justify-center items-center focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 rounded-3xl group"
        onClick={() => {
          setModalOpen(true);
        }}
        aria-label="Watch the video"
      >
        Ver modal
      </button>
      {/* End: Video thumbnail */}

      <Transition show={modalOpen} as={Fragment}>
        <Dialog initialFocus={videoRef} onClose={() => setModalOpen(false)}>
          {/* Modal backdrop */}
          <Transition.Child
            aria-disabled="true"
            className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />
          {/* End: Modal backdrop */}

          {/* Modal dialog */}
          <Transition.Child
            className="fixed inset-0 z-10 flex p-6"
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-75"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <div className="max-w-5xl mx-auto h-full flex items-center">
              <Dialog.Panel className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="flex flex-col gap-4 p-6">
                  <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Confirmar código
                  </h4>
                  <p className="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                    Se envió un código de verificación a tu correo electrónico y
                    un SMS a tu número de teléfono.
                  </p>
                  <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                    Ingrese el código de confirmación
                  </h6>
                  <div className="bg-white rounded-lg pt-5 pb-10 flex justify-center">
                    <form onSubmit={onSubmit} className="w-[30%] min-w-80">
                      <TextInputField
                        name="codigo"
                        placeholder=" "
                        register={register}
                        errors={errors.password}
                        type="text"
                        label="Código"
                        clase="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        obligatoryField={true}
                      />
                      <div className="p-6 pt-0">
                        <button
                          className="block w-full select-none rounded-lg bg-gradient-to-tr from-blue-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          //onClick={handleValidate}
                        >
                          Confirmar
                        </button>
                      </div>
                      <p className="flex justify-center mt-4 font-sans text-sm antialiased font-light leading-normal text-inherit">
                        ¿No lo recibistes?
                        <a
                          href="#resend"
                          className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
                        >
                          Reenviar
                        </a>
                      </p>
                    </form>
                  </div>

                  {!valido && consultado && (
                    <h2 className="text-red-500">Codigo incorrecto</h2>
                  )}
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
          {/* End: Modal dialog */}
        </Dialog>
      </Transition>
    </div>
  );
}
