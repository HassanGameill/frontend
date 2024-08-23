import React from 'react'
import style from './style.module.css'
import {NavLink, Link} from 'react-router-dom'
const {cart_badge} = style;
import BasketCart from '../../../Ecommerce/BasketCart/BasketCart'
import Wishlist from '../../../Ecommerce/Wishlist/Wishlist'


const MinHeader = () => {
  return (
    <div className="md:px-8 flex items-center justify-between">
    
      <h1 className="flex items-center text-2xl  gap-3">
        <span className="font-bold">Hello</span>
        <span className="text-[16px] font-semibold px-3 p-1  md:p-2 bg-[#e0f4e3] text-gray-900 rounded-md">Commerce</span>
      </h1>
      <div className="flex items-center justify-center gap-5">
      
         <NavLink to='wishlist' className=" text-[22px] mt-4 text-slate-900 ">
          <Wishlist cart_badge={cart_badge}/>
         </NavLink>
         
         <NavLink to='cart' className=" text-[22px] mt-4 text-slate-900 ">
          <BasketCart cart_badge={cart_badge}/>
         </NavLink>
        
      </div>
     
      
      
    </div>
  )
}

export default MinHeader