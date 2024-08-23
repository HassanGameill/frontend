import React from 'react'
import {useState, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../../../RTK-STORE/hooks'
import {actGetWishlist} from '../../../../RTK-STORE/wishlistLike/wishlistSlice'
import {NavLink, Link} from 'react-router-dom'
import style from './style.module.css'
const {cart_badge} = style;
import BasketCart from '../../../Ecommerce/BasketCart/BasketCart'
import Wishlist from '../../../Ecommerce/Wishlist/Wishlist'
import Avatar from '@mui/material/Avatar';





interface MenuType {
  name: string;
  path: string;
  icon: any;
}

const Menu: MenuType[] = [
  {
    name: 'Home',
    path: '/',
    icon: <i className="ri-home-4-line"></i>,
  },
  
  {
    name: 'Wishlist',
    path: '/wishlist',
    icon: <Wishlist cart_badge={cart_badge}/>,
  },
  
  {
    name: 'Cart',
    path: '/cart',
    icon: <BasketCart cart_badge={cart_badge}/>,
  },
  
  
]

const Navigation = () => {
  const dispatch = useAppDispatch();
  const {accessToken, user} = useAppSelector((state) => state.Auth);
  
  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductsIds"))
    }
  }, [dispatch, accessToken])
  
  return (
    <nav className="md:py-2 re">
        <ul className="flex items-center justify-between">
          {
            Menu.map((item, i) => (
              <li key={i} className=" text-center w-20">
                <NavLink  to={item.path} className="flex flex-col text-white text-center">
                
                  <span className=" md:hidden text-2xl ">
                    {item.icon}
                  </span>
                  
                  <span className="hidden md:block text-sm ">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))
          }
          
          {
            accessToken ? 
            <Link to="/profile" className="">
            <Avatar  sx={{ background: "" }}>{user?.firstName[0]}</Avatar>
           </Link>
            : 
              <NavLink className="text-white"  to="/login">
                <span className="text-2xl md:hidden">
                 <i className="ri-user-line"></i>
                </span>
                <span className="hidden md:block">Profile</span>
                
              </NavLink>
            
          }
        </ul>
    </nav>
  )
}

export default Navigation