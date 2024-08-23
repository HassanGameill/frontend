import style from './style.module.css'
const {loader} = style;

import React from 'react'

const ButtonLoading = ({children}: any) => {
  return (
      <div className="flex justify-center items-center relative">
        <span className={`${loader} border-green-400`}>
        </span>
        <span className="absolute">
           {children}
        </span>
      </div>
  )
}

export default ButtonLoading