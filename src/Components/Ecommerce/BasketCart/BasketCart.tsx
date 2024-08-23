import React from 'react'
import {useState, useEffect} from 'react'
import style from './style.module.css'
const {cart_badge, pumpCartQuantity } = style;

import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import { addToCart } from "../../../RTK-STORE/cart/cartSlice";

import {getCartTotalQuantitySelector} from "../../../RTK-STORE/cart/Selectors/Selector"; 





const BasketCart = ({cart_badge}: React.ReactNode) => {
  const [isAnimate, setIsAnimate] = useState(false)
  
  const totalQuantity = useAppSelector(
  getCartTotalQuantitySelector)
  
  console.log(totalQuantity)
  
  
  const quantityStile = `${cart_badge} ${isAnimate ? pumpCartQuantity : ""}`
  
  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    
    setIsAnimate(true)
    const debounce = setTimeout(() => {
      setIsAnimate(false)
    }, 400)
    
    return () => clearTimeout(debounce);
  }, [totalQuantity])
  
  
  
  return (
    <div className="relative">
       <i className="ri-shopping-cart-line"></i>
      {
        totalQuantity > 0 ? <span className={`${quantityStile}`}>
      {totalQuantity}
      </span> : null
      }
    </div>
      
  )
}

export default BasketCart