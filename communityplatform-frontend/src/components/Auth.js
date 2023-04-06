import React from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signinImage from "../assets/signup.jpg";

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const cookies = new Cookies();

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };

  const submitHandler = async (event) => {
    event.preventDefault(); 
    const { userName,fullName, password, phoneNumber, avatarURL} = form;
    const URL = 'http://localhost:5000/auth';
    const {data: {token, userId, hashedPassword}} = await axios.post(`${URL}/${ isSignUp ? 'signup' : 'login'}`,{
      userName:form.userName, fullName:form.fullName, password: password, avatarURL:form.avatarURL, phoneNumber:form.phoneNumber
    });
    console.log(form);
      cookies.set('token', token)
      cookies.set('userName', userName)
      cookies.set('fullName', fullName)
      cookies.set('userId', userId)

      if(isSignUp){
        cookies.set('phoneNumber',phoneNumber)
        cookies.set('avatarURL', avatarURL)
        cookies.set('hashedPassword', hashedPassword)

      }
      window.location.reload(); //we are reloading the app because it will update the authToken status before moving ahead as it was initally false.
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={submitHandler} >
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                ></input>
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">Username</label>
              <input
                name="userName"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              ></input>
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="number"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                ></input>
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="avatar URL"
                  onChange={handleChange}
                  required
                ></input>
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              ></input>
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                ></input>
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button >{isSignUp ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp
                ? "Already have an account ?"
                : "Don't have an account ?"}
              <span onClick={switchMode}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
