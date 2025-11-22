import React from 'react'
import { useForm } from "react-hook-form"

function RegisterPage({api_url}) {
  const { 
          register,watch,
          handleSubmit,
          formState: { errors },
          reset,
      } = useForm();
async function myHandleSubmit(data) {
    console.log(
      {
        username: data.username,
        passwd: data.passwd1,
        email: data.email,
        fname: data.fname,
        lname: data.lname,
        phonenum:data.phonenum,
        is_staff:data.staff
      });
    const API_URL = `${api_url}register/`;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: data.passwd1,
                email: data.email,
                first_name: data.fname,
                last_name: data.lname,
                phone_number:data.phonenum,
                is_staff:data.staff

            }),
        });
        const result = await response.json();
        if (response.ok) {
          console.log("Register Successful! Token/Data:", result);
          alert("Register successful!");
        } else {
          console.error("Register Failed:", result);
          // console.log(JSON.stringify(result))
          // {result.username && console.log(result.username[0]) }
          // {result.phone_number && console.log(result.phone_number[0]) }
          alert(`Register Failed: \n ${result.username && result.username[0] }\n ${result.phone_number && result.phone_number[0] }`);
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
          Registeration Form
        </div>
        <form onSubmit={handleSubmit(myHandleSubmit)} className='container'>
          <div className="row my-3">
            <label htmlFor="username" className="col-6 my-2 ps-0">Enter your Username
            </label>
            <input type="text" id="username" className="form-control col-6" placeholder="Enter your Username"
              {...register("username",
                {
                  required: "Username can't be empty",
                  pattern: {
                    value: /^[\w.@+-]+/i,
                    message:"Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters."
                  }
                })} />
              {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div className="row my-3">
            <div className="col-6 ps-0">
              <label htmlFor="fname" className="col-6 my-2">Enter your First Name </label>
              <input type="text" id="fname" className="form-control col-6" placeholder="Enter your First Name"
              {...register("fname")}/>
            </div>
            <div className="col-6 pe-0">
              <label htmlFor="lname" className="col-6 my-2">Enter your Last Name</label>
              <input type="text" id="lname" className="form-control col-6" placeholder="Enter your name"
              {...register("lname")}/>
            </div>
          </div>
          <div className="row my-3">
            <label htmlFor="phonenum" className="col-6 my-2 ps-0">Enter your Phone number </label>
            <input type="text" id="phonenum" className="form-control col-6" placeholder="Enter your Phone number"
              {...register("phonenum",
                {
                  required: "Phone Number can't be Empty",
                  pattern: {
                    value: /^01[0-2,5]{1}[0-9]{8}$/i,
                    message:"Invalid Egyptian phone number."
              }
                })} />
            {errors.phonenum && <span>{errors.phonenum.message}</span>}
          </div>
          <div className="row my-3">
            <label htmlFor="email" className="col-6 my-2 ps-0">Enter your Email </label>
            <input type="text" id="email" className="form-control col-6" placeholder="Enter your Email"
            {...register("email", { required: "email can't be empty",
              pattern:{
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message:"Invalid email address format"
              }
              })}/>
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="row my-3">
            <div className="col-6 ps-0">
              <label htmlFor="passwd1" className="col-6 my-2 ps-0">Enter your Password </label>
              <input type="text" id="passwd1" className="form-control col-6" placeholder="Enter your Password"
                {...register("passwd1", { required: "Password can't be empty", })} />
              {errors.passwd1 && <span>{errors.passwd1.message}</span>}
            </div>
            <div className="col-6 pe-0">
              <label htmlFor="passwd2" className="col-6 my-2 ps-0">Confirm your Password </label>
              <input type="text" id="passwd2" className="form-control col-6" placeholder="Confirm your Password"
                {...register("passwd2", {
                  required: "Password confirmation can't be empty",
                  validate: (val) => {
                    if (watch('passwd1') != val) {
                      return "Your passwords do no match";
                    }
                  }
                })} />
              {errors.passwd2 && <span>{errors.passwd2.message}</span>}
              </div>
          </div>
          <div className="col-6 pe-0"> 
              {/* <input type="radio" id="staff" className="form-control" name="staff" value="staff" */}
                {/* /> */}
              <input type="checkbox" name="staff" className="px-2" value="True" id="staff" {...register("staff")} />
            <label htmlFor="staff" className="col-6 my-2 px-2"> is staff ? </label>
          </div>
          <div className="row my-3">
            <div className="col-3  mt-3 mx-auto">
              <button className='form-control' id="regbtn">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
