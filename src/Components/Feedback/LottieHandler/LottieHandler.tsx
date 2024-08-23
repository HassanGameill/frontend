import React from 'react'
import Lottie from 'lottie-react'
import notFound from '../../../Assets/lottieFiles/notFound.json'
import empty from '../../../Assets/lottieFiles/empty.json'
import loading from '../../../Assets/lottieFiles/loading.json'
import error from '../../../Assets/lottieFiles/error.json'
import success from '../../../Assets/lottieFiles/success.json'


const lottieFilesMap = {
  notFound,
  empty,
  loading,
  error,
  success,
}

type TLottieProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
  
}



const LottieHandler = ({type, message}: TLottieProps) => {
  const lottie = lottieFilesMap[type];
  
  
  return (
    <div className={`flex flex-col items-center justify-center `}>
      <Lottie className="md:w-[300px] mb-[30px]" animationData={lottie} />
      
      {message && <h3 className={`text-[19px] ${type === "error" ? "text-red-700" : "text-gray-500"}`}>{message}</h3>}
    </div>
  )
}

export default LottieHandler