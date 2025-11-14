import React from 'react'
import { useEffect, useState } from "react";

function Projectslist({api_url}) {
    
    const formatDateTime = (isoString) => {
        if (!isoString) return 'N/A';
        try {
            return new Date(isoString).toLocaleString('en-UK', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
        } catch (e) {
            console.log(e)
            return 'Invalid Date';
        }
    };
    const authToken = localStorage.getItem("userToken"); 
    let [siteData,setdata]= useState([]);

    async function getdata() {
        const API_URL = `${api_url}projects/`;
        let payload_headers = {
            'Content-Type': 'application/json',
            // 'token': `${authToken}`,
            'Authorization':`token ${authToken}`
        };
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: payload_headers
            });
            // console.log(payload_headers)
            if (response.status === 201 || response.ok) {
                const result = await response.json();
                console.log("Projects Get Successful!", result);
                setdata(result)
            } else {
                const errorData = await response.json();
                console.error("Projects Get Failed:", response.status, errorData);
                alert({ 
                    message: `Failed to load projects: ${response.status} - ${errorData.detail || 'Server Error'}`, 
                    type: 'error' 
                });
            }
        }
        catch (error){
            console.error("Network Error during project creation:", error);
            alert("A network error occurred. Please check your CORS configuration and connectivity.");
        }
    }

    useEffect(() => {
        getdata();
    },[]);
    
    return (
        <div className='container mt-3'>
            <center>
                <table className='table table-dark table-striped table-bordered table-hover'>
                    <thead>
                    <tr className='text-center align-middle'>
                        <th>Project ID</th>
                        <th>Project Title</th>
                        <th>Project Details</th>
                        <th>Project Start Time</th>
                        <th>Project End Time</th>
                        <th>Project Total Target</th>
                        <th>Project Created by user id</th>
                    </tr>
                    </thead>
                    <tbody>
                    {siteData.map((proj) => (
                    <tr className='text-center'>
                        <td>{proj.id}</td>
                        <td>{proj.title}</td>
                        <td>{proj.details}</td>
                        <td>{formatDateTime(proj.start_time)}</td>
                        <td>{formatDateTime(proj.end_time)}</td>
                        <td>{proj.total_target} $</td>
                        <td>{proj.user}</td>
                    </tr>
                    ))}
                    </tbody>
            </table>
            </center>
        </div>
    )
}

export default Projectslist
