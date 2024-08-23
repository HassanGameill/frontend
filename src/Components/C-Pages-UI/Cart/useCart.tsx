import React from 'react'
import {useEffect, useCallback} from 'react'
import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import { 
  addGetProductsByItems,
  cleanCartProductsFullInfo,
  cartItemsChangeQuantity,
  cartItemRemove
} from "../../../RTK-STORE/cart/cartSlice";

import {resetOrderStatus} from "../../../RTK-STORE/orders/ordersSlice.ts";




const useCart = () => {
  
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );
  
  const userAccessToken = useAppSelector(state => state.Auth.accessToken);
  
  
  const placeOrderStatus = useAppSelector(state => state.orders.loading);
  
  
  

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));



  // cahnge Quantity handler 
  const changeQuantityHandler = useCallback((id: number, quantity: number) => {
    dispatch(cartItemsChangeQuantity({id, quantity}))
  }, [dispatch]);
  
  
  // Removig For Item Cart 
  const removeItemHandler = useCallback((id: number) => {
    dispatch(cartItemRemove(id))
  }, [dispatch])
  
  
  useEffect(() => {
   const promise = dispatch(addGetProductsByItems());
    return () => {
      promise.abort();
      dispatch(cleanCartProductsFullInfo())
      dispatch(resetOrderStatus())
    }
  }, [dispatch]);


  return {
    loading, 
    error, 
    productsFullInfo, 
    changeQuantityHandler, 
    removeItemHandler,
    products,
    userAccessToken,
    placeOrderStatus
    }
}

export default useCart