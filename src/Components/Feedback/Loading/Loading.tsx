import React from 'react'
import {TLoading} from '../../../Types/Shared'
import CategorySkeleton from '../../Feedback/Skeletons/CategorySkleton/CategorySkleton'
import ProductSkeleton from '../../Feedback/Skeletons/ProductSkeleton/ProductSkeleton'
import CartSkeleton from '../../Feedback/Skeletons/CartSkeleton/CartSkeleton'
 import {LottieHandler} from "../index"


const skeletonsTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};




type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof skeletonsTypes;
};






const Loading = ({ status, error, children , type = "category"}: LoadingProps) => {
  const Component = skeletonsTypes[type];

  
  
  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return <div> <LottieHandler type="error" message={error as string}/></div>
  }
  
  return <div>{children}</div>;
};



export default Loading