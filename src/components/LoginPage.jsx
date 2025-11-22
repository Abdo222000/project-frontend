import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { login } from '../store/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function LoginPage({ api_url }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // function myHandleSubmit(data){
  //   console.log(
  //     {
  //       username: data.username,
  //       passwd: data.passwd,
  //     });
  //     reset();
  // }
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  async function myHandleSubmit(data) {
    setIsLoading(true);

    // console.log(
    //   {
    //     email: data.email,
    //     passwd: data.passwd,
    //   });
    const API_URL = `${api_url}login/`;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers':'*'
        },
        body: JSON.stringify({
          username: data.email,
          password: data.passwd
        }),
      });
      const result = await response.json();
      if (response.ok) {
        // console.log("Login Successful! Token/Data:", result);
        alert("Login successful!");
        // store the users info in localstorage
        // localStorage.setItem('userToken', result.token);
        // localStorage.setItem('userId', result.user_id);
        // localStorage.setItem('username', result.username);
        navigate('/');
        dispatch(login({
          email: result.email,
          username: result.username,
          token: result.token,
          user_id: result.user_id
        }));
        localStorage.setItem('userToken', result.token);
        localStorage.setItem('username', result.username);
        // localStorage.setItem('user_id', result.user_id);
      } else {
        console.error("Login Failed:", result);
        // console.log(JSON.stringify(result))
        alert(`Login Failed: Either the Email or the Password is incorrect`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false); 
    }
    reset();
  }
  if (isLoading) {
        return (
            <div className='container my-5 text-center'>
                <div className='h1 py-3'>Logging In ...</div>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="py-4"> </div>
                <div className="py-4"> </div>
                <div className="py-4"> </div>
                <div className="py-4"> </div>
            </div>
        );
    }
  return (
    <div className='my-5 py-5'>
      <div className="container py-2">
        <div className='h1 text-center'>
          Login Form
        </div>
        <form onSubmit={handleSubmit(myHandleSubmit)} className='container'>
          <div className="row my-3">
            <div className="col-lg-6 pe-sm-0">
              <label htmlFor="email" className="col-6 my-2 ps-0">Enter your Email
              </label>
              <input type="text" id="email" className="form-control col-6" placeholder="Enter your Email"
                {...register("email", { required: "Email can't be empty", })} />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="col-lg-6 pe-sm-0">
              <label htmlFor="passwd" className="col-6 my-2 ps-0">Enter your Password </label>
              <input type="text" id="passwd" className="form-control col-6" placeholder="Enter your Password"
                {...register("passwd", { required: "Password can't be empty", })} />
              {errors.passwd && <span>{errors.passwd.message}</span>}
            </div>
          </div>
          <div className="row my-3">
            <div className="col-3  mt-3 mx-auto">
              <button className='form-control' id="logbtn">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
