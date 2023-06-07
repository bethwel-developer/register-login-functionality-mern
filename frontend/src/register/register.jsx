import React from 'react';
import "./register.css"
import { Link,useNavigate } from 'react-router-dom';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {registerRoute} from "../utilis/apiroutes"


function Register  ()  {
  const navigate =useNavigate()

  const [values, setValues] = useState({
    username:"",
       email:"",
    password:""
  });

  const handleChange =(event)=>{
    setValues ({...values,[event.target.name]:event.target.value})
  };

  const handleSubmit = async (event)=>{
  event.preventDefault();

  if (handleValidation ()) {
    const {username,email,password}= values;
    const {data}= await axios.post(registerRoute, {username, email,
      password,
    });
    if (data.status===false){
      toast.error(data.msg, ToastMessageContainer);
    }
    if (data.status===true){
      navigate ("/login");
    }
  }

  };

const ToastMessageContainer ={
position:"top-center",
autoClose:4000,
theme: "light",
closeOnClick:true,
pauseOnHover:true,
}

const handleValidation = () => {
  const {username,email,password}=values;

  if(username.length<4){
    toast.error ("😴🥱username must be more than 4 characters", ToastMessageContainer); return false;
  }else if(email===""){
    toast.error ("🤔🤔email is a required field", ToastMessageContainer); return false;
}else if(password.length<4){
    toast.error ("😔password must be more than 4 characters", ToastMessageContainer) ; return false;
}
  return true;
}



  return (
    <div className='container'>
      
     <div>
       <form className='input' onSubmit={(event) => handleSubmit(event)} >
        <span className='signup-title'> Sign up
      </span>
<hr></hr>
      <span className='input-bars'>
        <input type='text'  name="username" 
        placeholder='Username'
        onChange={event=>handleChange(event)}
        ></input>

        <input 
        type='email'  name="email" 
        placeholder='Email'
        onChange={event=>handleChange(event)}
        ></input>

        <input 
        type='password'  name="password" placeholder='Password'
        onChange={event=>handleChange(event)}
        ></input>
        </span>
        <button type='submit' className='signup-button'>sign up</button>
       <div className='accountQ'>
        Already have an account? <Link to="/login">login</Link> 
       </div>
       </form>
      <ToastContainer/>


     </div>
     
   
   </div>
  );
}

export default Register;
