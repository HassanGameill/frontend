import React from 'react'
import useCategories from "./useCategories";
import {Loading} from "../../Feedback/index";
import {SliderList} from "../../LogicList/index"
import Subtitles from '../../Common/Subtitles/Subtitles'


  
 const CategorySlider = () => {
   const {loading, error, records, renderCategories} = useCategories();

  
  return (
    <div className="container px-5 mx-auto   ">
       <div className="">
        <Subtitles  btnTitle="Categories" pathText="categories"/>
       </div>
       
       <Loading status={loading} error={error} type="category">
       
        <SliderList records={records} renderItem={renderCategories} />
        
       </Loading>
       
   </div>
  )
}

export default CategorySlider