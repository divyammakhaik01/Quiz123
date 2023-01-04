import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserHomepage = () => {

  const [url, seturl] = useState()

  const navigate = useNavigate()

  const go_to_test = () =>{

    console.log(url)
      let url_unique_id = url.split("Quiz/")
      navigate(`/Quiz/${url_unique_id[1]}`)
    
  }
  
  return (
    <>
      <div className="container flex justify-center mt-60 align-center ">
        <div className="flex flex-col justify-center">
          <div className="flex font-bold text-2xl justify-center mb-4">Enter test URL</div>
          <input
            onChange={((e)=>seturl(e.target.value))}
            className="bg-orange-100 flex w-96 h-14 justify-center text-xl align-center"
            type="text"
          />
          <div className="flex justify-center align-center">
            <button onClick={go_to_test} className="rounded bg-blue-100 hover:bg-blue-800 flex w-64 h-10 mt-4 justify-center align-center font-bold text-2xl	">
              Click
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
