import React from 'react'
import {memo} from 'react'
import {TProducts} from "../../../Types/products"

import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import { addToCart } from "../../../RTK-STORE/cart/cartSlice";

import { cartItemRemove } from "../../../RTK-STORE/cart/cartSlice";




// Type .....
type CartItemsPropsb = TProducts & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};



const CartCard = memo((itemData: TProducts) => {
  // Item Data ....
  const {id, img, title, price, quantity, max, changeQuantityHandler, removeItemHandler} = itemData;
  
  
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)
  
  // Create arry for number 
  const renderOption = Array(max).fill(0).map((_, idx) => {
    const quantity = ++idx;
    return (
      <option value={quantity} key={quantity}>{quantity}</option>
    )
  })
  
  
  // change Quantity item cart
  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +event.target.value
    changeQuantityHandler(id, quantity)
  }
  
  // Removig Item From Cart
  
    
  

  
  // UI incrementItem and decrementItem 
  const incrementItem = () => {
    dispatch(addToCart(id))
  }
  const decrementItem = () => {
    
  }
  
  
  
  
  
  return (
    <section>
      <div className="shadow-md px-2 py-2 bg-amber-100 rounded-md">
      
         <span className="text-md  pb-1 hover:text-red-700" onClick={() => removeItemHandler(id)}>
          <i className="ri-delete-bin-6-line"></i>
         </span>
         
        <div className="flex items-center justify-between ">
      
        <div className="Content flex items-center gap-3 ">
            
          <div className="w-[60px]  rounded-2xl container  mb-3 m-auto flex justify-center ">
           <img src={img} alt={title} className="w-[100%] shadow-lg rounded-xl"/>
          </div>
          
          <div className="font-semibold">
            <h2 className="text-[14px] text-slate-900 ">{title}</h2>
            <p className="text-[12px] text-gray-500">${" "}{price.toFixed(2)}</p>
          </div>
          
        </div>
      
        <div className="SELCT_OPTION flex flex-col items-center gap-1">
          <h3 className="text-[10px] font-semibold">Quantity</h3>
          
        
            <select className="outline-none bg-white text-slate-900 rounded-md p-1 shadow-2xl " value={quantity} onChange={changeQuantity}>
            {renderOption}
             </select>
          
            
        </div>
        
        
        <div className=" hidden flex flex-col items-center justify-center text-md p-1 gap-1">
          <span className="text-xl" onClick={incrementItem} >+</span>
          <span className="bg-cyan-950 rounded-md px-2 py-1 text-sm text-white ">{quantity}</span>
          
          <span className="text-xl " onClick={decrementItem}>_</span>
        </div>
      </div>
      </div>
      
      
      
    </section>
  )
});

 

export default CartCard