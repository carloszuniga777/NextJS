import { UseFormRegister, FieldValues, FieldErrors  } from 'react-hook-form';


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
                <label htmlFor={name} className='text-slate-300 mb-2 block text-sm'>
                    {label}:
                </label>

                <input type={type}
                    {...register(name, 
                                {
                                required: {
                                    value: true, 
                                    message: `${name} campo es requerido`
                                }, 
                                }
                            )
                    }
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder={placeholder}
                />
                {
                    errors && (<span className='text-red-500 text-xs'>{errors.message?.toString()}</span>)
                }
 
            </>
        )
}
