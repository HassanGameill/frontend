import React from 'react'
import {memo} from 'react'
import {NavLink, Link} from 'react-router-dom'


interface IData {
  path1?: string;
  leftIcon?: React.ReactNode;
  pageName?: string;
  path2?: string;
  RightIcon?: React.ReactNode;
  
}

const MobileHeading = memo(({ path1, leftIcon, pageName, path2, RightIcon  }: IData) => {
  
  
  return (
    <div className="flex items-center justify-between pb-5">

      <Link to={`${path1}`} className="">
        <div className="text-center text-xl ">{leftIcon}</div>
       </Link>
       
       <div className="">
        {pageName}
       </div>
        
      <Link to={`${path2}`} className=" text-[#222]  ">
        <div className="">{RightIcon}</div>
        
       </Link>
        
    
    </div>
   )
 }
);

export default MobileHeading