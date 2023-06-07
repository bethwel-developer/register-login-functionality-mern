import React from 'react';
import { Link } from 'react-router-dom';
import { useState} from 'react'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { loginRoute } from '../utilis/apiroutes'
import { useNavigate } from 'react-router-dom'

function Login ()  {
  const navigate = useNavigate()

  const [values, setValues]=useState({
    username:"",
    email:"",
    password:"",
  });
  
  const handleChange = (event) =>{
    setValues({...values, [event.target.name]: event.target.value});
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if (handleValidation()) {
    const {password, username}=values;

      const {data} =await axios.post(loginRoute,{
        username,
        password,
      });
      if (data.status===false){
        toast.error(data.msg, ToastMessageContainer);
      }
      if (data.status===true){
        navigate("/home");
      }
    }
  };


        const ToastMessageContainer={
          position:"top-center",
          pauseOnHover:true,
          autoClose:10000,
          closeOnClick:true,
          theme:"light",
        }
        
        const handleValidation = () =>{
          const {password, username}=values;
          
           if(username.length===""){
            toast.error(`Username is a required field`,ToastMessageContainer
            );return false;
         
        }else if(password===""){
          toast.error(`Password is a required field`,ToastMessageContainer
          );return false;
        }
         return true; 
        }


  return (

    <div className='container'>
      
     <div>
       <form  onSubmit={(event) => handleSubmit(event)} className='input'>
        <span className='signup-title'> Sign in
      </span>
<hr></hr>
      <span className='input-bars'>
        <input type='text' name='username' placeholder='Username'
         onChange={e=>handleChange(e)}
        ></input>
        
        <input type='password' name='password' placeholder='Password'
        onChange={e=>handleChange(e)}
        ></input>
        </span>
        <button type='submit' className='signup-button'>sign in</button>
       <div className='accountQ'>
        Do not have an account?  <Link to="/">register</Link> 
       </div>
       </form>
      
       <ToastContainer/>

     </div>
     
   
   </div>
  );
}

export default Login;
