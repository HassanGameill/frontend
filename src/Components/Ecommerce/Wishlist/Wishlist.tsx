import React from 'react'
import {useState, useEffect} from 'react'
import style from './style.module.css'
const {cart_badge, pumpCartQuantity } = style;
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import { addToCart } from "../../../RTK-STORE/cart/cartSlice";

import {getCartTotalQuantitySelector} from "../../../RTK-STORE/cart/Selectors/Selector"; 



const Wishlist = ({cart_badge}: any) => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector((state) => state.wishlist.itemsId);
  
  const quantityStile = `${cart_badge} ${isAnimate ? pumpCartQuantity : ""}`

  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);
  
  return (
    
    
    <div className={`relative`} onClick={() => navigate("/wishlist")}>
      <i className="ri-heart-3-line"></i>
      
        {totalQuantity.length > 0 && (
          <div className={quantityStile}>{totalQuantity.length}</div>
        )}
      
    </div>
    
    
  )
}

export default Wishlist



