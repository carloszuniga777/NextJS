import { UseFormRegister, FieldValues  } from 'react-hook-form';



interface Props{
    name: string,
    type: string,
    placeholder: string,
    label: string,
    register: UseFormRegister<FieldValues>,
    errors?: { message?: string }
    clase: string
    obligatoryField: boolean
}

export const TextInputField = ({name, label, type, placeholder, clase, register, errors, obligatoryField }:Props) => {
    

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
                                                value: obligatoryField, 
                                                message: `El campo ${label} es requerido`
                                            }, 
                                            }
                                        )
                                }
                                className={clase}  
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
