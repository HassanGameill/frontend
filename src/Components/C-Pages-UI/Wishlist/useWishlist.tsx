import React from 'react'
import {useEffect, useCallback} from 'react'

import ProductCart from "../Products/ProductCard";
import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import { actGetWishlist, cleanWishlistProductsFullInfo } from "../../../RTK-STORE/wishlistLike/wishlistSlice";



const useWishlist = () => {
  
  const dispatch = useAppDispatch()
  
  const { loading, error, productsFullInfo } = useAppSelector((state) => state.wishlist);
  
  const cartItems = useAppSelector((state) => state.cart.items);
  
  
  useEffect(() => {
    const promise = dispatch(actGetWishlist("ProductsFullInfo"));
    return () => {
      dispatch(cleanWishlistProductsFullInfo())
      promise.abort();
    }
  }, [dispatch])
  
  
  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
    isAuthenticated: true,
  }));
  
  const ProductsList = (itemData) => (
    <ProductCart {...itemData} key={itemData.id} />
  )
  
  
  return {records, loading, error, ProductsList}
}

export default useWishlist