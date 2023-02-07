import {React, useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {server_url , client_url} from "../config/Key"


export const Quizpage = () => {


    const navigate = useNavigate()    
    
    

    const start_quiz = async() => {
        let url = window.location.href;
        console.log(url)
        let token = JSON.parse(localStorage.getItem('user_info'))
        if(token  ==  null){
            alert("Not Authorized")
            return
        } 
        
        console.log(url)
        const res = await fetch(`${url}` , {
            method : "GET" , 
            headers :{
                'Content-type' : 'Application/json',
                'token' : JSON.stringify(token.token)
            }
        })
        const data = await res.json()
        console.log(res);
        console.log(data);
        console.log(data.message);
         
        if(data.message === "Not active"){
            alert("Test Not active ")
            return
        }else{
            navigate('/Quiz' , {
                state : {
                    questions : data.message ,
                }
            })
        }
    }
    
    
  return (
    <>

    <div>
        <div className='font-bold cursor-pointer text-4xl pt-40 pb-40 ml-96 mr-96 flex bg-neutral-600	 text-white cursor mt-40 rounded-lg   justify-center 
          transition ease-in-out delay-150 bg-neutral-600 hover:-translate-y-1 hover:scale-110 hover:bg-neutral-800 rounded-lg duration-300

        ' onClick={start_quiz}>
            <div className='flex'>
            Start Quiz
            </div>
        </div>
    </div>
    
    </>
  )
}
