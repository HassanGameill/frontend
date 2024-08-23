import React from 'react'

import {useEffect} from 'react'
import CategoryCard from "./CategoryCard";

import {useAppDispatch, useAppSelector} from '../../../RTK-STORE/hooks'
import { actGetCategories, cleanUpProductsRecords } from "../../../RTK-STORE/categories/categoriesSlice";




const useCategories = () => {
  
  const dispatch = useAppDispatch()
  const {loading, error, records} = useAppSelector((state) => state.categories)
  
  useEffect(() => {
    const promise = dispatch(actGetCategories());
    return () => {
        dispatch(cleanUpProductsRecords())
        promise.abort();
      }
  }, [dispatch]);


  
  const renderCategories = (itemData) => (
    <div className="" key={itemData}>
       <CategoryCard {...itemData}/>
    </div>
   
    );
  
  
  
  return {loading, error, records, renderCategories}
}

export default useCategories