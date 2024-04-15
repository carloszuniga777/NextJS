import { UseFormRegister, FieldValues  } from 'react-hook-form';



interface Props{
    name: string,
    type: string,
    placeholder: string,
    label: string,
    register: UseFormRegister<FieldValues>,
    errors?: { message?: string }
}

export const TextInputField = ({name, label, type, placeholder, register, errors}:Props) => {
    

  return (
            <>
                <div className='mb-3'>
                        <div>
                            <label htmlFor={name} className='mb-2 block text-sm text-black'>
                                {label}:
                            </label>

                        
                            <input type={type}
                                {...register(name, 
                                            {
                                            required: {
                                                value: true, 
                                                message: `El campo ${label} es requerido`
                                            }, 
                                            }
                                        )
                                }
                                className='mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  
                                placeholder={placeholder}
                            />
                        </div>
                        {
                            errors && (<span className='text-red-500 text-xs'>{errors.message?.toString()}</span>)
                        }
                </div>
    
            </>
        )
}
