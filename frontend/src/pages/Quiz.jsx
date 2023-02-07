import {React , useState , useEffect} from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
export const Quiz = () => {

    const [questions, setquestions] = useState([])
    const [x_y_axis_list, setx_y_axis_list] = useState([])
    const [visited_question_number, setvisited_question_number] = useState([])
    const [current_question, setcurrent_question] = useState()
    const [current_options, setcurrent_options] = useState({})
    const [current_answers, setcurrent_answers] = useState([])
    const [current_choosen_answers, setcurrent_choosen_answers] = useState([])
    const [total_score, settotal_score] = useState()
    const [total_attempt, settotal_attempt] = useState()
    const [question_level, setquestion_level] = useState()
    const [current_question_index, setcurrent_question_index] = useState()
    
    const {state} = useLocation()
    const navigate = useNavigate()
   

    useEffect(() => {
        let ques = state.questions

        ques.sort((a,b)=>Number(a.level)-Number(b.level))
        
        if(state.questions.length === 0)    
            {
                alert('No question found')
                return;
            }

            let optionArray = state.questions[4].options
            let index_Arr = ['a','b','c','d'] ;
            let iterator = 0
            let new_optionArray = optionArray.map((val)=>{
                return {
                    index : index_Arr[iterator++] ,
                    value : val

                }
            })
        // -------------------------------------------------
        setquestions(state.questions)

        settotal_score(0)
        setvisited_question_number([4])
        setcurrent_question(state.questions[4].question_name )
        setcurrent_options((new_optionArray))
        setcurrent_answers(state.questions[4].answers)
        setquestion_level(state.questions[4].level)
        setcurrent_question_index(4)
        settotal_attempt(1)

        // -------------------------------------------------
            
        
    }, [])

 
    

    const submit_answer = (e) =>{
        e.preventDefault();

        let isIncorrect = false ;
        
        let choosen_answers = current_choosen_answers ;
        let answers = current_answers ;
        console.log(choosen_answers );
        console.log(answers );
        
        if(choosen_answers.length !== answers.length){
            isIncorrect  = true
        }else{
            for(let i = 0 ; i < answers.length ; i++){
                if(answers[i] !== choosen_answers[i]){
                    isIncorrect = true
                    break
                }
            }
        }
        
        // 
        if(isIncorrect){

            if(current_question_index == 0){
                navigate('/scores', {
                    state:{
                        score : Number(total_score) , 
                        dataset : x_y_axis_list
                    }
                })
                // alert(Number(total_score/total_attempt))
                setquestions(state.questions)
                return
            }else{
                let nextIndex = -1;

                for(let i = Number(current_question_index)-1 ; i >= 0 ; i--){
                    if(visited_question_number.includes(i) === false){
                        nextIndex = i
                        break
                    }
                }
                console.log(x_y_axis_list);
                if(nextIndex == -1){
                    navigate('/scores', {
                        state:{
                            score : Number(total_score) , 
                            dataset : x_y_axis_list
                        }
                    })
                // alert(Number(total_score/total_attempt))
                    setquestions([])
                    return
                }else{
                    let optionArray = state.questions[nextIndex].options
                    let index_Arr = ['a','b','c','d'] ;
                    let iterator = 0                    
                    let new_optionArray = optionArray.map((val)=>{
                        return {
                            index : index_Arr[iterator++] ,
                            value : val
        
                        }
                    })                    
                    let list = []
                    list.push(Number(total_score))
                    list.push(Number(total_attempt))
                    let x_y_list = x_y_axis_list
                    x_y_list.push(list)
                setx_y_axis_list(x_y_list)
                console.log(x_y_list);

                setvisited_question_number([...visited_question_number , nextIndex])
                settotal_score(Number(total_score)-2)
                setcurrent_question(state.questions[nextIndex].question_name )
                setcurrent_options((new_optionArray))
                setcurrent_answers(state.questions[nextIndex].answers)
                setquestion_level(state.questions[nextIndex].level)
                setcurrent_question_index(nextIndex)
                settotal_attempt(Number(total_attempt)+1)                  
                }
            }
        }else{

            if(current_question_index == 9){
                navigate('/scores', {
                    state:{
                        score : Number(total_score) , 
                        dataset : x_y_axis_list
                    }
                })
                // alert(Number(total_score/total_attempt))
                setquestions([])
                return;
            }else{
                let nextIndex = -1;

                for(let i = Number(current_question_index)+1 ; i < 10 ; i++){
                    if(visited_question_number.includes(i) === false){
                        nextIndex = i
                        break
                    }
                }
                if(nextIndex == -1){
                    navigate('/scores', {
                        state:{
                            score : Number(total_score) , 

                        }
                    })
                    // alert(Number(total_score/total_attempt))
                    setquestions([])
                    return
                }else{
                    let optionArray = state.questions[nextIndex].options
                    let index_Arr = ['a','b','c','d'] ;
                    let iterator = 0                    
                    let new_optionArray = optionArray.map((val)=>{
                        return {
                            index : index_Arr[iterator++] ,
                            value : val
        
                        }
                    })                         
                    let list = []
                    list.push(Number(total_score))
                    list.push(Number(total_attempt))
                    let x_y_list = x_y_axis_list
                    x_y_list.push(list)
                setx_y_axis_list(x_y_list)
                console.log(x_y_list);

                setvisited_question_number([...visited_question_number , nextIndex])
                settotal_score(Number(total_score)+5)
                setcurrent_question(state.questions[nextIndex].question_name )
                setcurrent_options((new_optionArray))
                setcurrent_answers(state.questions[nextIndex].answers)
                setquestion_level(state.questions[nextIndex].level)
                setcurrent_question_index(nextIndex)
                settotal_attempt(Number(total_attempt)+1)                  
                }
            }
          
        }

        setcurrent_choosen_answers([])

        
    }

    const add_answers = (e) =>{
        e.preventDefault();
        console.log(e.target.value)
        setcurrent_choosen_answers([...current_choosen_answers, e.target.value])
    }
    
  return (
    <>

        <div className=' container  mt-40 flex justify-center drop-shadow-lg'>

            <div className='max-w-lg flex flex-col border-bg-black-800  bg-blue-100'>

            {
                <>
                {/* question */}
                <div className='max-w-md flex mt-4 font-bold pr-4  '>Q1.{current_question} ?</div>
                {/* difficulty */}

                <div className='max-w-md font-bold text-amber-400'>Difficulty level : {question_level}</div>
                
                {/* options */}
                <div className=' flex  flex-col  '>
                    {/* total count of anaswer's  */}
                    {
                        current_answers.length === 1 ? (
                            <div className='mb-4 flex font-medium'>Only one correct answer</div>
                        ) : (
                            <div className='mb-4 flex font-medium'>Multiple correct answer</div>
                        )
                    }
                    {
                        Object.keys(current_options).map((index)=>(
                            <>
                            <div className='flex flex-row justify-center'>
                                {/* check if index is clicked or not */}
                            {
                                current_choosen_answers.includes(current_options[index].index) ? (
                                    <button value={current_options[index].index} onClick={add_answers} className='w-56 max-w-md pr-16 pl-16 rounded flex bg-blue-800  text-white font-bold ml-16 mr-16 mb-2 justify-center'> 
                                    {current_options[index].value}
                                    </button>
                                ) : (
                                    <button value={current_options[index].index} onClick={add_answers} className='w-56 max-w-md pr-16 pl-16 rounded flex bg-blue-400  text-white font-bold ml-16 mr-16 mb-2 justify-center'> 
                                    {current_options[index].value}
                                    </button>
                                )

                            }

                            </div>
                            </>
                        ))
                    }
                </div>

                {/* Submit */}
                <button onClick = {submit_answer}  className='mr-32 ml-32 mb-2  rounded flex font-bold bg-red-300 hover:bg-red-400 justify-center'>
                        Submit
                </button>
                
                </>
            }
            </div>
            
            
        </div>

    </>
  )
}
