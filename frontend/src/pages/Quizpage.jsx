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
        // let str = "apple./mango"
        // let new_str = str.replace(/http://localhost:3000/g , "apple")

        // http://localhost:3000/Quiz/0296404f-7909-4e46-97b6-80839a2a5806
        // let url_update = url.replace(/3000/g , 4000);
        // let split = url.split('3000/')

        
        console.log(url)
        // let new_url = server_url
        // let new_url = url.replace(/3000/g , 4000)
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
