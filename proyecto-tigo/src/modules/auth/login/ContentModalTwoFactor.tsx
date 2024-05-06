import { TextInputField } from "@/components/form/TextInputField"
import { UseFormRegister, FieldValues  } from 'react-hook-form';

interface contentModal{
    register:UseFormRegister<FieldValues>,
    error?: { message?: string }
    /*onSubmit: ()=>void*/
}


export const ContentModalTwoFactor = ({register, error}:contentModal) => {

  return (
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
                    <form className="w-[30%] min-w-80">
                        
                            <TextInputField
                                name="code"
                                placeholder=" "
                                register={register}
                                errors={error}
                                type="text"
                                label="Código"
                                clase="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                obligatoryField={true}
                            />
                    
                            <div className="p-6 pt-0">
                                <button
                                    className="block w-full select-none rounded-lg bg-gradient-to-tr from-blue-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                >
                                    Confirmar
                                </button>
                                
                            </div>

                            <p className="flex justify-center mt-4 font-sans text-sm antialiased font-light leading-normal text-inherit">
                                ¿No lo recibistes?
                                
                                <a  href="#resend"
                                    className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
                                >
                                    Reenviar
                                </a>
                            </p>
                    
                    </form>
                </div>
        </div>
    )
}
