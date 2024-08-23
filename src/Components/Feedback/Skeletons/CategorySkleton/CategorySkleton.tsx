import React from 'react'
import ContentLoader from "react-content-loader"



const CategorySkleton = () => {
  const renderSkeletons = Array(5)
    .fill(0)
    .map((_, idx) => (
      <div key={idx}  className="grid grid-cols-3 items-center justify-center">

        <ContentLoader 
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
  
  >
    <circle cx="28" cy="32" r="15" /> 
    <rect x="8" y="53" rx="0" ry="0" width="39" height="5" />
  </ContentLoader>
       
      </div>
    ));
  return <div className="flex items-center justify-center gap-4 container px-8 md:px-20 mx-auto">{renderSkeletons}</div>;
};
  

export default CategorySkleton


