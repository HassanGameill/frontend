import React from 'react'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import {actGetOrders, resetOrderStatus} from '../../../RTK-STORE/orders/ordersSlice.ts'
import {TProducts} from '../../../Types/products.ts';


const useOrders = () => {
  const dispatch = useAppDispatch();
  const {loading, error, orderList} = useAppSelector((state) => state.orders)
  
  // View Product Detaild ... Orders
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProducts[]>([]);
  
  
  const viewDetailsDialog = (id: number) => {
    const productDetails = orderList.find((order) => order.id === id);
    const newItems = productDetails?.items ?? [];
    
    setOpen(true);
    setSelectedProduct((prev) => [...prev, ...newItems])
  }

  
  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus())
    }
  }, [dispatch])
  
  
  const closeDialogHandler = () => {
    setOpen(false);
    setSelectedProduct([]);
  }
  
  
  
  
  
  return {
    loading,
    error,
    orderList,
    open,
    selectedProduct,
    viewDetailsDialog,
    closeDialogHandler,
  }
}

export default useOrders