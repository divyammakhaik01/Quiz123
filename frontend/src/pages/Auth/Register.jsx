import React from "react";
import { useEffect } from "react";
import { useState  } from "react";
import {useNavigate , useLocation , Link} from "react-router-dom"
import {server_url , client_url} from "../../config/Key"



export const Register = () => {
    
  let [name, setname] = useState();
  let [email, setemail] = useState();
  let [password, setpassword] = useState();
  let [confirmPassword, setconfirmPassword] = useState();
  let [isAdmin, setisAdmin] = useState();
  let navigate = useNavigate()
  let {state} = useLocation()
  let type ;
  // const {type} = state

  useEffect(() => {
    if(window.location.href === `https://quiz0123.onrender.com/admin/register`)
      type =  true 
    else
      type =  false
    // console.log(type);
    setisAdmin(type)
  }, [])
  
  
  
  const submit_Register = async (event) =>{
    
    event.preventDefault();

    console.log(name)
    console.log(email)
    console.log(password)
    console.log(confirmPassword)
    console.log(isAdmin)

      if(password !== confirmPassword){
        alert('password doest match')
        return ;
      }

      try {
        console.log("go");

        let response = await fetch(`https://quiz0123.onrender.com/auth/register` , {
          method : 'POST' , 
          headers:{
            "Content-type" : "Application/json" ,
          } ,
          body:JSON.stringify({
            name , 
            email , 
            password ,
            isAdmin
          })
        })
        console.log(response)
        const data = await response.json();
        console.log(data)

        if(data.status === 'false'){
          alert(`${data.message}`)
          return;
        }else{
          if(isAdmin)
          navigate('/admin/login')
          else
          navigate('/user/login')

        }
      } catch (error) {
        console.log(" error : " , error);
      }
    
  }

  return (
    <>
      <div className="mt-16 flex justify-center ">
        <div className="flex flex-col ">

        <div  className="flex flex-col underline decoration-4 text-xl content-center font-bold  ">
          Register
        </div>

        <input
          className="mt-4 flex border border-sky-500"
          type="text"
          placeholder=" name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          className="mt-4 flex border border-sky-500"
          name="email"
          type="email"
          placeholder=" email"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          className="mt-4 flex border border-sky-500"
          name="email"
          type="password"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input
          className="mt-4 flex border border-sky-500"
          name="email"
          type="password"
          placeholder="confirm password"
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <button onClick={submit_Register} className="mt-4 flex bg-blue-200 hover:bg-blue-400 border border-sky-500 justify-center" type="submit">
          Submit
        </button>
        
        <div className="text-back-800 flex mt-4 ">
          Have account already ? 
          <Link className="text-blue-800 font-bold" to= {isAdmin === true ?  '/admin/login' : '/user/login' }>Login</Link>
        </div>

        </div>

       
        
      </div>
    </>
  );
};
