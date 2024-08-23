import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {NavLink, Link} from 'react-router-dom'

import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ProductsCart from "./ProductCard";
import {Loading} from "../../Feedback/index";

import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import { actGetProductsByCatPrefix, productsCleanUp } from "../../../RTK-STORE/products/productsSlice";




const ProductsSlider = () => {
  
  const params = useParams()
  const dispatch = useAppDispatch()
  const {loading, error, records} = useAppSelector((state) => state.products)
  
  const cartItems = useAppSelector((state) => state.cart.items)
  
  // text ......
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
  }));


  
  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);
  
  
  
  
  
  
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  
  const productsList = productsFullInfo.length >= 1 ? (productsFullInfo.map((itemData) => (
       <ProductsCart {...itemData} key={itemData.id} />
      ))) : (<h4>No Data</h4>)
  
  
  
  
  return (
    <section className="bg-slate-200 lg:px-20 px-10 lg:py-20 py-10 flex flex-col justify-center items-center gap-6">
    
      <h1 className="text-2xl">Top Products
      </h1>
      
      <h2 className="text-4xl font-semibold text-gray-900 ">Best Sellers</h2>
      
      <div className="w-full mt-3 ">
        <Loading status={loading} error={error} >
          <Slider {...settings}>
            { productsList }
          </Slider>
        </Loading>

      </div>
      
    </section>
  )
}

export default ProductsSlider