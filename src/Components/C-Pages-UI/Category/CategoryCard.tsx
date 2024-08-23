import React from 'react'
import {Link} from 'react-router-dom'
import {TCategory} from "../../../Types/category"



const CategoryCard = (itemData: TCategory) => {

 const {id, title, img, prefix} = itemData;


  return (
    <div className="flex flex-col items-center shadow-lg rounded-xl">
      <Link to={`/categories/products/${prefix}`}>
        <div className="overflow-hidden rounded-full bg-[#f2f2f2] w-[70px] h-[70px]  ">
        <img src={img} alt=""
          className="w-full m-auto "
        />
      </div>
      <h4 className="text-center text-[14px] pt-2">
        {title}
      </h4>
      </Link>
      
    </div>
  )
}

export default CategoryCard