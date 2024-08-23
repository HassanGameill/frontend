import React from 'react'
import useRegister from './useRegister'
import {Link, Navigate} from 'react-router-dom'
import {Input} from '../../../Forms/index'




const RegisterRender = () => {
  const {
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
  } = useRegister();
  
  // Protect Page ...
  if (accessToken) {
    return <Navigate to="/" />
  }
  
  
  
  return (
    <div className="container md:px-5 pt-5  mx-auto flex justify-center  ">
      <div className="Col flex flex-col items-center justify-center bg-[#e0f4e3] w-full md:w-[70%] py-8 shadow-md rounded-md">
        
          <form className="flex flex-col items-center justify-center gap-3 w-full " onSubmit={handleSubmit(submitForm)} >
          
            <Input 
              label={"First name"}
              name={"firstName"}
              type={"text"}
              register={register}
              error={formErrors.firstName?.message}
            />
            
            <Input 
              label={"Last name"}
              name={"lastName"}
              type={"text"}
              register={register}
              error={formErrors.lastName?.message}
            />
            
            <Input 
              label={"Email"}
              name={"email"}
              type={"text"}
              register={register}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
              }
              
              
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus === "checking" ? "checking email address please wait a mommint.. " : ""
              }
              success={emailAvailabilityStatus === "available" ? "This email is available for use" : ""}
            />
            
            <Input 
              label={"Password"}
              name={"password"}
              type={"password"}
              register={register}
              error={formErrors.password?.message}
            />
            
            <Input 
              label={"Confirm Password"}
              name={"confirmPassword"}
              type={"password"}
              register={register}
              error={formErrors.confirmPassword?.message}
            />
            
            
            <div  className="flex items-center justify-center mt-2">
              <button 
              disabled={emailAvailabilityStatus === "checking" || loading === "pending" ? !isBtnDisabled : null}
              
              className={`px-4 py-2 rounded-md shadow-md text-white cursor-pointer ${  emailAvailabilityStatus === "checking" || loading === "pending" ? "bg-gray-400" : "bg-slate-900"} `}
              >
              {loading === "pending" ? "Loading" : "Signup"}
              </button>
            </div>
            
            {
              error && <p className="text-[red] text-[12px] mt-[5px]">{error}</p>
            }
            
        </form>
        
        <div className="text-[12px] mt-3 text-blue-950 cursor-pointer">
          <Link to="/login">If you have an account go to <span className="text-[13.5px] font-semibold">Login</span></Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterRender