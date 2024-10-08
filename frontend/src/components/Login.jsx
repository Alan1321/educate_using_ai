import React, { useEffect, useState, useRef } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import loginData from "../data/loginData.json"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const data = {}

  const loginHandler = (e) =>{
    const validLogin = loginData.find(user => user.email === emailRef.current.value && user.password === passwordRef.current.value)
    
    if(validLogin) {
      data.email = emailRef.current.value
      data.password = passwordRef.current.value
      if(emailRef.current.value === 'student@selvie.com'){
        // go to student fill up form
        navigate("/supportform", {state: data})
      }else if(emailRef.current.value === 'adult@selvie.com'){
        //go to adult form
        navigate("/supportform", {state: data})
      }else if(emailRef.current.value === 'admin@selvie.com'){
        
        navigate("/supportform", {state: data})
      }else if(emailRef.current.value === 'community@selvie.com'){
        
        navigate("/supportform", {state: data})
      }else if(emailRef.current.value === 'mentor@selvie.com'){
        
        navigate("/supportform", {state: data})
      }
    }
  }

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome</h2>
            <p>Please enter your details</p>
            <form>
              <input type="email" placeholder="Email" ref={emailRef}/>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" ref={passwordRef}/>
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  {/* <input type="checkbox" id="remember-checkbox" /> */}
                  {/* <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label> */}
                </div>
                {/* <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a> */}
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={loginHandler}>Log In</button>
              </div>
            </form>
          </div>

          {/* <p className="login-bottom-p">
            Don't have an account? <a href="#">Sign Up</a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
