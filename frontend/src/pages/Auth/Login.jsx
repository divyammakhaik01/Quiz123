import {React ,useState}from 'react'
import {useNavigate , Link} from "react-router-dom"
import {server_url , client_url} from "../../config/Key"


export const Login = () => {
    
    let [email, setemail] = useState();
    let [password, setpassword] = useState();
    let [confirmPassword, setconfirmPassword] = useState();
    let navigate = useNavigate()
  
    const submit_Login = async(event) =>{
        event.preventDefault();
        if(password !== confirmPassword){
          alert('password and confirmPassword not matching')
          return;
        } 
        try {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> ||||||   " , `${server_url}auth/login` )
          // let response = await fetch(`${server_url}auth/login` , {
            let response = await fetch(`https://quiz0123.onrender.com/auth/login` , {
            method : 'POST' , 
            headers:{
              "Content-type" : "Application/json" ,
            } ,
            body:JSON.stringify({
              email , 
              password ,
            })
          })
          const data = await response.json();
          if(data.status === 'false'){
            throw data.message
          }else{
            console.log(data.message);
            localStorage.setItem('user_info' , JSON.stringify(data.message))
            navigate('/')
          }
        } catch (error) {
          alert(`${error}`)
          return;
        }
        
    }
    
    const register = () => {
      let user_data = JSON.parse(localStorage.getItem('user_info'));
    
      if(user_data === null){
        navigate('/login')
      }
      else if(user_data.data.isAdmin === false){
        navigate('/register' , {
          state:{
            type : true
          }
        })
      }else{
        navigate('/AdminHomepage')
      }
    }
    
    
  return (
    <>
    <div className="mt-16 flex justify-center ">
      <div className="flex flex-col">

      <div className="flex flex-col font-bold">Login</div>
      <input
        className="mt-4 flex border border-sky-500"
        name="email"
        type="email"
        placeholder=" email"
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        className="mt-4 flex border border-sky-500"
        name="text"
        type="password"
        placeholder="password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <input
        className="mt-4 flex border border-sky-500"
        name="text"
        type="password"
        placeholder="confirm password"
        onChange={(e) => setconfirmPassword(e.target.value)}
      />

      <button onClick={submit_Login} className="mt-4 flex bg-blue-200 hover:bg-blue-400 border border-sky-500 justify-center" type="submit">
        Submit
      </button>

      <div className="text-back-800 flex mt-4 ">
          Don't have an account ? 
          <Link className="text-blue-800 font-bold" to={window.location.href === `https://quiz0123.onrender.com/admin/login` ? "/admin/register" : "/user/register" }>Register</Link>
        </div>


      </div>

    </div>
  </>
  )
}
