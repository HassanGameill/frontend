import React from 'react'
import {memo} from 'react'


type HeadingProps = {
  children?: React.ReactNode;
  title: string;
}

const Heading = memo(({children, title}: HeadingProps) => {
  return (
    <div className="mb-3 text-[26px] flex  gap-3 ">
      <span className="text-red-800 border-2 border-[#e0f4e3] rounded-lg "></span>
      <h2 className="">{title}</h2>
    </div>
   )
 }
);
export default Heading