import React from 'react'
import { useEffect, useState } from "react";
import { useParams,useNavigate } from 'react-router-dom';

function EditProject({api_url}) {
    let {id} = useParams();
    const [formData, setFormData] = useState({
        title: '',
        details: '',
        total_target: '',
        start_time: '',
        end_time: '',
        total_raised:''
    });
    const navigate = useNavigate();

    const formatDateTimeForInput = (isoString) => {
        if (!isoString) return '';
        try {
        const date = new Date(isoString);
        const pad = (num) => String(num).padStart(2, '0');
        const year = date.getUTCFullYear();
        const month = pad(date.getUTCMonth() + 1);
        const day = pad(date.getUTCDate());
        const hours = pad(date.getUTCHours());
        const minutes = pad(date.getUTCMinutes());

        return `${year}-${month}-${day}T${hours}:${minutes}`;

    } catch (e) {
        console.error("Error formatting date for input:", e);
        return '';
    }
    };
    const authToken = localStorage.getItem("userToken"); 
    const [isLoading, setIsLoading] = useState(true);

    async function getProjectData() {
        setIsLoading(true);
        const API_URL = `${api_url}projects/${id}`;
        let payload_headers = {
            'Content-Type': 'application/json',
            'Authorization':`token ${authToken}`
        };
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: payload_headers
            });
            if (response.ok) {
                const result = await response.json();
                // console.log("Projects Get Successful!", result);
                setFormData({
                    title: result.title || '',
                    details: result.details || '',
                    total_target: result.total_target || '',
                    total_raised: result.total_raised || '',
                    start_time: formatDateTimeForInput(result.start_time),
                    end_time: formatDateTimeForInput(result.end_time),
                });
            } else {
                const errorData = await response.json();
                console.error("Projects Get Failed:", response.status, errorData);
                alert({ 
                    message: `Failed to load projects: ${response.status} - ${errorData.detail || 'Server Error'}`, 
                    type: 'error' 
                });
            }}
        catch (error){
            console.error("Network Error during project creation:", error);
            alert("A network error occurred. Please check your CORS configuration and connectivity.");
        } finally {
            setIsLoading(false); 
        }
    }
    useEffect(() => {getProjectData();},[id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    async function handleUpdate(e) {
        e.preventDefault();
        const API_URL = `${api_url}projects/${id}/`;
        try {
            const response = await fetch(API_URL, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`token ${authToken}`
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                // console.log("Update Successful:", result);
                alert("Project updated successfully!");
                navigate('/projectslist')
            } else {
                console.error("Update Failed:", result);
                let errorMessage = "Update Failed: Server Error";
                if (result.detail) errorMessage = result.detail;
                if (result.title) errorMessage = `Title error: ${result.title[0]}`;
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Network Error during update:", error);
            alert("A network error occurred. Please try again.");
        }
    }
    async function cancel(){
        navigate('/projectslist')
        alert("Canceled Project update!");
    }
    if (isLoading) {
        return (
            <div className='container my-5 text-center'>
                <div className='h1 py-3'>Loading Project Data...</div>
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
        <div className='container my-5'>
                <form onSubmit={handleUpdate}> 
                    <div className="row my-3">
                        <div className="col-lg-6 mb-3">
                            <label htmlFor="title" className="form-label">Project Title</label>
                            <input 
                                type="text" 
                                id="title" 
                                className="form-control" 
                                value={formData.title}
                                onChange={handleChange} 
                            />
                            </div>
                            <div className="col-lg-3 mb-3">
                            <label htmlFor="total_target" className="form-label">Funding Goal ($)</label>
                            <input 
                                type="number" 
                                id="total_target" 
                                className="form-control" 
                                value={formData.total_target}
                                onChange={handleChange}
                            />
                            </div>
                            <div className="col-lg-3 mb-3">
                            <label htmlFor="total_raised" className="form-label">Funding Raised ($)</label>
                            <input 
                                type="number" 
                                id="total_raised" 
                                className="form-control" 
                                value={formData.total_raised}
                                onChange={handleChange}
                            />
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-12 mb-3">
                            <label htmlFor="details" className="form-label">Project Details</label>
                            <textarea 
                                id="details" 
                                className="form-control" 
                                rows="4" 
                                value={formData.details}
                                onChange={handleChange}
                            />
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-lg-6 mb-3">
                            <label htmlFor="start_time" className="form-label">Start Date and Time</label>
                            <input 
                                type="datetime-local" 
                                id="start_time" 
                                className="form-control" 
                                value={formData.start_time}
                                onChange={handleChange}
                            />
                            </div>
                            
                            <div className="col-lg-6 mb-3">
                            <label htmlFor="end_time" className="form-label">End Date and Time</label>
                            <input 
                                type="datetime-local" 
                                id="end_time" 
                                className="form-control" 
                                value={formData.end_time}
                                onChange={handleChange}
                            />
                            </div>
                        </div>

                        <div className="row my-4">
                            <div className="col-3 mx-auto">
                            <button type="submit" className='btn btn-primary form-control'>Finish Editing</button>
                            </div>
                        </div>   
                </form>
                <div className="col-3 mx-auto">
                    <button className='btn btn-danger' onClick={cancel}>Cancel Editing</button>
                </div>
        </div>
    )
}

export default EditProject
