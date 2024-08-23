import React from 'react'
import {memo} from 'react'
import {NavLink, Link} from 'react-router-dom'

interface IData {
  title?: string;
  btnTitle: string;
  pathText: string;
}



const Subtitles = memo(({ title, btnTitle, pathText }: IData) => {
  return (
    <div className="flex items-center justify-between pb-2">

      {
        btnTitle ? (
          <Link to={`${pathText}`} className=" text-[#222] text-[15px] ">
            <div className="shopping-now">{btnTitle}</div>
          </Link>
        ) : null
      }

      <div className="sub-title">{title}</div>
    </div>
   )
 }
);
export default Subtitles