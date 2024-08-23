import React from 'react'
// <i class="ri-heart-3-fill"></i>
import {useEffect, useState, memo} from 'react'
import {Link} from 'react-router-dom'
import {TProducts} from "../../../Types/products"
import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import { addToCart } from "../../../RTK-STORE/cart/cartSlice";
import { actLikeToggle } from "../../../RTK-STORE/wishlistLike/wishlistSlice";
import Dialog from '@mui/material/Dialog';

// removw import { Spinner } from "flowbite-react";

import ButtonLoader from '../../Ecommerce/ButtonLoading/ButtonLoading'
import LoginRender from '../../C-Pages-UI/UserAuth/Login/LoginRender.tsx'





const ProductCard = memo((itemData: TProducts) => {
  // Send Data Cart
  const {id,  img, title, price, cat_prefix , max, quantity, isLiked, isAuthenticated} = itemData;
  
  const dispatch = useAppDispatch();
  
    // Show Dialog .. 
  const [open, setOpen] = useState(false);
  
  
  console.log("products Fire...")
  // cart items
  const cart = useAppSelector((state) => state.cart)
  
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const currentRemainingQuantity = max - (quantity ?? 0);
  
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  
  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false)
    }, 500)
    
    return () => clearTimeout(debounce);
  }, [isBtnDisabled])
  
  // Add To Cart 
  const addToCartHandler = () => {
    dispatch(addToCart(id))
    setIsBtnDisabled(true)
  }
  
  // Wishlist Like Handle Toggle
  
  
  const LikeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }

      } else {
        setOpen(true);
      }
    };

  
  
  
  
  
  return (
    <div className=" flex flex-col justify-center gap-3 items-start   bg-white rounded-3xl shadow-md relative">
      
      
       <Dialog
       sx={{".MuiPaper-root": {background: "#181818", borderRadius: "15px"}}}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <div className="bg-[#181818] text-white rounded-lg px-5  ">
        <span onClick={() => setOpen(false)} className="text-2xl flex justify-end hover:text-red-600 pt-3">X</span>
        <h2 className="text-center pt-2 pb-9">
        You should have an account to use wishlist{"  "}
        <Link to="/login" className="text-blue-300">Go To Login</Link>
        </h2>
      </div>
      
      </Dialog>
    
      <span className={`absolute top-[12px] right-[12px] w-[28px] h-[28px] text-2xl flex flex-col items-center justify-center rounded-[5px] cursor-pointer bg-white shadow-2xl rounded-md text-red-600`} onClick={LikeToggleHandler} >
      
        {
         isLoading ? <ButtonLoader>
         <i className="ri-heart-3-fill text-[10px]"></i>
         </ButtonLoader>: isLiked  ? <i className="ri-heart-3-fill"></i> : <i className="ri-heart-3-line"></i> 
        }
        
      </span>
        
  
      <div className="cursor-pointer container py-1 my-auto px-1 mx-auto ">
        <img src={img} alt="" className="w-[480px] h-[250px] rounded-3xl"/>
      </div>
      
      <div className="flex flex-col  p-3">
        <p className="italic text-gray-500">
          {cat_prefix}
        </p>
        
         
        
        <h1 className="text-[13px] font-semibold ">
          {title}
        </h1>
        
        <h1 className="text-md font-semibold text-red-600 ">
          {price.toFixed(2)}
        </h1>
        <p className=" text-gray-500">
         {quantityReachedToMax ? "limit" : <span className="text-blue-500">{`You can add ${currentRemainingQuantity} item`}</span>}
        </p>
        
        {
          isBtnDisabled ? <button className="flex items-center justify-center bg-blue-100 px-2 py-1.5 gap-2 text-[15px] text-black rounded-md overflow-hidden">
          <ButtonLoader >
            <i className="ri-shopping-cart-line"></i>
          </ButtonLoader >
          
          </button> : <button className={` px-2 py-2 text-[14px] text-white rounded-md transform hover:scale-105 transition-transform duration-300 mt-2  overflow-hidden ${quantityReachedToMax ? "bg-gray-400"  :  "bg-slate-900" }`}
        onClick={addToCartHandler}
        disabled={isBtnDisabled || quantityReachedToMax}
        >Add</button>
        }
      </div>
      
      
    </div>
  )
})

export default ProductCard