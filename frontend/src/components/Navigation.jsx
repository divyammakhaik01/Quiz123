import React from 'react'
import {useNavigate} from "react-router-dom"

export const Navigation = () => {

  let navigate = useNavigate()



  const handle_Navigaion_btn = () => {
    navigate('/')
  }
  
  return (
    <button onClick={handle_Navigaion_btn} className='underline decoration-sky-500 font-mono mt-2 ml-20 font-bold text-4xl '>
        Quiz
    </button>
  )
}
