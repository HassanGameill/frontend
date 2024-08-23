import React from 'react'
import Avatar from '@mui/material/Avatar';
import {NavLink, Link} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import {authLogout} from '../../../RTK-STORE/Auth/AuthSlice.ts'



type TProfile = {
  name: string;
  path: string;
  icon: any;
}

const ProfileMenu: TProfile[] = [
  
  {
    name: 'Account Details',
    path: '/',
    icon: <i className="ri-user-line"></i>,
  },
  {
    name: 'My Cart',
    path: '/cart',
    icon: <i className="ri-shopping-cart-line"></i>,
  },
  
  {
    name: 'Security',
    path: '/',
    icon: <i className="ri-lock-password-line"></i>,
  },
  
  {
    name: 'Address',
    path: '/',
    icon: <i className="ri-map-pin-line"></i>,
  },
  
  {
    name: 'My Card',
    path: '/profile/card',
    icon: <i className="ri-cash-line"></i>,
  },
  {
    name: 'My Orders',
    path: '/profile/orders',
    icon: <i className="ri-folder-6-fill"></i>,
  },
  
]





const UserProfileRender = () => {
  const dispatch = useAppDispatch();
  const {accessToken, user} = useAppSelector((state) => state.Auth);
  
  const handleLogout = () => {
    dispatch(authLogout())
  }

  return (
    <div>
      <div className="Img_Email flex items-center justify-between bg-[#f0f4f3c8] px-2 py-4 rounded-md shadow-md ">
        <div className="flex items-center gap-3">
          <div className="">
            <Avatar sx={{ background: "#89dbf4c8"}}>{user?.firstName[0]}</Avatar>
          </div>
          
          <div className="flex flex-col mt-1 ">
            <span className="font-semibold text-[11px]">{user?.firstName} {user?.lastName}</span>
            <span className="text-[9px] text-[#7e7e7ec8] ">{user?.email}</span>
          </div>
        </div>
        <span className="ICON text-2xl">
            <i className="ri-arrow-right-s-line"></i>
          </span>
      </div>
      
      <div className="">
        <h3 className="mt-3 mx-1">Settings</h3>
        <div className="flex flex-col gap-2 mt-4">
        {
          ProfileMenu.map((item, idx) => (
            <NavLink key={idx} end to={item.path} className="flex justify-between bg-[#f0f4f3c8] py-3 px-3 rounded-md shadow-md">
              <div className="flex items-center gap-2 px-2 ">
                <span className="text-[18px]">{item.icon}</span>
                <span className="text-[12px]">{item.name}</span>
              </div>
              <span className="text-2xl">
                <i className="ri-arrow-right-s-line"></i>
              </span>
            </NavLink>
          ))
        }
        
        <NavLink to="/" className="flex justify-between bg-[#f0f4f3c8] py-3 px-3 rounded-md shadow-md"
          onClick={handleLogout}
         >
              <div className="flex items-center gap-2 px-2 ">
                <span className="text-[18px]">
                  <i className="ri-login-box-line"></i>
                </span>
                <span className="text-[12px]">Logout</span>
                </div>
        </NavLink>
        
      </div>
      </div>
  
    </div>
  )
}

export default UserProfileRender