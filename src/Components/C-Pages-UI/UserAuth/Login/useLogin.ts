import React from 'react'
import {useState, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../../../RTK-STORE/hooks'
import { actAuthLogin, resetUi } from "../../../../RTK-STORE/Auth/AuthSlice";

import { useForm, SubmitHandler } from "react-hook-form";
import { SignInSchema, TSignIn } from "../../../Validation/SignInSchema";

import { zodResolver } from "@hookform/resolvers/zod";

import {Input} from '../../../Forms/index'
import {Link, useNavigate, useSearchParams, Navigate} from 'react-router-dom'





const useLogin = () => {
  
  // Disabled Actions button
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  
  const dispatch = useAppDispatch();
  const {loading, error, accessToken} = useAppSelector((state) => state.Auth);
  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<TSignIn>({
    mode: "onBlur",
    resolver: zodResolver(SignInSchema),
  })
  
  
  
  const submitForm: SubmitHandler<TSignIn> = (data) => {
    if (searchParams.get(`message`)) {
      setSearchParams(" ")
    }
    
    dispatch(actAuthLogin(data)).unwrap().then(() => navigate(`/`))
  }
  
  
  useEffect(() => {
    return () => {
      dispatch(resetUi())
    }
  }, [dispatch])
  
  
  
  return {
    loading, 
    error, 
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    searchParams,
    
  }
}

export default useLogin