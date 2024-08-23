import React from 'react'
import useWishlist from './useWishlist'
import {Heading} from "../../LogicList/index"
import {Loading} from "../../Feedback/index";
import {GridList} from "../../LogicList/index";


const WishlistView = () => {
  
  const {records, loading, error, ProductsList} = useWishlist();
  
  
  return (
    <section className="bg-pink-100 lg:px-20 px-10 lg:py-20 py-10 flex flex-col justify-center items-center gap-6 shadow-md rounded-md">
    
      <Heading title={`Your Wishlist`} />
      <Loading status={loading} error={error} >
          <GridList records={records} renderItem={ProductsList} emptyMessage="Your wishlist is empty" />
        </Loading>
    </section>
  )
}

export default WishlistView