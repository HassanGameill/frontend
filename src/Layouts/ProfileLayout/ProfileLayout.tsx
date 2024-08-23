import React from 'react'
import { Outlet } from "react-router-dom";
import UserProfileRender from '../../Components/C-Pages-UI/UserProfile/UserProfileRender.tsx'


const ProfileLayout = () => {
  return (
    <div className="">
      
     <Outlet />
      
    </div>
  )
}

export default ProfileLayout