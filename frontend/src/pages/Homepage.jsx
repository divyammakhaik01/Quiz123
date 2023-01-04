import React from 'react'
import {Login } from '../pages/Auth/Login'
import {Register} from '../pages/Auth/Register'
import {useNavigate} from "react-router-dom"

export const Homepage = () => {
  
  let navigate = useNavigate()


  const handle_teacher_dashboard = () =>{

    let user_data = JSON.parse(localStorage.getItem('user_info'));
    
    if(user_data === null || user_data.data.isAdmin === false){
      navigate('/admin/register' , {
        state:{
          type : true
        }
      })
    }else{
      navigate('/AdminHomepage')
    }

  }

  const handle_student_dashboard = (event) =>{
    let user_data = JSON.parse(localStorage.getItem('user_info'));

    if(user_data === null  || user_data.data.isAdmin === true){
      navigate('/user/register' , {
        state:{
          type : false
        }
      })
    }else{
      navigate('/UserHomepage')
    }
  }
  
  return (
    <>
        <div className='
        rounded
        mt-12 pt-44 flex  flex-1 flex-wrap'>
          <button className='font-mono  bg-red-200 pointer	flex-auto pt-32 pb-32 font-bold font text-4xl 
          transition ease-in-out delay-150 bg-red-200 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 rounded-lg duration-300
          ' onClick={handle_teacher_dashboard}>
            Teacher
          </button>

          <button className='font-mono bg-green-200 pointer flex-auto 	pt-32 pb-32 font-bold font text-4xl
           transition ease-in-out delay-150 bg-green-200 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 rounded-lg duration-300
          '  onClick={handle_student_dashboard}>
            Student
          </button>
        </div>
    </>
  )
}
