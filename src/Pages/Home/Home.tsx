import React from 'react'
import conImage from '../../Assets/Svg/connection.svg'

import CategorySlider from '../../Components/C-Pages-UI/Category/CategorySlider'
import ButtonLoader from '../../Components/Ecommerce/ButtonLoading/ButtonLoading'


const Home = () => {
  return (
    <div className="">
      <div className="image">
        <img src={conImage} alt="" />
      </div>
      
      <div className="pt-8 py-8">
        <CategorySlider />
        
      </div>
      
      <div className="pt-5 pb-8">
        
      </div>
    </div>
  )
}

export default Home