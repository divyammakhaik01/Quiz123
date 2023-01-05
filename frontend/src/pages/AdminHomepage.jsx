import { React, useState , useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {server_url , client_url} from "../config/key"


export const AdminHomepage = () => {
  
  const [quizList, setquizList] = useState([]);
  const [isActive, setisActive] = useState(true);
  let navigate = useNavigate()


  useEffect( () => {

    const getURL= async() =>{
      let token = JSON.parse(localStorage.getItem('user_info')).token
      console.log(token)
  
      let response = await fetch(`https://quiz0123.onrender.com/admin/get_all_url` , {
        method : 'GET' , 
        headers : {
          "Content-type" : "Application/json" ,
          'token' : JSON.stringify(token)
        }
      })
      const data = await response.json();    
      console.log(":: " , data.message);
      setquizList((data.message))
    }
    getURL()
  }, [isActive])

  const create_questions = () =>{
    navigate('/AdminHomepage/createQuiz')

  }
  
  const activate_link = async(e) => {
    e.preventDefault();
  let url = e.target.value 
  let token = JSON.parse(localStorage.getItem('user_info')).token
    console.log(url);
    try {

      const res = await fetch(`https://quiz0123.onrender.com/admin/activate_url/${url}`, {
        method:'PATCH',
        headers : {
          "Content-type" : "Application/json" ,
          'token' : JSON.stringify(token)
        } 
      })
      const data = await res.json()
      setisActive(!isActive)
      console.log("activate : ",data)
    } catch (error) {
        alert("Error : " , error)
    }

  }

  const deactivate_link = async(e) => {
    e.preventDefault();
    let url = e.target.value 
    let token = JSON.parse(localStorage.getItem('user_info')).token
      console.log(url);
    try {
      const res = await fetch(`https://quiz0123.onrender.com/admin/deactivate_url/${url}`, {
        method:'PATCH',
        headers : {
          "Content-type" : "Application/json" ,
          'token' : JSON.stringify(token)
        } 
      })
      const data = await res.json()
      setisActive(!isActive)
      console.log("deactivate : ",data)
    } catch (error) {
        alert("Error : " , error)
    }   
  }

  return (
    <>
      <div className="mt-10 flex justify-center ">
        <div className="flex flex-col w-full">

          <div className="flex mt-4 flex   px-40 w-full justify-center font-mono underline decoration-wavy ">
            <div className="flex font-bold text-4xl">Teacher's Dashboard</div>
          </div>

          <button className="flex mt-4 flex  font-mono   underline decoration-sky-500  px-40">
            <div onClick={create_questions} className="flex font-bold text-4xl text-blue-800">Create Test</div>
          </button>


          {/* <div className="mt-20 flex mt-4 flex-row border border rounded container font-mono ">
            <div className="mr-96 flex flex-row  h-12 bg-red-100 font-bold ">
              Test URL's
            </div>
            <div className="flex flex-row  h-12 bg-red-100 font-bold ">
              Active
            </div>

            <div className="flex flex-row  h-12 bg-red-100 font-bold ">
              Copy
            </div>
            
          </div> */}

          <div className=" flex mt-4 flex-col border border rounded container font-mono ">
            {
                quizList.length !== 0 ? quizList.map((_url) => (
              
              <div className="flex flex-row justify-between h-12 mb-2 bg-blue-100 font-bold">
                
                <button className="flex ml-2 font-bold rounded">
                    {`https://quiz0123.onrender.com/Quiz/${_url.url}`}
                </button>


                <div className="flex mr-6 ">
                  <div className="flex flex-row ">
                    {
                      _url.isActive === true ? (
                        <>
                        <button value={_url.url} onClick={activate_link} className="flex ml-2 bg-green-800	 font-bold w-12 justify-center">Yes</button>
                        <button value={_url.url} onClick={deactivate_link} className="flex ml-2 bg-red-200 font-bold w-12 justify-center ">No</button>
                        <button value={_url.url}  onClick={((e)=>  navigator.clipboard.writeText(`${client_url}Quiz/${e.target.value}`))} className="flex ml-2 bg-red-200 font-bold w-12 justify-center hover:bg-red-400 ">COPY</button>
                        </>
                      ) : (
                        <>
                        <button value={_url.url} onClick={activate_link} className="flex ml-2 bg-green-100 font-bold w-12 justify-center ">Yes</button>
                        <button value={_url.url} onClick={deactivate_link} className="flex ml-2 bg-red-800 font-bold w-12 justify-center ">No</button>
                        <button value={_url.url}  onClick={((e)=>  navigator.clipboard.writeText(`${client_url}Quiz/${e.target.value}`))} className="flex ml-2 bg-red-200 font-bold w-12 justify-center hover:bg-red-400 ">COPY</button>
                        </>
                      )
                    }

                  </div>
                </div>

              </div>
            ))
            :
            <div className="flex ">No test created  !!</div>
        } 
          </div>
        </div>
      </div>
    </>
  );
};
