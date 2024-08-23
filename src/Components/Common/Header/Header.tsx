import React from 'react'
import Navigation from './Navigation/Navigation'
import MinHeader from './Min-Header/MinHeader'
import DropList from '../../Ecommerce/DropList/DropList.tsx'

const Header = () => {
  return (
    <header className="">
      
        <div className="brand hidden md:block">
          <MinHeader />
        </div>
        
        <div className="mt-3  z-10 fixed  bottom-0 right-0 py-4 mb-5 md:sticky justify-center md:justify-between    md:px-4 flex items-center  bg-slate-900  w-full rounded-3xl shadow-lg shadow-gray-500 md:rounded-sm md:py-2 ">
        
          <div className="brand hidden md:block">
            <h1 className="text-1xl md:text-2xl font-semibold  text-orange-100">
              Hello
            </h1>
          </div>
          
          <div className="">
           <Navigation />
          </div>
          
          
      </div>
      
        
        
    </header>
  )
}

export default Header