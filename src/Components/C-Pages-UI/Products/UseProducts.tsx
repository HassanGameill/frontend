import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ProductCart from "./ProductCard";
import {Loading} from "../../Feedback/index";
import {GridList} from "../../LogicList/index";
import {Heading} from "../../LogicList/index";

import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import { actGetProductsByCatPrefix, cleanUpProductsRecords } from "../../../RTK-STORE/products/productsSlice";




const UseProducts = () => {
  
  const params = useParams();
  const productPrefix = params.prefix.toUpperCase();
  
  const dispatch = useAppDispatch();
  
  const { loading, error, records } = useAppSelector((state) => state.products);
  
  const cartItems = useAppSelector((state) => state.cart.items);

    // wishlist items Id
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId)
  
  // user access token for show model
  const userAccessToken = useAppSelector((state) => state.Auth.accessToken)
  
  
  // Comment...
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(cleanUpProductsRecords());
      promise.abort()
    };
  }, [dispatch, params]);
  
  
  const ProductsList = (itemData) => (
    <ProductCart {...itemData} key={itemData.id} />
  )
  
  
  
  return {loading, error, productsFullInfo, productPrefix, ProductsList}
}

export default UseProducts