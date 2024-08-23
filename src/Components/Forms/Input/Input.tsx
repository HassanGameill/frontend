import React from 'react'
import {Path, fieldValues, useFormRegister} from 'react-hook-form'
// CSS Style ...
import style from './style.module.css'
const {Form_Group, Error, FormText, Success} = style;



type TInputProps<TFieldValue extends fieldValues> = {
  name: Path<TFieldValue>;
  label?: string;
  type?: string;
  register: useFormRegister<TFieldValue>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText: string;
  success: string;
  disabled: boolean;
}


 const Input = <TFieldValue extends fieldValues>({
     label, 
     type, 
     name, 
     error,
     register,
     onBlur,
     formText,
     success,
     disabled,
 }: TInputProps<TFieldValue>) => {
  
  // onBlur Handler for check email
  const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
        register(name).onBlur(e);
        
      } else {
        register(name).onBlur(e);
      }
  }
  
  return (
    
    <div className={`${Form_Group} flex flex-col md:w-[65%]`}>
    
      <input 
        className={`${error ? Error : success ? Success : ""}   py-2 w-full px-4 shadow-md`} 
        type={type} 
        placeholder={label} 
        {...register(name)} 
        onBlur={onblurHandler}
        disabled={disabled}
        />
      
      
      <label className="text-[red] text-[12px] px-4">
       {error}
      </label>
      <label className={`text-[green] text-[12px] px-4`}>
       {success}
      </label>
      {formText && <span className="text-blue-500 text-[12px] px-4" >{formText}</span>}
      
    </div>
  )
}


export default Input