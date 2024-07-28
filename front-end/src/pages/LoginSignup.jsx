import React, { useState } from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {

  const [state,setstate]=useState("Login");
  const [formdata,setformdata]=useState({
    username:"",
    password:"",
    email:"",
  });

  const changeHandler=(e)=>{
    setformdata({...formdata, [e.target.name] : e.target.value})
  }

  const login=async (req,res)=>{
    console.log("login executed",formdata);

    let responsedata;
    await fetch('http://localhost:4000/login',{
      method:"POST",
      headers:{
        accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata),
    }).then((res)=>res.json()).then((data)=>responsedata=data);

    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace('/');
    }
    else{
      alert(responsedata.errors);
    }
  }
  const signup=async (req,res)=>{
    console.log("signup executed",formdata);

    let responsedata;
    await fetch('http://localhost:4000/signup',{
      method:"POST",
      headers:{
        accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata),
    }).then((res)=>res.json()).then((data)=>responsedata=data);

    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace('/');
    }
    else{
      alert(responsedata.errors);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state==="Sign Up" ? <input type="name" name='username' value={formdata.username} onChange={(e)=>changeHandler(e)} placeholder='Your Name' /> : <></>}
          <input type="email" name="email" value={formdata.email} onChange={(e)=>changeHandler(e)}  placeholder='Email Address'/>
          <input type="password" name="password" value={formdata.password} onChange={(e)=>changeHandler(e)} placeholder='Password'/>
        </div>
        
          <button onClick={()=>{state==="Login" ? login() : signup()}}>Continue</button>
          {state==="Sign Up"?
          <p className="loginsignup-login">Already have an account?<span onClick={()=>{setstate("Login")}}>Login here</span></p>:
          <p className="loginsignup-login">Create an account?<span onClick={()=>{setstate("Sign Up")}}>Click here</span></p>}
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, i agree to the terms of use & privacy policy </p>
          </div>
      </div>
    </div>
  )
}

export default LoginSignup
