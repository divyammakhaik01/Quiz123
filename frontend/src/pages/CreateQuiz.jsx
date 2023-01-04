import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {server_url , client_url} from "../config/Key"

export const CreateQuiz = () => {
  const [questions_list, setquestions_list] = useState([]);
  const [curr_question, setcurr_question] = useState();
  const [optionA, setoptionA] = useState();
  const [optionB, setoptionB] = useState();
  const [optionC, setoptionC] = useState();
  const [optionD, setoptionD] = useState();
  const [current_level, setcurrent_level] = useState();
  const [current_correct_option, setcurrent_correct_option] = useState();
  const [QuizName, setQuizName] = useState();
  const [correct_answers, setcorrect_answers] = useState([]);
  let navigate = useNavigate()

  let cnt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let i = 0;

  const save_answer = () => {
    let curr_ans = [];
    let str_val = correct_answers[correct_answers.length - 1];
    let updated_correct_answers = Object.assign(str_val);

    let obj = {
      question: curr_question,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      optionD: optionD,
      quizName : QuizName ,
      level : current_level,  
      correct_answers: updated_correct_answers,
    };
    console.log(obj);
    console.log(questions_list);

    let curr_list_State = questions_list;
    curr_list_State.push(obj);
    setquestions_list(curr_list_State);

    setoptionA("");
    setoptionB("");
    setoptionC("");
    setoptionD("");
    // setQuizName("");
    setcurrent_level("")
    setcorrect_answers([]);
    setcurr_question("");
    <div className="alert bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
  <strong className="mr-1">Question Added !!!</strong> 
  <button type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  };

  const add_answer = (e) => {
    e.preventDefault();
    let correct_options = correct_answers;
    correct_options.push(e.target.value);
    setcorrect_answers(correct_options);
  };

  const submit_data = async(e) => {
    e.preventDefault()
    
    console.log(questions_list);
    try {
      let token = JSON.parse(localStorage.getItem('user_info')).token

      let res = await fetch(`${process.env.server_url}admin/post_data/` , {
        method: 'POST' , 
        headers : {
          "Content-type" : "Application/json" ,
          'token' : JSON.stringify(token)
        } , 
        body : JSON.stringify({
          questions_list
        })
      })
      const data = await res.json();
      console.log("data : " , data)

      if(data.status === 'true'){
        navigate('/AdminHomepage')
      }else{
        throw("Error")
      }

    } catch (error) {

      alert('Server problem')
      
    }
  };

  return (
    <>
      <h1 className="underline decoration-sky-500 text-xl flex justify-center font-bold">Create Quiz</h1>
      
      <div className="mt-4 underline decoration-sky-500 text-xl flex justify-center font-bold">
        <input onChange={((e)=>setQuizName(e.target.value))} type="text" placeholder="Enter quiz name"/>
      </div>


      {cnt.map((ele) => (
        <div className="mt-4 ml-2">
          {/* Question */}
          <div className="font-bold rounded bg-sky-300 w-24 mb-2">
            Question {ele}
          </div>
          <input
            onChange={(ele) => setcurr_question(ele.target.value)}
            className="font-bold pt-4 container border border-blue-400  "
            type="text"
            placeholder="Enter your question here"
          ></input>

          {/* Optionss */}
          
          <div className="font-bold ">Options</div>

          <div id="options">
            <button>
              (a)
              <input
                className="font-bold border border-red-200"
                onChange={(ele) => setoptionA(ele.target.value)}
                type="text"
                placeholder="Option 1"
              />
            </button>

            <button>
              (b)
              <input
                className="font-bold border border-red-200"
                onChange={(ele) => setoptionB(ele.target.value)}
                type="text"
                placeholder="Option 2"
              />
            </button>

            <button>
              (c)
              <input
                className="font-bold border border-red-200"
                onChange={(ele) => setoptionC(ele.target.value)}
                type="text"
                placeholder="Option 3"
              />
            </button>

            <button>
              (d)
              <input
                className="font-bold border border-red-200"
                onChange={(ele) => setoptionD(ele.target.value)}
                type="text"
                placeholder="Option 4"
              />
            </button>
          </div>

          {/* Answer's */}

          <div className="font-bold ">Answer</div>
          <input
            onChange={add_answer}
            className="font-bold container border border-black mb-2"
            type="text"
            placeholder="enter correct option 
            without leaving space (eg if correct options are a and c then write ac )"
          />

          {/* Level */}
          <div className="font-bold ">Level</div>
          <input
            onChange={((e)=>setcurrent_level(e.target.value))}
            className="font-bold   border border-black mb-2"
            type="text"
            placeholder="Enter  difficulity (1-10)"
          />

        {/* Save current question  */}

          <button
            type="submit"
            onClick={save_answer}
            className="flex font-bold bg-red-200 hover:bg-red-400 w-12 rounded"
          >
            Save
          </button>
        </div>
      ))}

      {/* Submit all question list  */}
      <div className=" flex justify-center ">
      <button
        className=" pt-4 pb-4 pl-4 pr-4 flex mb-12 mt-12 w-24  font-bold bg-blue-600	-200 hover:bg-blue-800 text-white 
        container rounded  "
        onClick={submit_data}
      >
        Submit 
      </button>
      </div>

        
      
    </>
  );
};
