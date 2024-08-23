import React from 'react'
import UseProducts from './UseProducts'
import {Loading} from "../../Feedback/index";
import {GridList} from "../../LogicList/index";
import {Heading} from "../../LogicList/index";
import {TProducts} from "../../../Types/products";


const ProductsGridList = () => {
  const {loading, error, productsFullInfo, productPrefix, ProductsList} =  UseProducts();
  
  return (
     <section className="bg-slate-200 lg:px-20 px-4 lg:py-20 py-10 flex flex-col justify-center items-center gap-6 shadow-lg rounded-md">
     
        <Heading title={`${productPrefix} Products `} />
      
       <h2 className="text-4xl font-semibold text-gray-900 ">Best Sellers</h2>
      
      <div className="">
        <Loading status={loading} error={error} type="product" >
          <GridList<TProducts> records={productsFullInfo} renderItem={ProductsList} emptyMessage="Loading please wait"/>
        </Loading>

      </div>
      
    </section>
  )
}

export default ProductsGridList