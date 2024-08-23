import React from 'react'
import useLogin from "./useLogin.ts"

import {Input} from '../../../Forms/index'
import {Link, useNavigate, useSearchParams, Navigate} from 'react-router-dom'




const LoginRender = () => {
  const {
    loading, 
    error, 
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    searchParams,
    isBtnDisabled,
  } = useLogin();
  
  // Protect Page ...
  if (accessToken) {
    return <Navigate to="/" />
  }
  
  
  return (
    <div className="container md:px-5 pt-5  mx-auto flex justify-center  ">
  
      <div className="Col flex flex-col items-center justify-center bg-[#e0f4e3] w-full md:w-[70%] py-8 shadow-md rounded-md">
      
        {
          searchParams.get(`message`) === `account_created` && <div className="my-3 flex items-center justify-center p-3 w-[20rem] bg-emerald-400 shadow-md text-white font-semibold  text-[12px] rounded-md ">
          
            Your account is successfuly to login now
          </div> 
          
        }
        
        {
          searchParams.get(`message`) === `login_required` && <div className="my-3 flex items-center justify-center p-3 w-[20rem] bg-emerald-400 shadow-md text-white font-semibold  text-[12px] rounded-md ">
          
            You need to make Login
          </div> 
          
        }
        
          <form className="flex flex-col items-center justify-center gap-3 w-full " onSubmit={handleSubmit(submitForm)} >
          
            
            <Input 
              label={"Email"}
              name={"email"}
              type={"text"}
              register={register}
              error={formErrors.email?.message}
            />
            
            <Input 
              label={"Password"}
              name={"password"}
              type={"password"}
              register={register}
              error={formErrors.password?.message}
            />
            
           
            
            <div  className="flex items-center justify-center mt-2">
              <button 
              disabled={loading === "checking" || loading === "pending" ? !isBtnDisabled : null}
              
              className={`px-4 py-2 rounded-md shadow-md text-white cursor-pointer ${  loading === "checking" || loading === "pending" ? "bg-gray-400" : "bg-slate-900"} `}
              >
              {loading === "pending" ? "Loading" : "Login"}
              </button>
            </div>
            
            {
              error && <p className="text-[red] text-[12px] mt-[5px]">{error}</p>
              
            }
            
        </form>
        
        <div className="text-[12px] mt-3 text-blue-950 cursor-pointer">
          <Link to="/register">If you don't have an account go to <span className="text-[13.5px] font-semibold">Signup</span></Link>
        </div>
      </div>
    </div>
  )
}

export default LoginRender