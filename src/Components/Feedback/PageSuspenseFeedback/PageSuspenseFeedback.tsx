import React from 'react'
import { Suspense } from 'react'
import { LottieHandler } from '../index'



const PageSuspenseFeedback = ({children}: {children: React.ReactNode}) => {
  return (
    <Suspense fallback={<LottieHandler  type="loading" message="loading please wait.." />}>
        {children}
      </Suspense>
  )
}

export default PageSuspenseFeedback