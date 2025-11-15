import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { login } from "../store/userslice";

function LoginPage({ api_url }) {
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

  async function myHandleSubmit(data) {
    console.log(
      {
        username: data.username,
        passwd: data.passwd,
      });
    const API_URL = `${api_url}login/`;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'core',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.passwd
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Login Successful! Token/Data:", result);
        alert("Login successful!");
        // store the users info in localstorage
        // localStorage.setItem('userToken', result.token);
        // localStorage.setItem('userId', result.user_id);
        // localStorage.setItem('username', result.username);
        dispatch(login({
          username: result.username,
          token: result.token,
          user_id: result.user_id
        }));
        localStorage.setItem('userToken', result.token);
      } else {
        console.error("Login Failed:", result);
        console.log(JSON.stringify(result))
        alert(`Login Failed: username or password is incorrect`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("A network error occurred. Please try again.");
    }
    reset();
  }
  return (
    <div className='my-5'>
      <div className="container">
        <div className='h1 text-center'>
          this is the Login page
        </div>
        <form onSubmit={handleSubmit(myHandleSubmit)}>
          <div className="row my-3">
            <div className="col-lg-6 pe-sm-0">
              <label htmlFor="username" className="col-6 my-2 ps-0">Enter your Username
              </label>
              <input type="text" id="username" className="form-control col-6" placeholder="Enter your Username"
                {...register("username", { required: "Username can't be empty", })} />
              {errors.username && <span>{errors.username.message}</span>}
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
