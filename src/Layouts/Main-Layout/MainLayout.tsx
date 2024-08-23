import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../../Components/Common/Header/Header'
import Footer from '../../Components/Common/Footer/Footer'
import image from '../../Assets/Svg/connection.svg'
import style from './style.module.css'
import {BrowserRouter , Route } from 'react-router-dom';
const {main_container, wrapper} = style;



const MainLayout = () => {
  return (
    <div className={`${main_container} container px-5 mx-auto`}>
  
      <Header />
      
      <div className={wrapper}>
        <Outlet />
      </div>
      
      <Footer />
          
    </div>
  )
}

export default MainLayout