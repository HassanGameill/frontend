import React from 'react'
import {TProducts} from '../../../Types/products';
import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks';
import useCart from './useCart';
import {actPlaceOrder} from '../../../RTK-STORE/orders/ordersSlice.ts';
import {clearCartAfterPlaceOrder} from '../../../RTK-STORE/cart/cartSlice.ts';
import Dialog from '@mui/material/Dialog';
import {useEffect, useState} from 'react'


// Types .....
type CartSubtotalPriceProps = {
  products: TProducts[];
  shapping: number;
  userAccessToken: string | null;
} 

const CartCheckout = ({products, userAccessToken}: CartSubtotalPriceProps) => {
  
  const dispatch = useAppDispatch();
   // Show Dialog .. 
  const [open, setOpen] = useState(false);
  
  // for get loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   
  // loading Actions button
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
   
   
   const subtotal = products.reduce((accumulator, el) => {
     const price = el.price
     const quantity = el.quantity
     if (quantity && typeof quantity === "number") {
       return accumulator + price * quantity
     } else {
       return accumulator
     }
   }, 0)
   
   
   const dialogHandler = () => {
     setOpen(!open);
     setError(null);
   }
   
   const placeOrderHndler = () => {
     setLoading(true)
     
     dispatch(actPlaceOrder(subtotal)).unwrap().then(() => {
       dispatch(clearCartAfterPlaceOrder());
       // toggle button
       setOpen(false);
     }).catch((error) => {
       setError(error)
     }).finally(() => setLoading(false))
   }
   
  
  return (
    <section>
    <Dialog
       sx={{".MuiPaper-root": {background: "#181818", borderRadius: "15px"}}}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <div className="bg-[#181818] text-white rounded-lg px-16 py-5 text-center ">
        
         <h2 className="text-md">Add order now</h2>
          <h3 className="text-sm text-[#777]">
          Malk, Are you sure to order with subtotal <span className="text-blue-500 text-md">${subtotal.toFixed(2)}</span> </h3>
          
            {!loading && error && (
              <p className="text-red-700">{error}</p>
            )}
          
        </div>
        <div className="flex items-center gap-5 justify-center py-5">
        <button
          className="bg-red-900 px-3 py-1 rounded-md text-white shadow-xl"
          onClick={dialogHandler}
        >cancel</button>
        
        <button
          className={`p-1 rounded-md text-black px-3 py-1 shadow-xl ${loading ? "bg-gray-400 text-white" : "bg-amber-100"}`}
          onClick={placeOrderHndler}
          disabled={loading && isBtnDisabled}
        >
        {loading ? "Loading.." : "Place Order"}
        </button>
        
      </div>
      
      </Dialog>
      
      <div className="CHECK mt-5 shadow-md p-3 bg-[#e0f4e3] rounded-md">
      
        <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-4 pt-3 font-semibold">
          <span className="">Subtotal</span>
          <span className="">${subtotal.toFixed(2)}</span>
        </div>
        
        
        
        <div className="flex items-center justify-between py-4 font-semibold mt-1 text-[18px]">
          <span className="">Total</span>
          <span className="">${subtotal.toFixed(2)}</span>
        </div>
        
        
        <div className="flex justify-center py-2 pt-4">
          {
            userAccessToken && <button className="bg-slate-900 px-20 py-2 text-[#e0f4e3] shadow-2xl rounded-lg font-semibold" onClick={dialogHandler}
            >
            Place Order
            </button>
          }
          
        </div>
      </div>
    </section>
  )
}

export default CartCheckout