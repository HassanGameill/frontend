import React from 'react'
import {useAppDispatch, useAppSelector} from '../../../../RTK-STORE/hooks'
import { actAuthRegister, resetUi } from "../../../../RTK-STORE/Auth/AuthSlice";
import {useState, useEffect} from 'react'
import {Link, useNavigate, useSearchParams, Navigate} from 'react-router-dom'

import { useForm, SubmitHandler } from "react-hook-form";
import { SignUpSchema, TSignUp } from "../../../Validation/SignUpSchema";

import { zodResolver } from "@hookform/resolvers/zod";

import useCheckEmailAvailability from '../Hooks/useCheckEmailAvailability.ts'







const useRegister = () => {
  // Disabled Actions button
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  // use navigate ...
  const navigate = useNavigate()
  
  const dispatch = useAppDispatch()
  const {loading, error, accessToken} = useAppSelector((state) => state.Auth)
  
  
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors: formErrors },
  } = useForm<TSignUp>({
    mode: "onBlur",
    resolver: zodResolver(SignUpSchema),
  });
  
  // Send Data ...
  const submitForm: SubmitHandler<TSignUp> = async (data) => {
    const {firstName, lastName, email, password} = data;
    
    dispatch(actAuthRegister({firstName, lastName, email, password})).unwrap().then(() => navigate(`/login?message=account_created`))
  }
  
  // use Check Email Availability
  const {
    emailAvailabilityStatus, 
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability()
  
  // check email avilvable ....
  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const {isDirty, invalid} = getFieldState("email");
    
    if (isDirty && !invalid && enteredEmail !== value ) {
      // Check Email Availability..
      checkEmailAvailability(value)
    }
    
    // Commint ...
    if (isDirty && invalid && enteredEmail ) {
      resetCheckEmailAvailability()
    }
    
  }
  
  // Reset Data Auth ....
  useEffect(() => {
    return () => {
      dispatch(resetUi())
    }
  }, [dispatch])
  
  
  
  
  return {
    isBtnDisabled,
    loading, 
    error, 
    accessToken,
    formErrors,
    register,
    handleSubmit,
    submitForm,
    emailAvailabilityStatus,
    emailOnBlurHandler,
  }
  
  
}

export default useRegister