import React from 'react'
import {LottieHandler} from '../../Components/Feedback/index'


import {NavLink, Link, useRouteError, isRouteErrorResponse} from 'react-router-dom'

const Error = () => {
  
  
  
  return (
    <div className="container px-5 mx-auto text-center pt-40">
      <LottieHandler type="notFound" />
      
      <Link to='/' replace={true} className="text-sm text-blue-600">
        Go to Home page
      </Link>
    </div>
  )
}

export default Error