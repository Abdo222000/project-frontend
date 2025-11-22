import React from 'react'
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form"

function ProjectsPage({api_url}) {
    const userState = useSelector((state) => state.user);
    const authToken = localStorage.getItem("userToken"); 
    const currentUserId = userState.user_id;
  const { 
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  async function myHandleSubmit(data) {
    if (!userState) {
      alert("Error: You must be logged in to create a project.");
      console.error("Authentication data missing. Please log in.");
      return;
    }
    console.log(data, currentUserId)
    const API_URL = `${api_url}projects/`;
    const totalTargetString = String(data.totalTarget);
    const payload = {
      title: data.title,
      details: data.details,
      total_target: totalTargetString, 
      start_time: data.startTime,    
      end_time: data.endTime,        
      user: currentUserId          
    };
    // console.log("Sending Payload:", payload);
    let payload_headers = {
      'Content-Type': 'application/json',
      // 'token': `${authToken}`,
      'Authorization':`token ${authToken}`
    };
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: payload_headers,
        body: JSON.stringify(payload),
      });
        // console.log(payload_headers,payload)
      if (response.status === 201 || response.ok) {
        const result = await response.json();
        // console.log("Project creation Successful!", result);
        alert("Project created successfully!");
        reset();
      } else {
          let errorDetails = `Project creation Failed (Status: ${response.status}).`;

        const errorData = await response.json();
        console.error("Project Creation Failed (HTTP Status):", response.status, errorData);
        alert(`Project creation Failed: ${JSON.stringify(errorData)}`);
        if (response.status === 403 && errorData.detail === 'Authentication credentials were not provided.') {
          errorDetails = "Authentication Failed (403). CHECK DJANGO CORS SETTINGS: You must add 'Authorization' to CORS_ALLOW_HEADERS.";
        } else if (errorData.detail) {
            errorDetails = `Failed: ${errorData.detail}`;
        } else {
            errorDetails = `Failed: ${JSON.stringify(errorData)}`;
        }
        {errorDetails && console.log(errorDetails)}
      }
    } catch (error) {
      console.error("Network Error during project creation:", error);
      alert("A network error occurred. Please check your CORS configuration and connectivity.");
    }
  }
  return (
    <div className='my-5'>
      <div className="container">
        <div className='h1 text-center'>
          Projects Creation Form
        </div>
        <form onSubmit={handleSubmit(myHandleSubmit)}>
          <div className="row my-3">
            <div className="col-lg-6 mb-3">
              <label htmlFor="title" className="form-label">Project Title</label>
              <input type="text" id="title" className="form-control" 
                  placeholder="e.g., Build a community garden"
                  {...register("title", { required: "Title is required", maxLength: 255 })} 
              />
              {errors.title && <span>{errors.title.message}</span>}
            </div>
            
            <div className="col-lg-6 mb-3">
              <label htmlFor="totalTarget" className="form-label">Funding Goal ($)</label>
              <input type="number" id="totalTarget" className="form-control" 
                  placeholder="e.g., 5000.00"
                  {...register("totalTarget", { 
                      required: "Funding goal is required", 
                      min: 0.01,
                      step: "0.01" 
                  })} 
              />
              {errors.totalTarget && <span>{errors.totalTarget.message}</span>}
            </div>
          </div>

          <div className="row my-3">
            <div className="col-12 mb-3">
              <label htmlFor="details" className="form-label">Project Details</label>
              <textarea id="details" className="form-control" rows="4" 
                  placeholder="Provide a detailed description of your project..."
                  {...register("details", { required: "Details are required" })} 
              />
              {errors.details && <span>{errors.details.message}</span>}
            </div>
          </div>

          <div className="row my-3">
            <div className="col-lg-6 mb-3">
              <label htmlFor="startTime" className="form-label">Start Date and Time</label>
              <input type="datetime-local" id="startTime" className="form-control"
                  {...register("startTime", { required: "Start time is required" })} 
              />
              {errors.startTime && <span>{errors.startTime.message}</span>}
            </div>
            
            <div className="col-lg-6 mb-3">
              <label htmlFor="endTime" className="form-label">End Date and Time</label>
              <input type="datetime-local" id="endTime" className="form-control"
                  {...register("endTime", { required: "End time is required" })} 
              />
              {errors.endTime && <span>{errors.endTime.message}</span>}
            </div>
          </div>

          <div className="row my-4">
            <div className="col-3 mx-auto">
              <button type="submit" className='btn btn-primary form-control'>Create Project</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectsPage
