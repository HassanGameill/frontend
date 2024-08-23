import React from 'react'
import {useAppDispatch, useAppSelector} from '../../RTK-STORE/hooks'
import { actAuthRegister, resetUi } from "../../RTK-STORE/Auth/AuthSlice";
import {Link, useNavigate, Navigate} from 'react-router-dom'

type Tprotect = {
  children: React.ReactNode;
}

const ProtectedRoute = ({children}: Tprotect) => {
  const diapach = useAppDispatch();
  const {accessToken} = useAppSelector((state) => state.Auth)
  
  if (!accessToken) {
    return <Navigate to="/login?message=login_required" />
  }
  
  
  return <>{children}</>
}

export default ProtectedRoute